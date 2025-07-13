import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '@/store/authSlice'

export default function OTPLogin() {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(60)
  const dispatch = useDispatch()
  const router = useRouter()

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { phone })
      setStep(2)
      let interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      alert('Failed to send OTP')
    }
  }

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { phone, otp }, { withCredentials: true })
      dispatch(loginSuccess(res.data.user))
      router.push('/dashboard')
    } catch {
      alert('Invalid OTP')
    }
  }

  return (
    <div className="container mt-5">
      <h2>Phone OTP Login</h2>
      {step === 1 && (
        <>
          <input className="form-control mb-3" placeholder="Enter phone" value={phone} onChange={e => setPhone(e.target.value)} />
          <button className="btn btn-primary" onClick={sendOtp}>Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <input className="form-control mb-3" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
          <button className="btn btn-success" onClick={verifyOtp}>Verify OTP</button>
          <div className="mt-2">
            {timer > 0 ? `Resend OTP in ${timer}s` : <button className="btn btn-link" onClick={sendOtp}>Resend OTP</button>}
          </div>
        </>
      )}
    </div>
  )
}
