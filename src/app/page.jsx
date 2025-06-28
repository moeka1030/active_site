"use client";
import React, { useState, useEffect } from "react";

function MainComponent() {
  const [activeSection, setActiveSection] = useState("home");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parallax effect hook
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
      const response = await fetch("/api/submit_contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setSubmitStatus("success");
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-noto-serif-jp">
      {/* Navigation - Updated with new font */}
      <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium">REN ERICK OKIMOTO</h1>
            <div className="hidden md:flex space-x-8">
              {["home", "profile", "career", "gallery", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`uppercase ${
                      activeSection === section ? "text-white" : "text-gray-400"
                    } hover:text-white transition-colors font-light`}
                  >
                    {section}
                  </button>
                )
              )}
            </div>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/erick__yamasita/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.threads.net/@erick__yamasita"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl"
              >
                <i className="fab fa-at"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section with updated hero image */}
      <section
        className={`min-h-screen flex items-center justify-center overflow-hidden relative ${
          activeSection === "home" ? "block" : "hidden"
        }`}
      >
        <div className="hero-section absolute inset-0">
          <img
            src="https://ucarecdn.com/ed740b69-329b-4023-a5aa-3c0413eb4481/-/format/auto/"
            alt="沖本　蓮　エリック"
            className="w-full h-full object-contain object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"></div>
        </div>
        <div className="hero-content relative z-10 text-center transform transition-all duration-1000 mt-32">
          <h2 className="text-2xl md:text-7xl font-medium slide-in-right">
            沖本　蓮　エリック
          </h2>
          <h3 className="text-2xl md:text-2xl mt-4 opacity-0 animate-fade-in font-light">
            Relentless pursuit of excellence
          </h3>
        </div>
      </section>

      {/* Profile Section */}
      <section
        className={`min-h-screen py-20 ${
          activeSection === "profile" ? "block" : "hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 pt-20 fade-in-up">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="https://ucarecdn.com/b8bdd26f-9c8e-475d-aca6-1bbd5f71313a/-/format/auto/"
              alt="Profile"
              className="w-full h-[600px] object-contain transform hover:scale-105 transition-all duration-500"
            />
            <div className="space-y-6">
              <h2 className="text-3xl font-bold slide-in-right">PROFILE</h2>
              <div className="space-y-4">
                {[
                  { label: "Name", value: "沖本　蓮　エリック" },
                  { label: "Height", value: "180cm" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-white/5 transform hover:translate-x-2 transition-all duration-300 rounded"
                  >
                    <p>
                      <span className="font-bold">{item.label}:</span>{" "}
                      {item.value}
                    </p>
                  </div>
                ))}
                <div className="p-4 hover:bg-white/5 transform hover:translate-x-2 transition-all duration-300 rounded">
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
        </div>
      </section>

      {/* Career Section */}
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
                  { name: "アビラコート 渋谷センター街ビジョン他7箇所", year: "2022.12" },
                  { name: "森永製菓 板チョコアイス「板チョコ裁判」篇 (裁判員役）", year: "2022.09" },
                  { name: "TX「警視庁強行犯係 樋口顕」8話 (野球部先輩役)", year: "2022.9" },
                  
                ],
              },
              {
                title: "FILM",
                items: [
                  { name: "「silent love」(佐伯役)", year: "2024.01" },
                  { name: "「なのに、千輝くんが甘すぎる。」(陸上部員役", year: "2023.03" },
                  { name: "自主制作映画「Z の世界」 (主演 こう役)", year: "2023.03" },
                                    { name: "「暴太郎戦隊ドンブラザーズ」劇場版(生徒役)", year: "2022.03" },
                ],
              },
              {
                title: "OTHER",
                items: [
                  { name: "スギ薬局スタイリングモデル（スギ薬局×中野製薬共同開発 PROMONY新作発表会）", year: "2025.5" },
                  { name: "再構築 Paris A/W collection Lorena Cordero A/W collection（Paris Colllection）", year: "2025.3" },
                  { name: "Motor Bike Expo 2024 in Verona Italy 再構築モデル", year: "2024.1" },
                  { name: "ムル男コンテスト ファイナリスト 準グランプリ", year: "2023.8" },
                ],
              },
            ].map((category, idx) => (
              <div key={idx} className="career-category">
                <h3 className="text-xl font-bold mb-6">{category.title}</h3>
                <div className="space-y-4">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-transparent to-transparent hover:from-white/5 hover:to-transparent relative overflow-hidden group rounded"
                    >
                      <div className="shine-effect"></div>
                      <p className="font-bold">
                        {item.name} ({item.year})
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Updated with horizontal scroll */}
      <section
        className={`min-h-screen py-20 ${
          activeSection === "gallery" ? "block" : "hidden"
        }`}
      >
        <div className="max-w-full px-4 pt-20">
          <h2 className="text-3xl font-bold mb-12 slide-in-right max-w-7xl mx-auto">
            GALLERY
          </h2>

          {/* Horizontal Scrolling Container */}
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex gap-4 pb-8 px-4 min-w-max">
              {[
                {
                  url: "https://ucarecdn.com/ca439e27-f8a3-46d6-92f4-bf46895ca7cb/-/format/auto/",
                  title: "PORTRAIT 1",
                },
                {
                  url: "https://ucarecdn.com/82c75d26-3282-4f81-b7a7-aec13c15ac7d/-/format/auto/",
                  title: "PORTRAIT 2",
                },
                {
                  url: "https://ucarecdn.com/feb8de1b-6a80-414f-9043-b18e77c387d3/-/format/auto/",
                  title: "PORTRAIT 3",
                },
                {
                  url: "https://ucarecdn.com/2920970e-1644-4e78-96cb-fcb8dbda702f/-/format/auto/",
                  title: "PORTRAIT 4",
                },
                {
                  url: "https://ucarecdn.com/c66894e6-b0b7-4918-8925-2b712f1793d8/-/format/auto/",
                  title: "PORTRAIT 5",
                },
                {
                  url: "https://ucarecdn.com/dbefcaa2-afc6-4077-906a-e42ec2753906/-/format/auto/",
                  title: "PORTRAIT 6",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => {
                    setSelectedImage(item.url);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="w-[400px] max-h-[80vh] object-contain mx-auto overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className={`min-h-screen py-20 ${
          activeSection === "contact" ? "block" : "hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 pt-20 fade-in-up">
          <h2 className="text-3xl font-bold mb-12 slide-in-right">CONTACT</h2>
          <form
            onSubmit={handleContactSubmit}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Message</label>
              <textarea
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded h-32"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Send Message
            </button>
            {submitStatus === "success" && (
              <p className="text-green-500">Message sent successfully!</p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] animate-scale-in">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes shine {
          from {
            transform: translateX(-100%) rotate(45deg);
          }
          to {
            transform: translateX(200%) rotate(45deg);
          }
        }

        .slide-in-right {
          animation: slideInRight 1s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .shine-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50px;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transform: translateX(-100%) rotate(45deg);
        }

        .group:hover .shine-effect::before {
          animation: shine 1s ease-out;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, white, transparent);
          margin: 4rem 0;
        }

        /* Hide scrollbar but keep functionality */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }

        /* Import Noto Serif JP font */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300;400;500;600;700&display=swap');

        /* Update base font settings */
        body {
          font-family: 'Noto Serif JP', serif;
          font-feature-settings: "palt";
        }

        h1, h2, h3, h4, h5, h6 {
          font-feature-settings: "palt";
          letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;