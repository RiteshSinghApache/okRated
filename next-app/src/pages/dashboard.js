import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import api from "@/utils/api";
import HeadComponent from "../components/dashboard/HeadComponent";
import NavComponent from "../components/dashboard/NavComponent";
import MainComponent from "@/components/dashboard/MainComponent";
import SideBarForMobileComponent from "../components/dashboard/SideBarForMobileComponent";

import '@/styles/custome-style.css'
import '@/styles/globals.css'
import '@/styles/dashboard.css';
import '@/styles/media-only.css';

export default function ProfileDashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get("/user/profile");
        if (isMounted) {
          setProfile(res.data);
          setError(null);
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          router.push('/login');
        } else if (isMounted) {
          setError("Failed to load profile.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (!isAuthenticated) {
      router.push("/login");
    } else {
      fetchProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
      <HeadComponent />
      <NavComponent />
      <div className="container-fluid h-100">
        <MainComponent profile={profile} />
        {/* Offcanvas Sidebar for Mobile */}
        <SideBarForMobileComponent />
      </div>
    </>
  );
}
