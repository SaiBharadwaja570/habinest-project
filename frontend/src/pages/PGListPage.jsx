import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const pgList = [
  {
    name: "Green Acres PG",
    location: "Located in Downtown Area",
  },
  {
    name: "Blue Horizon PG",
    location: "Located near City Park",
  },
  {
    name: "Sunny Side PG",
    location: "Located by the Riverside",
  },
];

export default function PGListPage() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-[#E4DFDA] text-black">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b bg-[#007FFF] text-white">
        <div className="text-2xl font-bold">Habinest</div>
        <nav className="space-x-4 text-sm">
          <a href="#">Terms And Conditions</a>
          <a href="#">Community</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
          <a href="#">Policies</a>
        </nav>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2"
          >
            <img
              src="/profile.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-[#504B3A]/20 rounded-lg shadow-lg w-48 py-2">
              <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">
                Settings
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">
                Log Out
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-3xl mx-auto space-y-6">
        {pgList.map((pg, index) => (
          <Card key={index} className="rounded-xl shadow-md">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-semibold text-lg text-[#504B3A]">{pg.name}</h3>
                <p className="text-sm text-gray-600">{pg.location}</p>
              </div>
              <Button className="bg-[#69995D] hover:bg-[#5c864e] text-white px-4 py-1 rounded-full">
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-center pt-4">
          <Button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
            Add New PG
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#69995D] text-white p-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Use Cases</h4>
            <ul>
              <li>UI design</li>
              <li>UX design</li>
              <li>Wireframing</li>
              <li>Diagramming</li>
              <li>Brainstorming</li>
              <li>Online whiteboard</li>
              <li>Team collaboration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Explore</h4>
            <ul>
              <li>Design</li>
              <li>Prototyping</li>
              <li>Development features</li>
              <li>Design systems</li>
              <li>Collaboration features</li>
              <li>Design process</li>
              <li>FigJam</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Best practices</li>
              <li>Colors</li>
              <li>Color wheel</li>
              <li>Support</li>
              <li>Developers</li>
              <li>Resource library</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
