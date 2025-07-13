import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setUserAuthenticated } from "@/store/authSlice";

export default function Dashboard() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      axios
        .get("http://localhost:5001/api/auth/me", { withCredentials: true })
        .then((res) => {
          dispatch(setUserAuthenticated(res.data));
          setFormData({
            name: res.data.name || "",
            email: res.data.email || "",
          });
        })
        .catch(() => router.push("/login"));
    }
  }, [isAuthenticated]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("http://localhost:5001/api/user/update-profile", formData, {
        withCredentials: true,
      });
      dispatch(setUserAuthenticated(res.data));
      setEditing(false);
    } catch (err) {
      alert("Update failed", err.massage);
    }
  };

  if (!user) return <p>Loading...</p>;

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
            />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            <button type="button" onClick={() => setEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name || "Not set"}</p>
          <p><strong>Email:</strong> {user.email || "Not set"}</p>
          <button onClick={() => setEditing(true)} className="bg-green-600 text-white px-4 py-2 rounded">Edit Profile</button>
        </div>
      )}
    </div>
  );
}
