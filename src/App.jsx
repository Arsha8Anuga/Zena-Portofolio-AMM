import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { BootScreen } from "./components/BootScreen";
import { ContactSection } from "./components/ContactSection";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { ProfileSection } from "./components/ProfileSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { Section } from "./components/Section";
import { SkillsSection } from "./components/SkillsSection";
import { SlideDots } from "./components/SlideDots";
import { StarField } from "./components/StarField";

import { navItems } from "./data/portfolio";

export default function App() {
  const trackRef = useRef(null);

  const [booting, setBooting] = useState(true);
  const [active, setActive] = useState(0);
  const [visitorMode, setVisitorMode] = useState("recruiter");

  const isPortrait = () => {
    return window.matchMedia("(orientation: portrait)").matches;
  };

  const clampIndex = useCallback((index) => {
    return Math.max(0, Math.min(index, navItems.length - 1));
  }, []);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    if (isPortrait()) {
      const sections = Array.from(track.children);
      if (!sections.length) return;

      const currentIndex = sections.reduce((closestIndex, section, index) => {
        const rect = section.getBoundingClientRect();
        const closestRect = sections[closestIndex].getBoundingClientRect();

        return Math.abs(rect.top) < Math.abs(closestRect.top)
          ? index
          : closestIndex;
      }, 0);

      setActive(currentIndex);
      return;
    }

    const currentIndex = Math.round(track.scrollLeft / window.innerWidth);
    setActive(clampIndex(currentIndex));
  }, [clampIndex]);

  const scrollToSlide = useCallback(
    (index) => {
      const track = trackRef.current;
      if (!track) return;

      const safeIndex = clampIndex(index);

      if (isPortrait()) {
        const section = track.children[safeIndex];

        section?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setActive(safeIndex);
        return;
      }

      track.scrollTo({
        left: window.innerWidth * safeIndex,
        behavior: "smooth",
      });

      setActive(safeIndex);
    },
    [clampIndex],
  );

  useEffect(() => {
    if (booting) return;

    const handleWheel = (event) => {
      if (isPortrait()) return;

      const track = trackRef.current;
      if (!track) return;

      event.preventDefault();

      const delta =
        Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      track.scrollBy({
        left: delta,
        behavior: "auto",
      });
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [booting]);

  useEffect(() => {
    if (booting) return;

    const handleScroll = () => {
      updateActive();
    };

    const handleResize = () => {
      const track = trackRef.current;
      if (!track) return;

      if (!isPortrait()) {
        track.scrollTo({
          left: window.innerWidth * active,
          behavior: "auto",
        });
      }

      updateActive();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    const track = trackRef.current;
    track?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      track?.removeEventListener("scroll", handleScroll);
    };
  }, [active, booting, updateActive]);

  useEffect(() => {
    if (booting) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        scrollToSlide(active + 1);
      }

      if (event.key === "ArrowLeft") {
        scrollToSlide(active - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, booting, scrollToSlide]);

  return (
    <main className="app-shell">
      <AnimatePresence>
        {booting && <BootScreen onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      {!booting && (
        <>
          <StarField />

          <Navbar
            navItems={navItems}
            active={active}
            onNavigate={scrollToSlide}
            visitorMode={visitorMode}
            setVisitorMode={setVisitorMode}
          />

          <div className="horizontal-track" ref={trackRef}>
            <Section>
              <HeroSection
                isActive={active === 0}
                onNavigate={scrollToSlide}
                visitorMode={visitorMode}
              />
            </Section>

            <Section>
              <ProfileSection isActive={active === 1} />
            </Section>

            <Section>
              <SkillsSection isActive={active === 2} />
            </Section>

            <Section>
              <ProjectsSection isActive={active === 3} />
            </Section>

            <Section>
              <ContactSection isActive={active === 4} />
            </Section>
          </div>

          <SlideDots
            navItems={navItems}
            active={active}
            onNavigate={scrollToSlide}
          />
        </>
      )}
    </main>
  );
}