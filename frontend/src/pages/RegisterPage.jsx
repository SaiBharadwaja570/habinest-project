import React from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 border-b">
        <img src="/logo.png" alt="Habinest Logo" className="h-12 w-12" />
        <div className="space-x-4 text-sm text-teal-600">
          <a href="#">Products</a>
          <a href="#">Solutions</a>
          <a href="#">Community</a>
          <a href="#">Resources</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
          <a href="#">Link</a>
        </div>
      </nav>

      {/* Register Section */}
      <section className="bg-green-600 text-white py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-8">Register</h1>
        <div className="max-w-xl mx-auto space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-md text-black"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md text-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md text-black"
          />
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold">
            Register as User
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold">
            Register as Owner
          </button>
          <button
            onClick={handleLoginClick} // Add click handler
            className="bg-black text-white px-6 py-2 rounded-md font-semibold"
          >
            Login
          </button>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-xl font-semibold">Heading</h2>
        <p className="text-gray-500 mb-8">Subheading</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="text-left">
              <div className="text-xl mb-2">ⓘ Title</div>
              <p className="text-sm text-gray-600">
                Body text for whatever you'd like to say. Add main takeaway points,
                quotes, anecdotes, or even a very very short story.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
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
          <h4 className="font-semibold mb-2">Use cases</h4>
          <ul className="space-y-1">
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
          <ul className="space-y-1">
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
          <ul className="space-y-1">
            <li>Blog</li>
            <li>Best practices</li>
            <li>Colors</li>
            <li>Color wheel</li>
            <li>Support</li>
            <li>Developers</li>
            <li>Resource library</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
