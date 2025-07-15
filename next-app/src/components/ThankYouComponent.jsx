'use client';

import Image from 'next/image';

export default function ThankYouComponent() {
  return (
    <div className="container container-width">
      <div className="row">
        <div className="main-content text-center">
          <p className="pb-5">
            <Image
              src="/assets/img/taj-log-l.svg"
              alt="Taj Logo"
              width={260}
              height={150}
              className="mx-auto"
            />
          </p>
          <p className="pb-4">
            <Image
              src="/assets/img/thank-you.svg"
              alt="Thank You"
              width={500}
              height={250}
              className="mx-auto"
            />
          </p>
          <p className="dark-gray-14-400">
            We love hearing from you!<br />
            Thank you for leaving feedback for us.
          </p>

          <div className="bottom-image">
            <div className="background-image-bg-blue"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
