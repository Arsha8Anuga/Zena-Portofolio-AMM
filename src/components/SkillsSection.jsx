import { motion } from "framer-motion";
import { skills } from "../data/portfolio";

export function SkillsSection({ isActive }) {
  return (
    <div className="skills-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 24 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.4 }}
        transition={{ duration: 0.55 }}
      >
        <p className="eyebrow">skills matrix</p>
        <h2>Hardware Meets Software</h2>
        <p className="section-text">
          Skills are grouped by system layer so visitors can quickly understand the technical scope.
        </p>
      </motion.div>

      <div className="skill-grid">
        {skills.map((group, index) => (
          <motion.article
            key={group.group}
            className="skill-card"
            initial={{ opacity: 0, y: 24 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.35 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            whileHover={{ y: -6, scale: 1.015 }}
          >
            <h3>{group.group}</h3>
            <div className="skill-tags">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}