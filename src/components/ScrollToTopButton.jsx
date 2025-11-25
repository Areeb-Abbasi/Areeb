import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import "../styles/scrolltotop.css";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button 
      className={`scroll-to-top ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <ArrowUp size={20} />
    </button>
  );
}
