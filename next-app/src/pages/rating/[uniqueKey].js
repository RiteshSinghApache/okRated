import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthHeadMeta from "@/components/AuthHeadMeta";
import RatingComponent from "@/components/RatingComponent";
import AuthFooterScripts from "@/components/AuthFooterScripts";
import ErrorComponent from "@/components/ErrorComponent";

export default function RatingPage() {
  const router = useRouter();
  const { uniqueKey } = router.query;

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!uniqueKey) return;

    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/user/profile/unique/${uniqueKey}`);
        if (!res.ok) {
          //throw new Error('User not found');
          console.error('Failed to fetch user details:', res);
        }
        const data = await res.json();
        if (!data || Object.keys(data).length === 0) {
          //throw new Error('No user data');
          console.error('No user data');
        }
        setUserDetails(data);
      } catch (err) {
        console.error('User fetch failed:', err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [uniqueKey]);

  return (
    <>
      <AuthHeadMeta title="Rating Page" />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <ErrorComponent message="Data not found or invalid link." />
      ) : (
        <RatingComponent userDetails={userDetails} />
      )}
      <AuthFooterScripts />
    </>
  );
}
