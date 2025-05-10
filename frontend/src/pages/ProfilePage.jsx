import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Pencil, LogOut } from "lucide-react";

const ProfilePage = () => {
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

        {/* Profile Image and Dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center gap-2">
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
      <main className="p-8">
        <Card className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center">
              <img
                src="/profile.png"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-[#007FFF]"
              />
              <Button variant="ghost" className="mt-2 text-[#007FFF]">
                <Pencil className="mr-2 h-4 w-4" /> Edit Picture
              </Button>
            </div>

            {/* Profile Details Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Name:</p>
                  <p className="text-lg font-semibold">John Doe</p>
                </div>
                <Pencil className="text-[#504B3A] cursor-pointer" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Email:</p>
                  <p className="text-lg font-semibold">johndoe@gmail.com</p>
                </div>
                <Pencil className="text-[#504B3A] cursor-pointer" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Mobile Phone(+1):</p>
                  <p className="text-lg font-semibold">(123) 456-7890</p>
                </div>
                <Pencil className="text-[#504B3A] cursor-pointer" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Change Password</p>
                <Pencil className="text-[#504B3A] cursor-pointer" />
              </div>
              <div className="pt-4">
                <Button variant="destructive" className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Log Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
};

export default ProfilePage;
