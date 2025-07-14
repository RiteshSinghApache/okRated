'use client';

import Image from 'next/image';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function FeedbackFormComponent() {
  const router = useRouter();
  const { rating: queryRating, unique_key } = router.query;
  const [rating, setRating] = useState(1);
  const [hovered, setHovered] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // 'success' | 'error'

  const [formData, setFormData] = useState({
    rating: 1,
    name: '',
    email: '',
    phone: '',
    reasons: [],
    otherReason: '',
    improvement: '',
    followUp: '',
  });

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage('');
        setFeedbackType('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  const handleRatingClick = (rate) => {
    setRating(rate);
    setFormData((prev) => ({ ...prev, rating: rate }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'reasons') {
      const updatedReasons = checked
        ? [...formData.reasons, value]
        : formData.reasons.filter((r) => r !== value);
      setFormData({ ...formData, reasons: updatedReasons });
    } else if (type === 'radio' && name === 'followUp') {
      setFormData({ ...formData, followUp: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { 
      rating, 
      name, 
      email, 
      phone, 
      reasons, 
      otherReason, 
      improvement, 
      followUp } = formData;

    // Client-side validation
    if (!rating || !name || !email || !phone || reasons.length === 0 || !followUp) {
      const missingFields = [];

      if (!rating) missingFields.push('Please select a star rating.');
      if (!name) missingFields.push('Name is required.');
      if (!email) missingFields.push('Email is required.');
      if (!phone) missingFields.push('Phone number is required.');
      if (reasons.length === 0) missingFields.push('Please select at least one reason.');
      if (!followUp) missingFields.push('Please select a follow-up option.');

      setFeedbackMessage(missingFields.join(' '));
      setFeedbackType('error');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5001/api/feedback/create-feedback',
        {
          rating,
          name,
          email,
          phone,
          reasons,
          otherReason,
          improvement,
          followUp,
        }
      );

      if (res.data) {
        setFeedbackMessage('✅ Feedback submitted successfully!');
        setFeedbackType('success');

        setFormData({
          rating: '',
          name: '',
          email: '',
          phone: '',
          reasons: [],
          otherReason: '',
          improvement: '',
          followUp: '',
        });
      } else {
        setFeedbackMessage('❌ Something went wrong');
        setFeedbackType('error');
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) {
        setFeedbackMessage(error.response.data.errors.join(' '));
      } else if (error.response?.data?.message) {
        setFeedbackMessage(error.response.data.message);
      } else {
        setFeedbackMessage('❌ Failed to submit feedback. Please try again later.');
      }
      setFeedbackType('error');
    }
  };

  return (
    <div className="container container-width">
      <div className="row">
        <div className="bg-color-radius">
          <p>
            <Image src="/assets/img/taj-logo.svg" alt="Logo" width={120} height={40} className="mx-auto" />
          </p>
          <p className="dark-gray-24-500 pb-3 pt-2">We’re sorry your<br />experience wasn’t great.</p>
          <p className="dark-gray-14-400">What are your thoughts on<br />the experience with us?</p>
          {/* <p><Image src="/assets/img/three-star.svg" alt="Star" width={120} height={24} className="mx-auto" /></p> */}
          <div className="d-flex justify-content-center">
              {[1, 2, 3, 4, 5].map((star) => (
                  <span
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  style={{ cursor: 'pointer' }}
                  >
                  <Image
                      src={
                      (hovered || rating) >= star
                          ? '/assets/img/star-filled.svg'
                          : '/assets/img/star-outline.png'
                      }
                      alt={`Star ${star}`}
                      width={60}
                      height={60}
                  />
                  </span>
              ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="row form-lable-size form-lable-left">
            <input type="hidden" name="rating" value={formData.rating} />
            {/* Name */}
            <div className="mb-4">
              <label className="form-label">Name*</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                required
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="form-label">Email address*</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                required
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="col-12 mb-4 text-left">
              <label className="form-label">Phone Number*</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                placeholder="Enter your phone number"
                maxLength="10"
                value={formData.phone}
                required
                onChange={handleChange}
              />
            </div>

            {/* Reasons */}
            <div className="px-3 mt-4">
              <p className="formhead-18">1. What went wrong with your experience?*</p>
              {[
                "Food quality (cold, stale, undercooked)",
                "Delay in service",
                "Cleanliness or hygiene issues",
                "Staff behavior",
                "Wrong order or billing issue",
              ].map((reason, i) => (
                <div className="form-check" key={i}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="reasons"
                    value={reason}
                    checked={formData.reasons.includes(reason)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{reason}</label>
                </div>
              ))}
            </div>

            {/* Other reason */}
            <div className="my-3">
              <textarea
                className="form-control"
                name="otherReason"
                rows="4"
                placeholder="Other reason"
                value={formData.otherReason}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Specific improvement */}
            <div className="px-3 mt-3">
              <p className="formhead-18">2. Anything specific you`d like us to improve?</p>
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                name="improvement"
                rows="4"
                placeholder="Any specific thing"
                value={formData.improvement}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Follow up */}
            <div className="px-3 mt-3">
              <p className="formhead-18">3. Would you like us to follow up?*</p>
            </div>

            <div className="px-3">
              {['Yes', 'No, just sharing feedback'].map((option, i) => (
                <div className="form-check" key={i}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="followUp"
                    value={option}
                    checked={formData.followUp === option}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-12 mt-4">
            <div className="d-grid">
              <button type="submit" id="validateBtn" className="button-animation button-before-animation validate">
                Submit Feedback
              </button>
            </div>
          </div>
          {feedbackMessage && (
            <div
              className={`alert ${
                feedbackType === 'success' ? 'alert-success' : 'alert-danger'
              }`}
              role="alert"
            >
              {feedbackMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
