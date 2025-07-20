//import Image from 'next/image';
import Link from 'next/link';
export default function SideBarComponent() {
  return (
    <>
        <div className="col-md-3 d-none d-lg-block ps-0">
            <div className="sidebar-content shadow-right">
                <div>
                    <img src="assets/img/Ok-rated-logo.svg"
                        alt="Taj" className="img-fluid" />

                    <form className="my-3 d-block dashboard-search"
                        role="search">
                        <input
                            className="form-control form-control-sm search-input"
                            type="search" placeholder="Search"
                            aria-label="Search" />
                    </form>
                    <div className="dashboard-button mt-5">
                        <Link className="btn-blue  d-block" href="/dashboard"
                            role="button"><img
                                src="assets/img/bar-chart.svg" />
                            Dashboard</Link>

                    </div>
                    <div className="dashboard-button mt-5">
                        <Link className="btn-blue  d-block" href="/my-profile"
                            role="button"><img
                                src="assets/img/bar-chart.svg" />
                            Profile</Link>
                    </div>
                </div>

                <div className="support-1-style mt-auto">

                    {/* <!-- this is modal --> */}

                    {/* <!-- Button trigger modal --> */}

                    <button type="button"
                        className="btn-transparent btn-primary-transparent dark-gray-16-600 px-0 mb-3"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1">
                        <img
                            src="assets/img/support.svg" /> Support
                    </button>

                    <div className="modal fade"
                        id="exampleModal1"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel1"
                        aria-hidden="true">
                        <div
                            className="modal-dialog modal-dialog-centered modal-inner-box">
                            <div
                                className="modal-content">

                                <button
                                    type="button"
                                    className="btn-close btn-close-model"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>

                                <div
                                    className="modal-body">
                                    <div
                                        className="container-fluid">
                                        <div
                                            className="row">
                                            <div
                                                className="col-sm-12 col-lg-6 col-md-12 col-12  modal-container">
                                                <div
                                                    className="d-block">
                                                    <p
                                                        className="dark-gray-16-600 mb-0">Support</p>
                                                    <h2
                                                        className="mt-3">We’d
                                                        love
                                                        to
                                                        help
                                                        you</h2>
                                                    <p className="mb-3">Our
                                                        friendly
                                                        team
                                                        is
                                                        always
                                                        there
                                                        to
                                                        assist
                                                        you.</p>
                                                </div>
                                                <div
                                                    className="text-center box-support">
                                                    <div
                                                        className="email-box">
                                                        <div
                                                            className="img-box">
                                                            <img
                                                                src="assets/img/email.svg"
                                                                width="50px"
                                                                height="50px" />
                                                        </div>
                                                        <div
                                                            className="email-size">
                                                            Email
                                                        </div>
                                                        <div
                                                            className="email-text">
                                                            <a
                                                                href="mailto:contact@okrated.com"
                                                                className="text-decoration-none  text-white">contact@okrated.com

                                                            </a>

                                                        </div>
                                                    </div>

                                                    <div
                                                        className="email-box email-box-ms-4">
                                                        <div
                                                            className="img-box">
                                                            <img
                                                                src="assets/img/phone.svg"
                                                                width="50px"
                                                                height="50px" />
                                                        </div>
                                                        <div
                                                            className="email-size">
                                                            Phone
                                                        </div>
                                                        <div
                                                            className="email-text">
                                                            <a
                                                                href="mailto:contact@okrated.com"
                                                                className="text-decoration-none  text-white">+91
                                                                1234567890

                                                            </a>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="col-sm-12 col-lg-6 col-md-12 col-12">
                                                <img
                                                    src="assets/img/modal-image.svg"
                                                    className="img-fluid" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                {/* <!-- modal close here --> */}

                <div className="d-block">
                    {/* <!-- Logout Trigger Button --> */}
                    <button type="button"
                        className="btn-transparent btn-primary-transparent dark-gray-16-600 px-0"
                        data-bs-toggle="modal"
                        data-bs-target="#logoutModal1"><img
                            src="assets/img/log-out.svg" />
                        Logout
                    </button>

                    {/* <!-- Logout Confirmation Modal --> */}
                    <div className="modal fade" id="logoutModal1"
                        tabIndex="-1" aria-labelledby="logoutModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div
                                className="modal-content modal-content-logout">

                                {/* <!-- Modal Body --> */}
                                <div className="modal-body modal-container">
                                    <h3 className="text-center">Are you sure
                                        you want to log
                                        out?</h3>
                                </div>

                                {/* <!-- Modal Footer --> */}
                                <div
                                    className="modal-footer modal-footer-logout">
                                    <button type="button"
                                        className="btn btn-logout">Logout</button>
                                    <button type="button"
                                        className="btn btn-cancel"
                                        data-bs-dismiss="modal">Cancel</button>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </>
  );
}
