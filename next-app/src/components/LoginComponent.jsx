'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { loginSuccess } from '@/store/authSlice';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

export default function LoginComponent() {
  const [phone, setPhone] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const dispatch = useDispatch();
  const router = useRouter();
  const inputRefs = useRef([]);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); 
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:5001/api/auth/send-otp', { phone });
      setStep(2);
      setOtpDigits(['', '', '', '']);
      inputRefs.current[0]?.focus();
      let interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.log(err);
      alert('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    const otp = otpDigits.join('');
    try {
      const res = await axios.post(
        'http://localhost:5001/api/auth/verify-otp',
        { phone, otp },
        { withCredentials: true }
      );

      if (!res.data || !res.data.token || !res.data.user) {
        throw new Error('Invalid response structure');
      }

      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Invalid OTP');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          'http://localhost:5001/api/auth/google-login',
          { token: tokenResponse.credential },
          { withCredentials: true }
        );
        if (!res.data?.user || !res.data?.token) throw new Error('Invalid response');
        dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
        localStorage.setItem('token', res.data.token);
        router.push('/dashboard');
      } catch (err) {
        console.error(err);
        alert('Google login failed');
      }
    },
    onError: () => alert('Google login failed'),
    flow: 'implicit'
  });

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otpDigits];
    updatedOtp[index] = value;
    setOtpDigits(updatedOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  if (!hydrated || isAuthenticated) return null;

  return (
    <>
        <section className="vh-100 py-5">
          <div className="container">
            <div className="row g-0">
              <div className="col-12 col-md-6">
                <Image
                  className="img-fluid rounded-start object-fit-cover"
                  src="/assets/img/login-rating.svg"
                  alt="Login Visual"
                  width={600}
                  height={500}
                  priority
                />
              </div>

              <div className="col-12 col-md-6">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-12">
                            <div className="text-center mb-4">
                                <p>
                                <Image src="/assets/img/logo.svg" alt="Logo" width={140} height={60} />
                                </p>
                                <h1 className="h1-login-head">Log in to your account</h1>
                                <p className="mt-3 loginpara">Welcome back! Please enter your details.</p>
                            </div>
                        </div>
                        {/* ✅ Custom Google Login Button */}
                        <div className="col-12">
                            <div className="d-grid mt-4">
                                <button
                                    className="button-animation button-before-animation"
                                    onClick={() => googleLogin()}
                                >
                                    <span>
                                        <svg
                                            className="text-white bi bi-google"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30" height="30"
                                            fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                                        </svg>
                                        Sign in with Google
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="col-12 mt-3 mb-3 option-login">
                            <p className="text-center">
                            <span className="before-dash"></span>OR<span className="after-dash"></span>
                            </p>
                        </div>
                    </div>
                    <div className="form-lable-size">
                        <div className="mb-4">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            maxLength="10"
                            minLength="10"
                            required
                        />
                        </div>

                    {step === 1 && (
                        <div className="col-12">
                            <div className="d-grid">
                                <button className="btn btn-otp" onClick={sendOtp}>Get OTP</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                      <>
                        <div className="col-12">
                            <div className="mt-3">
                                <div className="position-relative">
                                    <div className="col-12 mt-4">
                                        <label className="form-label">Enter OTP</label>
                                        <div className="otp-input-row d-flex justify-content-between gap-2">
                                            {[0, 1, 2, 3].map((_, i) => (
                                            <input
                                                key={i}
                                                type="text"
                                                className="form-control text-center"
                                                maxLength="1"
                                                placeholder="0"
                                                value={otpDigits[i]}
                                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                                ref={(el) => inputRefs.current[i] = el}
                                            />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <div className="d-grid mt-4">
                                            <button id="validateBtn" className="button-animation button-before-animation validate" onClick={verifyOtp}>
                                            Verify & Login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    {timer > 0 ? (
                                    <p>Resend OTP in {timer}s</p>
                                    ) : (
                                    <button className="btn btn-link" onClick={sendOtp}>Resend OTP</button>
                                    )}
                                </div>
                            </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="text-center mt-5">
                    <p className="f-size-14 color-dark-gray">
                      Don’t have an account?{' '}
                      <Link href="/signup" className="text-decoration-none">Sign up</Link>
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
