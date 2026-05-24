import { motion } from "framer-motion";
import { profile } from "../data/portfolio";

export function ProfileSection({ isActive }) {
  return (
    <div className="section-grid">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.4 }}
        transition={{ duration: 0.55 }}
      >
        <p className="eyebrow">profile</p>
        <h2>Clear Identity, Clear Direction</h2>
        <p className="section-text">{profile.description}</p>
      </motion.div>

      <motion.div
        className="info-card"
        initial={{ opacity: 0, x: 28 }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.45 }}
        transition={{ duration: 0.6 }}
      >
        <h3>Portfolio Quality Notes</h3>

        <div className="quality-list">
          <div>
            <strong>Accurate</strong>
            <span>
              Project information is written directly and avoids exaggerated
              claims.
            </span>
          </div>
          <div>
            <strong>Relevant</strong>
            <span>
              Sections focus on embedded systems, software, and contact access.
            </span>
          </div>
          <div>
            <strong>Readable</strong>
            <span>
              Content is grouped by purpose so visitors do not need to decode
              chaos.
            </span>
          </div>
          <div>
            <strong>Safe</strong>
            <span>
              No personal data is collected by this static portfolio page.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
