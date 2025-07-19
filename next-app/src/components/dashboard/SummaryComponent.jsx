
export default function SummaryComponent() {
return (
    <>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h1 className="mb-0">Summary</h1>

            <div className="d-flex align-items-center gap-2 flex-wrap">
                <label
                    htmlFor="feedbackType"
                    className="form-label mb-0 me-2 fw-semibold"
                >
                    Feedback type
                </label>
                <select
                    className="form-select"
                    id="feedbackType"
                    style={{ width: "180px" }}
                >
                    <option defaultValue>Choose...</option>
                    <option value="1">Positive</option>
                    <option value="2">Negative</option>
                    <option value="3">Neutral</option>
                </select>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <input
                        type="date"
                        className="form-control"
                        style={{ maxWidth: "200px" }}
                    />
                </div>
            </div>
        </div>

        <div className="summary">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="avarage-rating-bg">
                    <p className="mb-0">Average Rating</p>
                    <h2>
                        4.7{" "}
                        <img src="assets/img/star.svg" alt="star" />
                    </h2>
                </div>
                <div className="avarage-rating-blue-bg">
                    <p className="mb-0 text-white">Total reviews</p>
                    <h2>
                        128 <span>reviews</span>
                    </h2>
                </div>
                <div className="avarage-rating-bg-yellow">
                    <p className="mb-0">% Change</p>
                    <h2>
                        1.2<span>%</span>
                    </h2>
                </div>
                <div className="progress-bar-rating-blue">
                    <div className="d-flex progress-inner">
                        5
                        <img
                            src="assets/img/star.svg"
                            width={14}
                            height={14}
                            className="align-middle"
                            style={{ marginTop: "0px" }}
                            alt="star"
                        />
                        <div className="progress progress-width">
                            <div className="progress-bar" style={{ width: "46%" }}></div>
                        </div>
                        <div className="d-flex ms-2">46</div>
                    </div>

                    <div className="d-flex progress-inner">
                        4
                        <img
                            src="assets/img/star.svg"
                            width={14}
                            height={14}
                            className="align-middle"
                            style={{ marginTop: "0px" }}
                            alt="star"
                        />
                        <div className="progress progress-width">
                            <div className="progress-bar" style={{ width: "23%" }}></div>
                        </div>
                        <div className="d-flex ms-2">23</div>
                    </div>

                    <div className="d-flex progress-inner">
                        3
                        <img
                            src="assets/img/star.svg"
                            width={14}
                            height={14}
                            className="align-middle"
                            style={{ marginTop: "0px" }}
                            alt="star"
                        />
                        <div className="progress progress-width">
                            <div className="progress-bar" style={{ width: "34%" }}></div>
                        </div>
                        <div className="d-flex ms-2">34</div>
                    </div>

                    <div className="d-flex progress-inner">
                        2
                        <img
                            src="assets/img/star.svg"
                            width={14}
                            height={14}
                            className="align-middle"
                            style={{ marginTop: "0px" }}
                            alt="star"
                        />
                        <div className="progress progress-width">
                            <div className="progress-bar" style={{ width: "16%" }}></div>
                        </div>
                        <div className="d-flex ms-2">16</div>
                    </div>

                    <div className="d-flex progress-inner">
                        1
                        <img
                            src="assets/img/star.svg"
                            width={14}
                            height={14}
                            className="align-middle"
                            style={{ marginTop: "0px" }}
                            alt="star"
                        />
                        <div className="progress progress-width">
                            <div className="progress-bar" style={{ width: "5%" }}></div>
                        </div>
                        <div className="d-flex ms-2">5</div>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}
