// pages/index.jsx
"use client";

import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const hero = document.querySelector(".hero-section");
      const heroContent = document.querySelector(".hero-content");
      if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled * 0.003;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/submit_contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error);
      setSubmitStatus("success");
      setContactForm({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-noto-serif-jp">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-medium">REN ERICK OKIMOTO</h1>
          <div className="hidden md:flex space-x-8">
            {["home", "profile", "career", "gallery", "contact"].map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`uppercase font-light transition-colors ${
                  activeSection === sec ? "text-white" : "text-gray-400"
                } hover:text-white`}
              >
                {sec}
              </button>
            ))}
          </div>
          <div className="flex space-x-4 text-2xl">
            <a href="https://www.instagram.com/erick__yamasita/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.threads.net/@erick__yamasita" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-at"></i>
            </a>
          </div>
        </div>
      </nav>

      {/* Sections */}
      {/* Home */}
      <section
        className={`min-h-screen flex items-center justify-center overflow-hidden relative ${
          activeSection === "home" ? "block" : "hidden"
        }`}
      >
        <div className="hero-section absolute inset-0">
          <img
            src="https://ucarecdn.com/ed740b69-329b-4023-a5aa-3c0413eb4481/-/format/auto/"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
        </div>
        <div className="hero-content relative z-10 text-center mt-32">
          <h2 className="text-4xl md:text-6xl font-medium slide-in-right">
            BREAKING BOUNDARIES
          </h2>
          <h3 className="mt-4 text-2xl md:text-4xl opacity-0 animate-fade-in font-light">
            CREATING STORIES
          </h3>
        </div>
      </section>

      {/* Profile */}
      <section
        className={`min-h-screen py-20 ${
          activeSection === "profile" ? "block" : "hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 pt-20 grid md:grid-cols-2 gap-12 items-center fade-in-up">
          <img
            src="https://ucarecdn.com/b8bdd26f-9c8e-475d-aca6-1bbd5f71313a/-/format/auto/"
            alt="Profile"
            className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold slide-in-right">PROFILE</h2>
            <div className="space-y-4">
              {[
                { label: "Name", value: "Ren Erick Okimoto" },
                { label: "Height", value: "178cm" },
              ].map((item) => (
                <div key={item.label} className="p-4 hover:bg-white/5 rounded transition-transform duration-300 transform hover:translate-x-2">
                  <p>
                    <span className="font-bold">{item.label}:</span> {item.value}
                  </p>
                </div>
              ))}
              <div className="p-4 hover:bg-white/5 rounded transition-transform duration-300 transform hover:translate-x-2">
                <p className="font-bold">Special Skills:</p>
                <ul className="list-disc list-inside pl-4 mt-2">
                  <li>Piano (13 years)</li>
                  <li>Shorinji Kempo (9 years)</li>
                  <li>Tennis (10 years)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career */}
      <section
        className={`min-h-screen py-20 ${
          activeSection === "career" ? "block" : "hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 pt-20 fade-in-up">
          <h2 className="text-3xl font-bold mb-12 slide-in-right">CAREER</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "TELEVISION",
                items: [
                  { name: "青春探偵ハルヤサマーズ", year: "2022.5" },
                  { name: "異世界でスローライフ", year: "2022.7" },
                  { name: "平穏世代の韋駄天達", year: "2022.9" },
                ],
              },
              {
                title: "FILM",
                items: [
                  { name: "なにこ", year: "2023.03" },
                  { name: "長島物語", year: "2023.03" },
                  { name: "青春探偵ハルヤサマーズ", year: "2022.03" },
                ],
              },
            ].map((cat) => (
              <div key={cat.title}>
                <h3 className="text-xl font-bold mb-6">{cat.title}</h3>
                <div className="space-y-4">
                  {cat.items.map((it) => (
                    <div key={it.name} className="p-4 bg-gradient-to-r hover:from-white/5 rounded relative overflow-hidden group">
                      <div className="shine-effect" />
                      <p className="font-bold">{it.name} ({it.year})</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section
        className={`min-h-screen py-20 ${
          activeSection === "gallery" ? "block" : "hidden"
        }`}
      >
        <div className="max-w-full px-4 pt-20">
          <h2 className="text-3xl font-bold mb-12 slide-in-right max-w-7xl mx-auto">GALLERY</h2>
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-4 pb-8 px-4 min-w-max">
              {[
                "ca439e27-f8a3-46d6-92f4-bf46895ca7cb",
                "82c75d26-3282-4f81-b7a7-aec13c15ac7d",
                "feb8de1b-6a80-414f-9043-b18e77c387d3"
              ].map((id) => {
                const url = `https://ucarecdn.com/${id}/-/format/auto/`;
                return (
                  <div key={id} className="relative group cursor-pointer" onClick={() => { setSelectedImage(url); setIsModalOpen(true); }}>
                    <div className="w-[400px] h-[600px] overflow-hidden">
                      <img src={url} alt="Portrait" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-opacity duration-300">
                      <h3 className="text-white text-2xl opacity-0 group-hover:opacity-100">PORTRAIT</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        className={`min-h-screen py-20 ${
          activeSection === "contact" ? "block" : "hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 pt-20 fade-in-up">
          <h2 className="text-3xl font-bold mb-12 slide-in-right">CONTACT</h2>
          <form onSubmit={handleContactSubmit} className="max-w-2xl mx-auto space-y-6">
            {["Name", "Email", "Message"].map((field) => (
              <div key={field}>
                <label className="block mb-2">{field}</label>
                {field !== "Message" ? (
                  <input
                    type={field === "Email" ? "email" : "text"}
                    value={contactForm[field.toLowerCase()]}
                    onChange={(e) => setContactForm({ ...contactForm, [field.toLowerCase()]: e.target.value })}
                    className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                    required
                  />
                ) : (
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-2 bg-gray-900 border border-gray-700 rounded h-32"
                    required
                  />
                )}
              </div>
            ))}
            <button type="submit" className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition-colors">
              Send Message
            </button>
            {submitStatus === "success" && <p className="text-green-500">Message sent successfully!</p>}
            {submitStatus === "error" && <p className="text-red-500">Failed to send message.</p>}
          </form>
        </div>
      </section>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={selectedImage} alt="Selected" className="max-w-full max-h-[90vh] object-contain" />
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setIsModalOpen(false)}>✕</button>
          </div>
        </div>
      )}

      {/* Global Styles & Animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300;400;500;600;700&display=swap');
        body { font-family: 'Noto Serif JP', serif; }
        /* (Insert keyframes and utility classes here) */
      `}</style>
    </div>
  );
}
