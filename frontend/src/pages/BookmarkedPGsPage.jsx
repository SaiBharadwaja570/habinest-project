import React from "react";
import ProfileDropdown from "../components/ProfileDropdown"; 

export default function BookmarkedPGsPage() {
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
          
          
          <ProfileDropdown profileImage="/profile.png" />
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <h1 className="text-2xl font-bold underline decoration-[#69995D] mb-6">
          Book Marked PGs
        </h1>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-1/4 space-y-6">
            <div>
              <h2 className="font-bold mb-2">Keywords</h2>
              <div className="flex flex-wrap gap-2">
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

            {['Color', 'Size'].map((section) => (
              <div key={section}>
                <h3 className="font-semibold mb-2">{section}</h3>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-2 mb-1">
                    <input type="checkbox" defaultChecked className="mt-1" />
                    <div>
                      <div className="font-medium">Label</div>
                      <p className="text-xs text-[#504B3A]/70">Description</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div>
              <label className="font-semibold">Label</label>
              <input type="range" min="0" max="100" className="w-full my-2" />
              <p className="text-sm">$0–100</p>
            </div>
          </aside>

          {/* Listing Area */}
          <section className="w-3/4">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 w-1/2 border border-[#504B3A]/30 rounded"
              />
              <div className="flex gap-2">
                {['New', 'Price ascending', 'Price descending', 'Rating'].map((f, i) => (
                  <button
                    key={f}
                    className={`px-3 py-1 rounded text-sm border ${
                      i === 0
                        ? 'bg-[#504B3A] text-white'
                        : 'border-[#504B3A]/30 text-[#504B3A]'
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
                  className="bg-white border border-[#504B3A]/20 rounded-lg p-4 text-center"
                >
                  <div className="bg-[#E4DFDA] h-32 rounded flex items-center justify-center">
                    <span className="text-[#504B3A]/40">Image</span>
                  </div>
                  <p className="mt-2 font-medium">Text</p>
                  <p className="text-sm font-bold">$0</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

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

        {['Use cases', 'Explore', 'Resources'].map((title, i) => (
          <div key={i}>
            <h5 className="font-bold mb-2">{title}</h5>
            <ul className="space-y-1 text-sm">
              {Array(7).fill('Label').map((label, idx) => (
                <li key={idx}>{label}</li>
              ))}
            </ul>
          </div>
        ))}
      </footer>
    </div>
  );
}
