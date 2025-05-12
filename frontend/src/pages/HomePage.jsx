import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark,
  MoreVertical,
} from "lucide-react";
import ProfileDropdown from "../components/ProfileDropdown";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Habinest Logo" className="h-10 w-10" />
        <span className="font-semibold text-lg text-[#504B3A]">Habinest</span>
      </div>
  <div className="space-x-4 text-sm text-teal-700 font-medium">
    <a href="#">Find PGs</a>
    <a href="#">Map View</a>
    <a href="#">Book a Visit</a>
    <a href="#">Saved</a>
    <a href="#">My Dashboard</a>
    <a href="#">Write a Review</a>
  </div>
    </nav>
  );
};

const InfoCard = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 rounded-2xl shadow-xl bg-[#E4DFDA]">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="w-48 h-48 bg-gray-300 rounded-lg" />
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <Share2 className="text-[#504B3A] cursor-pointer" />
          <Bookmark className="text-[#504B3A] cursor-pointer" />
          <MoreVertical className="text-[#504B3A] cursor-pointer" />
        </div>

        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <ArrowLeft className="text-[#69995D] cursor-pointer" />
        </div>

        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <ArrowRight className="text-[#69995D] cursor-pointer" />
        </div>
      </div>

      <Card className="rounded-none border-t border-[#504B3A]">
        <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center text-[#504B3A]">
          <div className="text-lg font-medium">$0</div>
          <div className="text-sm text-right">
            All the necessary options
            <br />
            and contact details
          </div>
        </CardContent>
        <CardContent className="pb-6 px-6 text-sm text-[#504B3A]">
          You guys can change the length if you think it is needed
        </CardContent>
      </Card>
    </div>
  );
};

const SponsoredSection = () => {
  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-[#504B3A] text-lg font-semibold mb-4">
        Sponsored PGs (ads)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="w-full h-40 bg-gray-200 rounded-xl"
          ></div>
        ))}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-[#504B3A] text-lg font-semibold mb-4">
        Testimonials
      </h2>
      <div className="flex items-center gap-3 mb-6">
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full bg-yellow-300 border-2 border-white"
          ></div>
        ))}
        <span className="text-sm text-[#69995D] font-medium">+1</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((_, i) => (
          <Card
            key={i}
            className="p-4 bg-[#E4DFDA] text-[#504B3A] rounded-xl shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div className="text-sm font-semibold">Title</div>
            </div>
            <p className="text-xs text-[#504B3A]">Description</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="border-t p-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-600">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-6 w-6" />
        </div>
        <div className="flex gap-2 text-xl">
          <span>🧿</span>
          <span>📷</span>
          <span>📹</span>
          <span>🔗</span>
        </div>
      </div>

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
    </footer>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <Button
          className="bg-[#69995D] text-white hover:bg-[#587f4e] px-6 py-2"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          className="bg-[#69995D] text-white hover:bg-[#587f4e] px-6 py-2"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </div>
      <InfoCard />
      <SponsoredSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
