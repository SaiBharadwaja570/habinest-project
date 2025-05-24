import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Pencil, LogOut, Save } from "lucide-react";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword } = passwordData;

    if (!currentPassword || !newPassword) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_USER}/updatePassword`,
        {
          oldPassword: currentPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      alert("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "" });
      setEditField(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to change password.");
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_USER}`, {
        withCredentials: true,
      });
      setUser(res.data.data);
      setFormData({
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,
      });
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (field) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_USER}/updateAccount${field}`,
        { [field.toLowerCase()]: formData[field.toLowerCase()] },
        { withCredentials: true }
      );
      setEditField(null);
      fetchUser();
      alert(`${field} updated successfully!`);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E4DFDA] text-black">
      <header className="flex justify-between items-center p-4 border-b bg-[#007FFF] text-white">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/HabinestLogo.jpg"
            alt="Habinest Logo"
            className="h-10 w-10"
          />
          <span className="text-2xl font-bold">Habinest</span>
        </div>

        <nav className="space-x-4 text-sm text-gray-100 font-medium">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/filter")}>Find PGs</button>
          <button onClick={() => navigate("/bookmarks")}>BookMarks</button>
        </nav>
      </header>

      <main className="flex-grow p-8">
        <Card className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <img
                src="/profile.png"
                alt="Profile"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#007FFF]"
              />
              <Button variant="ghost" className="mt-2 text-[#007FFF]">
                <Pencil className="mr-2 h-4 w-4" /> Edit Picture
              </Button>
            </div>

            <div className="space-y-4">
              {user ? (
                ["name", "email", "phone"].map((field) => (
                  <div key={field} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                      </p>
                      {editField === field ? (
                        <input
                          type="text"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        <p className="text-lg font-semibold">{user[field]}</p>
                      )}
                    </div>
                    {editField === field ? (
                      <Save
                        className="text-green-600 cursor-pointer"
                        onClick={() =>
                          handleUpdate(
                            field === "phone"
                              ? "Phone"
                              : field.charAt(0).toUpperCase() + field.slice(1)
                          )
                        }
                      />
                    ) : (
                      <Pencil
                        className="text-[#504B3A] cursor-pointer"
                        onClick={() => setEditField(field)}
                      />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Loading user...</p>
              )}

              {editField === "password" ? (
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-500">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full border rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full border rounded px-2 py-1"
                    />
                  </div>
                  <div className="flex gap-4 mt-2">
                    <Button variant="ghost" onClick={() => setEditField(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleChangePassword}>Submit</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">Change Password</p>
                  <Pencil
                    className="text-[#504B3A] cursor-pointer"
                    onClick={() => setEditField("password")}
                  />
                </div>
              )}

              <div className="pt-4">
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() => navigate("/logout")}
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t p-8 bg-white text-sm text-gray-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <h4 className="font-semibold mb-2">Use Cases</h4>
            <ul className="space-y-1">
              <li>Student housing discovery</li>
              <li>Professional relocation</li>
              <li>Personalized PG browsing</li>
              <li>Booking site visits</li>
              <li>Saving/bookmarking PGs</li>
              <li>Mobile-responsive exploration</li>
              <li>Feedback and ratings system</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Explore</h4>
            <ul className="space-y-1">
              <li>PG Listings & Filters</li>
              <li>Profile & Preferences</li>
              <li>Map-based PG Search</li>
              <li>Real-time Suggestions</li>
              <li>Dark Mode UI</li>
              <li>Ratings & Reviews</li>
              <li>Similar PG Recommendations</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Resources</h4>
            <ul className="space-y-1">
              <li>Blog & Guides</li>
              <li>Best Practices for Users</li>
              <li>Support & Contact Form</li>
              <li>Developer API Docs</li>
              <li>Location Data (OpenStreetMap)</li>
              <li>Progress Trackers</li>
              <li>Resource Library</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
