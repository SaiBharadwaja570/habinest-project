import React, { useState } from "react";

export default function FilterListingPage() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-[#E4DFDA] text-[#504B3A] font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-[#504B3A]/20">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Habinest" className="w-10 h-10" />
          <span className="font-bold text-xl">Habinest</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#">Terms And</a>
          <a href="#">Conditions</a>
          <a href="#">Community</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
          <a href="#">Policies</a>

          {/* Dropdown Profile */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2"
            >
              <img
                src="/profile.png"
                alt="User"
                className="w-10 h-10 rounded-full border border-[#504B3A]"
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
        </nav>
      </header>

      {/* Main content */}
      <div className="flex px-4 py-6">
        {/* Sidebar Filters */}
        <aside className="w-1/4 pr-4 space-y-4">
          <div>
            <h3 className="font-bold">Keywords</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Spring', 'Smart', 'Modern'].map((tag) => (
                <span
                  key={tag}
                  className="bg-[#69995D] text-white px-2 py-1 rounded-full text-xs"
                >
                  {tag} ✕
                </span>
              ))}
            </div>
          </div>

          {["Color", "Size"].map((filter) => (
            <div key={filter}>
              <h4 className="font-semibold">{filter}</h4>
              <ul className="space-y-1 mt-2">
                {Array(3).fill(0).map((_, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" defaultChecked />
                    <div>
                      <span className="font-medium">Label</span>
                      <p className="text-xs text-[#504B3A]/80">Description</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <label className="block font-semibold">Label</label>
            <input type="range" min="0" max="100" className="w-full" />
            <div className="text-sm">$0–100</div>
          </div>
        </aside>

        {/* Listings */}
        <main className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border border-[#504B3A]/20 rounded w-1/2"
            />
            <div className="flex gap-2">
              {["New", "Price ascending", "Price descending", "Rating"].map((f, idx) => (
                <button
                  key={f}
                  className={`px-3 py-1 text-sm rounded border ${
                    idx === 0
                      ? "bg-[#504B3A] text-white"
                      : "border-[#504B3A]/30 text-[#504B3A]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-[#504B3A]/20 p-4 text-center"
              >
                <div className="bg-[#E4DFDA] h-32 flex items-center justify-center rounded">
                  <span className="text-[#504B3A]/40">Image</span>
                </div>
                <p className="mt-2 font-medium">Text</p>
                <p className="text-sm font-bold">$0</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#504B3A] text-white px-6 py-10 grid grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex gap-2 text-xl">
            <i className="fab fa-figma" />
            <i className="fab fa-instagram" />
            <i className="fab fa-youtube" />
            <i className="fab fa-linkedin" />
          </div>
        </div>

        {["Use cases", "Explore", "Resources"].map((title, i) => (
          <div key={i}>
            <h5 className="font-bold mb-2">{title}</h5>
            <ul className="space-y-1 text-sm">
              {Array(7).fill("Label").map((label, idx) => (
                <li key={idx}>{label}</li>
              ))}
            </ul>
          </div>
        ))}
      </footer>
    </div>
  );
}
