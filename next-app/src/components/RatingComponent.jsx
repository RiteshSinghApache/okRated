import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RatingComponent({ userDetails }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const { name, unique_key, google_business_url, business_logo, business_name } = userDetails || {};
  const [businessLogo, setBusinessLogo] = useState(business_logo || "/assets/img/logo-preview.svg");
  const handleRatingClick = (rate) => {
    setRating(rate);
    // Perform task based on selected rating
    switch (rate) {
      case 1:
      case 2:
      case 3:
        router.replace('/feedback?rating=' + rate + '&unique_key=' + unique_key);
        break;
      case 4:
      case 5:
        const google_feedback_url = google_business_url || '';
        router.replace(google_feedback_url);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container container-width">
        <div className="row">
            <div className="main-content text-center">
                
                {userDetails && (
                  <>
                    <p>
                      <Image
                        src={businessLogo}
                        alt={`Business Logo ${business_name}`}
                        className="mx-auto" 
                        onError={() => setBusinessLogo("/assets/img/logo-preview.svg")}
                        width={120}
                        height={120}
                      />
                    </p>
                    <h1 className="h1size30 pb-5 pt-2">{business_name}</h1>
                  </>
                )}
                <p className="dark-gray-16-500">
                    We’d love to hear<br />
                    your experience with us?
                </p>
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
                            width={60}
                            height={60}
                            src={
                            (hovered || rating) >= star
                                ? '/assets/img/star-filled.svg'
                                : '/assets/img/star-outline.png'
                            }
                            alt={`Star ${star}`}
                        />
                        </span>
                    ))}
                </div>
                <div className="bottom-image position-relative">
                    <img
                      src="/assets/img/image-w-100.svg"
                      alt="Bottom Image"
                      className="w-100"
                    />
                    <div className="background-image"></div>
                </div>
            </div>
        </div>
    </div>
  );
}
