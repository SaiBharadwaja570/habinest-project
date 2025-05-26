import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Search, Bookmark, User, Settings, LogOut } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import axios from "axios";


const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/user/logout", {}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };  

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
  <img
    src="HabinestLogo.jpg"  
    alt="Home"
    className="w-10 h-10 object-cover"
  />
          <span className="font-bold text-2xl text-[#504B3A]">Habinest</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007FFF] text-white shadow-lg"
          >
            <Home className="w-4 h-4" /> Home
          </a>
          <a
            href="#"
            onClick={() => navigate("/filter")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
          >
            <Search className="w-4 h-4" /> Find PGs
          </a>
          <a
            href="#"
            onClick={() => navigate("/bookmarks")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
          >
            <Bookmark className="w-4 h-4" /> Bookmarks
          </a>
        </nav>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#007FFF] to-[#69995D] hover:scale-105 transition-transform duration-200"
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <User className="w-6 h-6 text-[#504B3A]" />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white/95 backdrop-blur-sm border border-[#504B3A]/10 rounded-2xl shadow-2xl w-56 py-2 animate-in slide-in-from-top-5">
              <a
                href="#"
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#504B3A] hover:bg-[#69995D]/10 transition-colors"
              >
                <User className="w-4 h-4" /> Profile
              </a>
              <a
                href="#"
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#504B3A] hover:bg-[#69995D]/10 transition-colors"
              >
                <Settings className="w-4 h-4" /> Settings
              </a>
                  <a href="#"  onClick={() => handleLogout()} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Footer (taken from FilterListingPage)
const Footer = () => (
  <footer className="mt-16 bg-gradient-to-br from-[#504B3A] to-[#69995D] text-white">
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
  <img
    src="HabinestLogo.jpg"  
    alt="Home"
    className="w-10 h-10 object-cover"
  />
        <span className="font-bold text-xl">Habinest</span>
      </div>
      <p className="text-white/60">
        Making your housing search effortless and enjoyable
      </p>
    </div>
  </footer>
);

// Home Page Body
const HomePage = () => {
  const featuredPGs = [
    {
      name: "Zolo Highstreet",
      location: "Electronic City, Bangalore",
      price: "₹8500/month",
      image: "/zh.jpg",
    },
    {
      name: "Sr Comforts Coliving",
      location: "Neeladri Nagar, Bangalore",
      price: "₹8700/month",
      image: "/cO.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Sneha Kapoor",
      avatar: "/p1.jpg",
      testimonial:
        "Habinest helped me find the perfect PG in minutes. Super smooth experience!",
    },
    {
      name: "Arjun Rao",
      avatar: "/p2.jpg",
      testimonial:
        "Love the UI and how easy it is to compare PG options. Highly recommended!",
    },
    {
      name: "Ravi Menon",
      avatar: "/p3.jpg",
      testimonial:
        "The filters are very accurate. I found a PG near my office within 2 km.",
    },
    {
      name: "Priya Nair",
      avatar: "/p4.jpg",
      testimonial:
        "Was able to bookmark and review PGs seamlessly. Habinest is a lifesaver!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E4DFDA] to-[#69995D]/10">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-[#504B3A] text-2xl font-semibold mb-6">Featured PGs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {featuredPGs.map((pg, i) => (
              <div
                key={i}
                className="rounded-2xl shadow-lg bg-white overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <img
                  src={pg.image}
                  alt={pg.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#504B3A]">{pg.name}</h3>
                  <p className="text-sm text-[#504B3A]/70">{pg.location}</p>
                  <p className="mt-2 text-[#007FFF] font-semibold">{pg.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[#504B3A] text-2xl font-semibold mb-6">Testimonials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {testimonials.map((user, i) => (
              <Card
                key={i}
                className="p-4 bg-[#E4DFDA] text-[#504B3A] rounded-xl shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover shadow"
                  />
                  <div className="text-sm font-semibold">{user.name}</div>
                </div>
                <p className="text-xs text-[#504B3A]">{user.testimonial}</p>
              </Card>
            ))}
          </div>
        </section>
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

export default HomePage;
