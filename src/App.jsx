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

  const getIsPortrait = () => {
    return window.matchMedia("(orientation: portrait)").matches;
  };

  const updateActiveFromPosition = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const isPortrait = getIsPortrait();

    if (isPortrait) {
      const sections = Array.from(track.children);

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

    setActive(Math.round(track.scrollLeft / window.innerWidth));
  }, []);

  const scrollToSlide = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;

    const isPortrait = getIsPortrait();

    if (isPortrait) {
      const section = track.children[index];

      section?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    track.scrollTo({
      left: window.innerWidth * index,
      behavior: "smooth",
    });
  }, []);

  const handleScroll = () => {
    updateActiveFromPosition();
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "ArrowRight") {
        scrollToSlide(Math.min(active + 1, navItems.length - 1));
      }

      if (event.key === "ArrowLeft") {
        scrollToSlide(Math.max(active - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [active, scrollToSlide]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || booting) return;

    const handleWheelScroll = (event) => {
      const isPortrait = getIsPortrait();

      if (isPortrait) return;

      event.preventDefault();

      const delta =
        Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      track.scrollLeft += delta;
    };

    track.addEventListener("wheel", handleWheelScroll, {
      passive: false,
    });

    return () => {
      track.removeEventListener("wheel", handleWheelScroll);
    };
  }, [booting]);

  useEffect(() => {
    const handleWindowScroll = () => {
      const isPortrait = getIsPortrait();

      if (!isPortrait) return;

      updateActiveFromPosition();
    };

    window.addEventListener("scroll", handleWindowScroll);
    window.addEventListener("resize", updateActiveFromPosition);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", updateActiveFromPosition);
    };
  }, [updateActiveFromPosition]);

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

          <div
            className="horizontal-track"
            ref={trackRef}
            onScroll={handleScroll}
          >
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