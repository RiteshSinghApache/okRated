import { useState } from "react";
import api from "@/utils/api";

export default function QRCodeComponent({ profile }) {
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [qrPath, setQrPath] = useState(profile.qr_code_path);

    const qrUrl = process.env.NEXT_PUBLIC_BASE_URL + `${qrPath || ""}`;

    const copyQR = () => {
        navigator.clipboard.writeText(qrUrl).then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        });
    };

    const generateQRCode = async () => {
        setLoading(true);
        try {
            console.log("Generating QR Code for:", profile);
            const generateQRCode = process.env.NEXT_PUBLIC_BASE_URL +"/rating/" + `${profile.unique_key || ""}`;
            const res = await api.patch("/user/generate-qr", {
                user_id: profile.id,
                url: generateQRCode,
            });
            const data = await res.json();
            console.log("QR Code generated:", data);
            if (data.qr_code_path) {
                setQrPath(data.qr_code_path);
            }
        } catch (err) {
            // handle error as needed
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {qrPath ? (
                <>
                    <div className="qr-code border-bottom-gray">
                        <label className="form-label dark-black-14-500">QR Code URL</label>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control me-2"
                                id="qrUrl"
                                value={qrUrl}
                                readOnly
                                style={{
                                    border: "1px solid #D9D9D9",
                                    borderRadius: "8px",
                                    padding: "10px 14px",
                                }}
                            />
                            <button
                                className="btn btn-outline-blue"
                                type="button"
                                onClick={copyQR}
                            >
                                <img src="assets/img/copy.svg" alt="Copy" />
                            </button>
                        </div>
                        {showToast && (
                            <div
                                className="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-4"
                                role="alert"
                            >
                                <div className="d-flex">
                                    <div className="toast-body">URL copied to clipboard!</div>
                                </div>
                            </div>
                        )}
                        <div className="d-flex justify-content-between mt-4">
                            <div className="dashboard-button text-center">
                                <a
                                    className="btn-blue d-block text-decoration-none me-2"
                                    href="#"
                                    role="button"
                                >
                                    Preview QR
                                </a>
                            </div>
                            <div className="dashboard-button text-center">
                                <a
                                    className="btn-blue d-block text-decoration-none"
                                    href="#"
                                    role="button"
                                >
                                    Download QR
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="yellow border-bottom-gray">
                        <div className="dashboard-yellow text-center">
                            <a
                                className="btn-yellow d-block text-decoration-none"
                                href="#"
                                role="button"
                            >
                                Download Printable Poster
                            </a>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center my-4">
                    <button
                        className="btn btn-primary"
                        onClick={generateQRCode}
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate QR Code"}
                    </button>
                </div>
            )}
        </>
    );
}
