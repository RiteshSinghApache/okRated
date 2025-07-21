import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import api from "@/utils/api";

export default function BusinessProfileComponent({ profile }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const { isAuthenticated } = useSelector((state) => state.auth);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...profile });
    const [preview, setPreview] = useState(profile.business_logo || "/assets/img/logo-preview.svg");
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [businessTypes, setBusinessTypes] = useState([]);

    // Redirect unauthenticated user
    if (typeof window !== "undefined" && !isAuthenticated) {
        router.push("/login");
        return null;
    }

    const handleClick = () => inputRef.current?.click();

    const handleFiles = (files) => {
        const file = files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
                setSelectedFile(file); // store file
                setError("");
            };
            reader.readAsDataURL(file);
        } else {
            setPreview("/assets/img/logo-preview.svg");
            setError("Invalid file type. Please upload an image.");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("business_name", formData.business_name);
            formDataToSend.append("business_type", formData.business_type);
            formDataToSend.append("google_business_url", formData.google_business_url);
            if (selectedFile) {
                formDataToSend.append("logo", selectedFile); // backend expects field name as "logo"
            }

            const res = await api.patch(
                "/user/update-profile-business", // use relative path
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            setIsEditing(false);
        } catch (err) {
            alert("Update failed: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchBusinessTypes = async () => {
            try {
                const res = await api.get("/common/business-types");
                setBusinessTypes(res.data.data); // ✅ use `.data.data`
            } catch (err) {
                console.error("Error fetching business types", err);
            }
        };

        fetchBusinessTypes();
    }, []);


    return (
        <div className="container">
            {!isEditing ? (
                <>
                    {/* READ-ONLY VIEW */}
                    <div className="light-gb-gray p-4 border rounded">
                        <div className="d-flex align-items-center">
                            <img
                                src={preview}
                                className="me-4 rounded border"
                                alt="Business Logo"
                                onError={() => setPreview("/assets/img/logo-preview.svg")}
                            />
                            <div>
                                <h5>{formData.business_name || "N/A"}</h5>
                                <p className="mb-1">{formData.business_type || "N/A"}</p>
                            </div>
                        </div>
                        <hr />
                        <p><strong>Email:</strong> {formData.email || "N/A"}</p>
                        <p><strong>Phone:</strong> {formData.phone || "N/A"}</p>
                        <p>
                            <strong>Google Business URL:</strong>{" "}
                            <a href={formData.google_business_url} target="_blank" rel="noreferrer">
                                {formData.google_business_url || "N/A"}
                            </a>
                        </p>
                    </div>
                    <div className="text-end mt-3">
                        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="row justify-content-center align-items-center">
                        <h3 className="text-center mb-4">Update Your Business Profile</h3>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="business_name">Business Name</label>
                                <input
                                type="text"
                                id="business_name"
                                name="business_name"
                                className="form-control"
                                value={formData.business_name || ""}
                                onChange={handleChange}
                                required
                                aria-required="true"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="business_type">Business Type</label>
                            <select
                                id="business_type"
                                name="business_type"
                                className="form-select"
                                value={formData.business_type || ""}
                                onChange={handleChange}
                                required
                                >
                                <option value="" disabled>Select business type</option>
                                {businessTypes.map((type) => (
                                    <option key={type.id} value={type.business}>
                                    {type.business}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="google_business_url">Google Business URL</label>
                            <input
                                type="url"
                                id="google_business_url"
                                name="google_business_url"
                                className="form-control"
                                value={formData.google_business_url || ""}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Drag-and-drop Upload */}
                        <div className="row pe-0">
                            <div className="col-sm-8">
                                <label className="form-label fw-bold">Business Logo</label>
                                <div
                                    className={`drop-zone border p-3 rounded text-center ${dragOver ? "bg-light" : ""}`}
                                    onClick={handleClick}
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDragEnd={() => setDragOver(false)}
                                    onDrop={handleDrop}
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Upload Logo"
                                >
                                    {error ? (
                                        <p className="text-danger mb-0">{error}</p>
                                    ) : (
                                        <p className="mb-1">
                                            <img src="/assets/img/drag.svg" alt="drag" />
                                            <br />
                                            Drag file here or <span className="text-primary">browse</span>
                                        </p>
                                    )}
                                    <input
                                        type="file"
                                        className="form-control d-none"
                                        ref={inputRef}
                                        accept="image/*"
                                        onChange={(e) => handleFiles(e.target.files)}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4 pe-0">
                                <div className="preview-box mt-4 ms-auto text-end">
                                    <img
                                        src={preview}
                                        alt="Logo Preview"
                                        width="100"
                                        onError={() => setPreview("/assets/img/logo-preview.svg")}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-between mt-4">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-info" disabled={loading}>
                                {loading ? "Updating..." : "Update & Proceed"}
                            </button>
                        </div>
                    </form>
                    </div>
                </>
            )}
        </div>
    );
}
