import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RatingComponent({ userDetails }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const { name, unique_key } = userDetails || {};
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
        router.replace('/dashboard');
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
                        src="/assets/img/taj-logo.svg"
                        alt="Taj Logo"
                        width={350}
                        height={80}
                        className="mx-auto" />
                    </p>
                    <h1 className="h1size30 pb-5 pt-2">{name}</h1>
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
                <div className="bottom-image position-relative">
                    <Image
                    src="/assets/img/image-w-100.svg"
                    alt="Bottom Image"
                    width={800}
                    height={200}
                    className="w-100"
                    />
                    <div className="background-image"></div>
                </div>
            </div>
        </div>
    </div>
  );
}
