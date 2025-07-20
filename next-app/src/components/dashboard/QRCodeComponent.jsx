"use client";

import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import api from "@/utils/api";

export default function QRCodeComponent({ profile }) {
    const [loading, setLoading] = useState(false);
    const [qrPath, setQrPath] = useState(profile.qr_code_path);
    // Removed unused imageLoaded and setQrLink state hooks
    const qrLink = process.env.NEXT_PUBLIC_BASE_URL + "/rating/" + profile.unique_key;
    const toastRef = useRef(null);
    const modalRef = useRef(null);
    const posterRef = useRef(null);

    const qrUrl = process.env.NEXT_PUBLIC_MAIN_BASE_URL + (qrPath || "");

    const copyQR = () => {
        navigator.clipboard.writeText(qrUrl).then(() => {
            if (window?.bootstrap && toastRef.current) {
                const toastInstance = window.bootstrap.Toast.getOrCreateInstance(toastRef.current);
                toastInstance.show();
            }
        });
    };

    const generateQRCode = async () => {
        setLoading(true);
        try {
            const res = await api.patch("/user/generate-qr", {
                user_id: profile.id,
                url: qrLink,
            });
            const data = await res.data;
            if (data.qr_code_path) setQrPath(data.qr_code_path);
        } catch (err) {
            console.error("QR generation failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePreviewQR = () => {
        if (window?.bootstrap && modalRef.current) {
            const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalRef.current);
            modalInstance.show();
        }
    };

    const handleDownloadQR = () => {
        const link = document.createElement("a");
        link.href = qrUrl;
        link.download = "qr-code.png";
        link.click();
    };

    useEffect(() => {
        if (typeof window !== "undefined" && !window.bootstrap) {
            // @ts-ignore
            import("bootstrap/dist/js/bootstrap.bundle.min.js");
        }
    }, []);

    const handleDownloadPoster = async () => {
        if (!qrUrl) {
            alert("QR code is not available.");
            return;
        }

        // Create a temporary HTML element for the poster
        const posterHtml = document.createElement("div");
        posterHtml.style.padding = "40px";
        posterHtml.style.textAlign = "center";
        posterHtml.style.backgroundColor = "#fff";
        posterHtml.style.width = "500px";
        posterHtml.style.border = "1px solid #ccc";

        // Title
        const title = document.createElement("h2");
        title.innerText = "Leave Us a Review";
        title.style.color = "#000";
        posterHtml.appendChild(title);

        // QR Image
        const img = document.createElement("img");
        img.src = qrUrl;
        img.alt = "QR Code";
        img.style.width = "200px";
        img.style.marginTop = "20px";
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        posterHtml.appendChild(img);

        // URL text
        const urlText = document.createElement("p");
        urlText.innerText = qrLink;
        urlText.style.marginTop = "30px";
        urlText.style.color = "#555";
        posterHtml.appendChild(urlText);

        document.body.appendChild(posterHtml);

        try {
            const canvas = await html2canvas(posterHtml, {
                useCORS: true,
                allowTaint: false,
                scale: 2,
            });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4",
            });

            // Center the image on the page
            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgWidth = 400;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const x = (pageWidth - imgWidth) / 2;
            const y = 60;

            pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
            pdf.save("printable-poster.pdf");
        } catch (error) {
            console.error("PDF generation error:", error);
            alert("Failed to generate PDF. Check the console for more details.");
        } finally {
            document.body.removeChild(posterHtml);
        }
    };

    return (
        <>
            {qrPath ? (
                <>
                    <div className="qr-code border-bottom pb-3 mb-3">
                        <label className="form-label fw-bold">QR Code URL</label>
                        <div className="d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control me-2"
                                value={qrUrl}
                                readOnly
                                aria-label="QR Code URL"
                                style={{
                                    border: "1px solid var(--bs-border-color)",
                                    borderRadius: "8px",
                                    padding: "10px 14px",
                                    backgroundColor: "var(--bs-body-bg)",
                                    color: "var(--bs-body-color)",
                                }}
                            />
                            <button className="btn btn-outline-primary" onClick={copyQR}>
                                <img src="assets/img/copy.svg" alt="Copy" />
                            </button>
                        </div>

                        {/* Toast */}
                        <div
                            ref={toastRef}
                            className="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-4"
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                        >
                            <div className="d-flex">
                                <div className="toast-body">Copied to clipboard!</div>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white me-2 m-auto"
                                    data-bs-dismiss="toast"
                                    aria-label="Close"
                                ></button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <div className="dashboard-button text-center">
                                <a className="btn-blue d-block text-decoration-none me-2" role="button" onClick={handlePreviewQR}>
                                    Preview QR
                                </a>
                            </div>
                            <div className="dashboard-button text-center">
                                <a className="btn-blue d-block text-decoration-none" role="button" onClick={handleDownloadQR}>
                                    Download QR
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="yellow border-bottom-gray">
                        <div className="dashboard-yellow text-center">
                            <a className="btn-yellow d-block text-decoration-none" role="button" onClick={handleDownloadPoster}>
                                Download Printable Poster
                            </a>
                        </div>
                    </div>

                    {/* Poster content for PDF generation (hidden) */}
                    <div ref={posterRef} style={{ display: "none" }}>
                        <div
                            style={{
                                padding: "40px",
                                textAlign: "center",
                                backgroundColor: "#fff",
                                width: "500px",
                                border: "1px solid #ccc",
                            }}
                        >
                            <h2 style={{ color: "#000" }}>Leave Us a Review</h2>
                            <img
                                src={qrUrl}
                                alt="QR Code"
                                style={{ width: "200px", marginTop: "20px" }}
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer"
                                onError={() => {
                                    alert("QR image failed to load.");
                                }}
                            />
                            <p style={{ marginTop: "30px", color: "#555" }}>{qrLink}</p>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center my-4">
                    <button className="btn btn-primary" onClick={generateQRCode} disabled={loading}>
                        {loading ? "Generating..." : "Generate QR Code"}
                    </button>
                </div>
            )}

            {/* Modal */}
            <div
                ref={modalRef}
                className="modal fade"
                tabIndex="-1"
                aria-labelledby="qrPreviewModal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">QR Code Preview</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-center">
                            <img
                                src={qrUrl}
                                alt="QR Code"
                                className="img-fluid"
                                style={{ maxHeight: "300px" }}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-success" onClick={handleDownloadQR}>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
