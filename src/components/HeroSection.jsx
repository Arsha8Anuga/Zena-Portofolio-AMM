import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import { TypewriterText } from "./TypewriterText";

export function HeroSection({ isActive, onNavigate, visitorMode }) {
  const desc =
    visitorMode === "recruiter"
      ? "A concise technical portfolio presenting embedded systems, software development, project status, skills, and contact information in a clear structure."
      : "A retro-space technical archive for embedded experiments, coding projects, simulations, and interface exploration.";

  return (
    <div className="hero-layout">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 28 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 28 }}
        transition={{ duration: 0.65 }}
      >
        <p className="eyebrow">system initialized</p>

        <h1>
          Zena
          <span>Rossane</span>
        </h1>

        <p className="hero-role">{profile.role}</p>

        <p className="hero-description">
          <TypewriterText text={desc} start={isActive} />
        </p>

        <div className="hero-actions">
          <button className="primary-btn" onClick={() => onNavigate(3)}>
            View Projects
          </button>
          <button className="secondary-btn" onClick={() => onNavigate(1)}>
            View Profile
          </button>
        </div>
      </motion.div>

      <motion.div
        className="hero-profile-card"
        initial={{ opacity: 0, scale: 0.94, x: 30 }}
        animate={isActive ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0.45 }}
        transition={{ duration: 0.7 }}
        whileHover={{ y: -6, rotate: 0.4 }}
      >
        <div className="profile-orbit">
          <div className="profile-avatar">
            <img src="/profile.png" alt="Profile of Zena Aiken" />
          </div>
        </div>

        <div className="profile-mini-info">
          <p className="profile-name">{profile.name}</p>
          <p className="profile-location">{profile.location}</p>
        </div>

        <div className="profile-status">
          <span />
          Available for projects
        </div>

        <div className="profile-tags">
          <span>Embedded</span>
          <span>Code</span>
          <span>Simulation</span>
        </div>
      </motion.div>
    </div>
  );
}
