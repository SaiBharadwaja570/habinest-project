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
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img src="/HabinestLogo.jpg" alt="Habinest Logo" className="h-10 w-10" />
        <span className="font-semibold text-lg text-[#504B3A]">Habinest</span>
      </div>

      {/* Center: Navigation links */}
      <div className="space-x-4 text-sm text-teal-700 font-medium hidden md:flex">
        <a href="#" onClick={()=>navigate('/filter')}>Find PGs</a>
        <a href="#" onClick={()=>navigate('/bookmarks')}>BookMarks</a>
        <a href="#">Write a Review</a>
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-2">
        <Button
          className="bg-[#69995D] text-white text-sm px-4 py-1 hover:bg-[#587f4e]"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          className="bg-[#69995D] text-white text-sm px-4 py-1 hover:bg-[#587f4e]"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </div>
    </nav>
  );
};

const avatarUrls = [
  "/p1.jpg",
  "/p2.jpg",
  "/p3.jpg",
  "/p4.jpg",
];

const TestimonialSection = () => {
  const users = [
    {
      name: "Sneha Kapoor",
      avatar: "/p1.jpg",
      testimonial: "Habinest helped me find the perfect PG in minutes. Super smooth experience!",
    },
    {
      name: "Arjun Rao",
      avatar: "/p2.jpg",
      testimonial: "Love the UI and how easy it is to compare PG options. Highly recommended!",
    },
    {
      name: "Ravi Menon",
      avatar: "/p3.jpg",
      testimonial: "The filters are very accurate. I found a PG near my office within 2 km.",
    },
    {
      name: "Priya Nair",
      avatar: "/p4.jpg",
      testimonial: "Was able to bookmark and review PGs seamlessly. Habinest is a lifesaver!",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-[#504B3A] text-lg font-semibold mb-4">
        Testimonials
      </h2>

      {/* Avatars Row */}
      <div className="flex items-center gap-3 mb-6">
        {users.map((user, i) => (
          <img
            key={i}
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
        ))}
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {users.map((user, i) => (
          <Card
            key={i}
            className="p-4 bg-[#E4DFDA] text-[#504B3A] rounded-xl shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-sm font-semibold">{user.name}</div>
            </div>
            <p className="text-xs text-[#504B3A]">{user.testimonial}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

const InfoCard = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 rounded-2xl shadow-xl bg-[#E4DFDA]">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex-1 p-6 flex items-center justify-center">
<img
  src="/s1.jpg"
  alt="Main PG"
  className="w-48 h-32 rounded-lg object-cover"
/>
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
{["/s2.jpg", "/s3.jpg", "/s4.jpg"].map((img, i) => (
  <img
    key={i}
    src={img}
    alt={`Sponsored PG ${i + 1}`}
    className="w-full h-40 object-cover rounded-xl"
  />
))}
      </div>
    </div>
  );
};



const Footer = () => {
  return (
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

  );
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-12 gap-4">


      </div>
      <InfoCard />
      <SponsoredSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default HomePage;
