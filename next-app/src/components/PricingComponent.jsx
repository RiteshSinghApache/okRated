import Image from 'next/image';
import Link from 'next/link';

export default function PricingComponent() {
  return (
    <>
      <section className="pricing py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-12 text-center arrow-hand">
              <p className="dark-gray-16-600 my-0">Pricing</p>
              <h1 className="blue-color h1-size-48">Simple, transparent pricing</h1>
              <p className="dark-gray-20-400">
                We believe OkRated should be accessible to all companies, no matter the size.
              </p>
              <p className="blue-color most-popular">Most popular!</p>
            </div>

            <div className="col-lg-10 col-md-12">
              <div className="row">
                {/* Basic Plan */}
                <div className="col-lg-6 col-md-6">
                  <div className="card h-100 shadow-lg pricing-card position-relative overflow-hidden">
                    <div className="card-body">
                      <div className="text-center">
                        <h2 className="text-center">₹1000/mth</h2>
                        <p className="my-0 f-size-20 black-color pb-2">Basic plan</p>
                        <p className="my-0 dark-gray-20-400">Billed annually.</p>
                      </div>
                      <ul className="list-unstyled mt-4 mb-5 dark-gray-20-400">
                        {[
                          "Access to all basic features",
                          "Basic reporting and analytics",
                          "Up to 10 individual users",
                          "20GB individual data each user",
                          "Basic chat and email support"
                        ].map((text, i) => (
                          <li key={i} className="mb-3 d-flex align-items-center">
                            <Image
                              src="/assets/img/check-icon.svg"
                              alt="check"
                              width={20}
                              height={20}
                              className="me-2"
                            />
                            {text}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={{
                          pathname: "/payment-gateway",
                          query: { plan: "basic" }, // or premium
                        }}
                        className="button-animation button-before-animation"
                        >
                          Get started
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className="col-lg-6 col-md-6 mobile-top-mt">
                  <div className="coming-soon-btn"></div>
                  <div className="card h-100 shadow-lg pricing-card position-relative overflow-hidden light-gray-bg">
                    <div className="card-body">
                      <div className="text-center">
                        <h2 className="text-center">₹2000/mth</h2>
                        <p className="my-0 f-size-20 black-color pb-2">Premium plan</p>
                        <p className="my-0 dark-gray-20-400">Billed annually.</p>
                      </div>
                      <ul className="list-unstyled mt-4 mb-5 dark-gray-20-400">
                        {[
                          "200+ integrations",
                          "Advanced reporting and analytics",
                          "Up to 20 individual users",
                          "40GB individual data each user",
                          "Priority chat and email support"
                        ].map((text, i) => (
                          <li key={i} className="mb-3 d-flex align-items-center">
                            <Image
                              src="/assets/img/check-icon-gray.svg"
                              alt="check"
                              width={20}
                              height={20}
                              className="me-2"
                            />
                            {text}
                          </li>
                        ))}
                      </ul>
                      <button className="btn btn-primary-dark text-white w-100">Get started</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
