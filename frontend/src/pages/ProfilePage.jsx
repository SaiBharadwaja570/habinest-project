import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Pencil, LogOut, Save, User } from "lucide-react";
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
  const [isOwner, setIsOwner] = useState(false);

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

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_USER}/logout`, {}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
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

  const getUserRole = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_USER}/`, {
        withCredentials: true,
      });

      const role = response.data?.data?.type;

      if (role === "owner") {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }

    } catch (error) {
      setIsOwner(false);
      console.error("Failed to fetch user role:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    getUserRole();
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
    <div className="min-h-screen bg-[#E4DFDA] text-black">
      {/* Header */}
      <header className="bg-white/90 shadow-lg sticky top-0 z-50">
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
              {
                isOwner ? (
                  <nav className="flex items-center gap-4">
                    <a 
                      href="#" 
                      onClick={() => navigate("/pg-list")}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007FFF] text-white shadow-lg hover:bg-[#0066CC]"
                    >
                      <Search className="w-4 h-4" />
                      Your PG's
                    </a>
                    <a 
                      href="#" 
                      onClick={() => navigate("/visits")}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10"
                    >
                      <Bookmark className="w-4 h-4" />
                      Booked Visits
                    </a>
                  </nav>
                ) : (
                  <nav className="flex items-center gap-4">
                    <a
                      href="#"
                      onClick={() => navigate("/")}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10"
                    >
                      <Home className="w-4 h-4" />
                      Home
                    </a>
                    <a
                      href="#"
                      onClick={() => navigate("/filter")}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10"
                    >
                      <Search className="w-4 h-4" />
                      Find PGs
                    </a>
                    <a
                      href="#"
                      onClick={() => navigate("/bookmarks")}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007FFF] text-white shadow-lg hover:bg-[#0066CC]"
                    >
                      <Bookmark className="w-4 h-4" />
                      BookMarks
                    </a>
                  </nav>
                )
              }
            </div> 
          </div>
        </div>
      </header>

      <main className="p-6">
        <Card className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg">
          <div className="bg-gradient-to-r from-[#69995D] to-[#504B3A] p-6 text-white rounded-t-2xl">
            <h1 className="text-2xl font-bold text-center">Profile Settings</h1>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-24 h-24 bg-gradient-to-br from-[#007FFF] to-[#0066CC] rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-[#504B3A]">
                    {user?.name || "Loading..."}
                  </h2>
                  <p className="text-[#69995D] text-sm">
                    {isOwner ? "PG Owner" : "User"}
                  </p>
                </div>
              </div>

              {/* User Information Section */}
              <div className="md:col-span-2 space-y-4">
                {user ? (
                  <>
                    {["name", "email", "phone"].map((field) => (
                      <div key={field} className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <label className="text-sm font-medium text-[#69995D] mb-1 block">
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            {editField === field ? (
                              <input
                                type={field === "email" ? "email" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#007FFF] focus:outline-none"
                              />
                            ) : (
                              <p className="text-base font-medium text-[#504B3A]">
                                {user[field] || `No ${field} provided`}
                              </p>
                            )}
                          </div>
                          <div className="ml-3">
                            {editField === field ? (
                              <Button
                                onClick={() =>
                                  handleUpdate(
                                    field === "phone"
                                      ? "Phone"
                                      : field.charAt(0).toUpperCase() + field.slice(1)
                                  )
                                }
                                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
                              >
                                <Save className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                onClick={() => setEditField(field)}
                                className="text-[#69995D] hover:text-[#007FFF] p-2 rounded-lg"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Password Change Section */}
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      {editField === "password" ? (
                        <div className="space-y-3">
                          <h3 className="text-base font-semibold text-[#504B3A]">Change Password</h3>
                          <div>
                            <label className="text-sm font-medium text-[#69995D] mb-1 block">
                              Current Password
                            </label>
                            <input
                              type="password"
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#007FFF] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-[#69995D] mb-1 block">
                              New Password
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#007FFF] focus:outline-none"
                            />
                          </div>
                          <div className="flex gap-3 pt-2">
                            <Button 
                              variant="ghost" 
                              onClick={() => setEditField(null)}
                              className="px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleChangePassword}
                              className="bg-[#007FFF] hover:bg-[#0066CC] text-white px-4 py-2 rounded-lg"
                            >
                              Update Password
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-semibold text-[#504B3A]">Security</h3>
                            <p className="text-[#69995D] text-sm">Change your account password</p>
                          </div>
                          <Button
                            variant="ghost"
                            onClick={() => setEditField("password")}
                            className="text-[#69995D] hover:text-[#007FFF] p-2 rounded-lg"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#007FFF] mx-auto mb-3"></div>
                    <p className="text-[#69995D]">Loading user information...</p>
                  </div>
                )}

                {/* Logout Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> 
                    Sign Out
                  </Button>
                </div>
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
                className="w-10 h-10 object-cover rounded-lg"
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