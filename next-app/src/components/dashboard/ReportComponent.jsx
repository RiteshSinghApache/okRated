export default function ReportComponent() {
    return (
        <div className="col-md-12 mt-4">
            <div className="summary-box-inner-2">
                {/* Top Row: Summary + Feedback Type */}
                <div
                    className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                    <h2 className="mb-0">Report</h2>

                    <div
                        className="d-flex align-items-center gap-2 flex-wrap">

                        <button
                            className="btn btn-blue text-white  w-100"
                            download>Download
                            Report <img
                                src="assets/img/download.svg" alt="download" /></button>

                    </div>
                </div>

            </div>
        </div>
    );
}
