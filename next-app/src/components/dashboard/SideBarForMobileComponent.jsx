import Link from 'next/link';
import { useRouter } from 'next/router';
export default function SideBarForMobileComponent() {
    const router = useRouter();
    return (
        <div className="offcanvas offcanvas-start bg-gray-light"
                tabindex="-1"
                id="mobileSidebar" aria-labelledby="mobileSidebarLabel">

                <div
                    className="offcanvas-body d-flex flex-column justify-content-between">
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
                            <Link
                                className="btn-blue text-decoration-none d-block"
                                href="#/dashboard"
                                role="button"><img
                                    src="assets/img/bar-chart.svg" />
                                Dashboard</Link>

                        </div>
                        <div className="dashboard-button mt-5">
                            <Link
                                className="btn-blue text-decoration-none d-block"
                                href="/my-profile"
                                role="button"><img
                                    src="assets/img/bar-chart.svg" />
                                Profile</Link>

                        </div>
                        <div className="offcanvas-header">

                            <button type="button"
                                className="btn-close btn-close-black"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>

                    </div>

                    <div className="d-block">

                        {/* this is for mobile support mobile only */}

                        {/* Button trigger modal */}

                        <button type="button"
                            className="btn-transparent btn-primary-transparent dark-gray-16-600 px-0 mb-3"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal2">
                            <img
                                src="assets/img/support.svg" /> Support
                        </button>

                        <div className="modal fade"
                            id="exampleModal2"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel2"
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
                                                    className="col-sm-12 col-lg-6 col-md-12 col-12 modal-container">
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
                                                                    className="text-decoration-none text-white">contact@okrated.com

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
                                                    className="col-sm-12  col-lg-6 col-md-12 col-12 mobile-space-mt">
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

                        {/* here is close support modal code for screen mobile  */}

                        {/* <a href="#"
                            className="d-block mb-2 dark-gray-16-600 text-decoration-none"><img
                                src="assets/img/support.svg" />
                            Support</a> */}

                        {/* this is for mobile screen only */}
                        {/* <a href="#"
                            className="dark-gray-16-600 text-decoration-none"><img
                                src="assets/img/log-out.svg" /> Logout</a> */}

                        {/* Logout Trigger Button */}
                        <div className="d-block">
                            <button type="button"
                                className="btn-transparent btn-primary-transparent dark-gray-16-600 px-0"
                                data-bs-toggle="modal"
                                data-bs-target="#logoutModal2"><img
                                    src="assets/img/log-out.svg" />
                                Logout
                            </button>

                            {/* Logout Confirmation Modal */}
                            <div className="modal fade" id="logoutModal2"
                                tabindex="-1"
                                aria-labelledby="logoutModalLabel2"
                                aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div
                                        className="modal-content modal-content-logout">

                                        {/* Modal Body */}
                                        <div className="modal-body heding-logout">
                                            <h3 className="text-center">Are you sure
                                                you want to log
                                                out?</h3>
                                        </div>

                                        {/* Modal Footer */}
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
            </div>
    );
}
