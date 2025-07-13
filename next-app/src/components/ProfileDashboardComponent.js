'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import api from "@/utils/api"; // Use the wrapped axios instance

export default function ProfileDashboardComponent() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const router = useRouter();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      api.get("/user/profile")
        .then((res) => {
          setProfile(res.data);
          setFormData({
            name: res.data.name || "",
            email: res.data.email || ""
          });
        })
        .catch((err) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            router.push('/login');
          }
        });
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch("/user/update-profile", formData);
      console.log(res.data)
      setProfile(res.data.data);
      setEditing(false);
    } catch (err) {
      alert("Failed to update profile", err);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Profile Dashboard</h1>
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button type="button" onClick={() => setEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="mb-2"><strong>Name:</strong> {profile.name || "Not set"}</p>
          <p className="mb-4"><strong>Email:</strong> {profile.email || "Not set"}</p>
          <button onClick={() => setEditing(true)} className="bg-green-600 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
