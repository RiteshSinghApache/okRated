import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PaymentSuccess() {
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12">
          <div className="vh-100 d-flex justify-content-center align-items-center payment-btn-width">
            <div>
              <div className="text-center">
                <div className="box-full-screen">
                  <h1 className="blue-color h1-size-48">
                    Thank you for making payment.
                  </h1>
                </div>
                <p className="dark-gray-20-400-6767">
                  Get ready for an amazing experience with OkRated.
                </p>

                <Link
                  href="/dashboard"
                  className="button-animation button-before-animation mt-5"
                >
                  Login to your account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
