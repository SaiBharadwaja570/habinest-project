import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Pencil, LogOut, Save } from "lucide-react";
import { Home, Search, Bookmark } from "lucide-react";
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
  {/* Header */}
<header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="HabinestLogo.jpg"
          alt="Home"
          className="w-10 h-10 object-cover"
        />
        <span className="font-bold text-2xl text-[#504B3A]">Habinest</span>
      </div>

      {/* Centered Nav */}
      <div className="flex-1 flex justify-center">
        <nav className="flex items-center gap-8">
          <a
            href="#"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            Home
          </a>
          <a
            href="#"
            onClick={() => navigate("/filter")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
          >
            <Search className="w-4 h-4" />
            Find PGs
          </a>
          <a
            href="#"
            onClick={() => navigate("/bookmarks")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007FFF] text-white shadow-lg"
          >
            <Bookmark className="w-4 h-4" />
            BookMarks
          </a>
        </nav>
      </div>
    </div>
  </div>
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

      <footer className="mt-16 bg-gradient-to-br from-[#504B3A] to-[#69995D] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-6 text-[#E4DFDA]">Use Cases</h4>
              <ul className="space-y-3 text-white/80">
                <li className="hover:text-white transition-colors cursor-pointer">Student housing discovery</li>
                <li className="hover:text-white transition-colors cursor-pointer">Professional relocation</li>
                <li className="hover:text-white transition-colors cursor-pointer">Personalized PG browsing</li>
                <li className="hover:text-white transition-colors cursor-pointer">Booking site visits</li>
                <li className="hover:text-white transition-colors cursor-pointer">Saving/bookmarking PGs</li>
                <li className="hover:text-white transition-colors cursor-pointer">Mobile-responsive exploration</li>
                <li className="hover:text-white transition-colors cursor-pointer">Feedback and ratings system</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-[#E4DFDA]">Explore</h4>
              <ul className="space-y-3 text-white/80">
                <li className="hover:text-white transition-colors cursor-pointer">PG Listings & Filters</li>
                <li className="hover:text-white transition-colors cursor-pointer">Profile & Preferences</li>
                <li className="hover:text-white transition-colors cursor-pointer">Map-based PG Search</li>
                <li className="hover:text-white transition-colors cursor-pointer">Real-time Suggestions</li>
                <li className="hover:text-white transition-colors cursor-pointer">Dark Mode UI</li>
                <li className="hover:text-white transition-colors cursor-pointer">Ratings & Reviews</li>
                <li className="hover:text-white transition-colors cursor-pointer">Similar PG Recommendations</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-[#E4DFDA]">Resources</h4>
              <ul className="space-y-3 text-white/80">
                <li className="hover:text-white transition-colors cursor-pointer">Blog & Guides</li>
                <li className="hover:text-white transition-colors cursor-pointer">Best Practices for Users</li>
                <li className="hover:text-white transition-colors cursor-pointer">Support & Contact Form</li>
                <li className="hover:text-white transition-colors cursor-pointer">Developer API Docs</li>
                <li className="hover:text-white transition-colors cursor-pointer">Location Data (OpenStreetMap)</li>
                <li className="hover:text-white transition-colors cursor-pointer">Progress Trackers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Resource Library</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
  <img
    src="HabinestLogo.jpg"  
    alt="Home"
    className="w-10 h-10 object-cover"
  />
              <span className="font-bold text-xl">Habinest</span>
            </div>
            <p className="text-white/60">Making your housing search effortless and enjoyable</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
