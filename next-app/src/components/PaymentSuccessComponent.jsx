import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PaymentSuccess({ status, message }) {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace('/login');
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) return null;

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12">
          <div className="vh-100 d-flex justify-content-center align-items-center payment-btn-width">
            <div>
              <div className="text-center">
                {status === "success" ? (
                  <>
                    <div className="box-full-screen">
                      <h1 className="blue-color h1-size-48">{message}</h1>
                    </div>
                    <p className="dark-gray-20-400-6767">
                      Get ready for an amazing experience with OkRated.
                    </p>
                    <Link
                      href="/dashboard"
                      className="button-animation button-before-animation mt-5"
                    >
                      Back to Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="box-full-screen">
                      <h1 className="blue-color h1-size-48">{message}</h1>
                    </div>
                    <Link
                      href="/pricing"
                      className="button-animation button-before-animation mt-5"
                    >
                      Try Again
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
