import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { projects } from "../data/portfolio";

const filters = ["All", "Embedded", "Software", "Web"];

export function ProjectsSection({ isActive }) {
  const [filter, setFilter] = useState("All");
  const [openId, setOpenId] = useState(projects[0]?.id);

  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  return (
    <div className="projects-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 24 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.4 }}
        transition={{ duration: 0.55 }}
      >
        <p className="eyebrow">project archive</p>
        <h2>Selected Projects</h2>
        <p className="section-text">
          Each project includes category, status, year, stack, summary, and detail.
          Minimal enough to scan, detailed enough to be useful. Humanity survives.
        </p>
      </motion.div>

      <motion.div
        className="filter-row"
        initial={{ opacity: 0, y: 16 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3 }}
      >
        {filters.map((item) => (
          <button
            key={item}
            className={`filter-btn ${filter === item ? "active" : ""}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </motion.div>

      <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const open = openId === project.id;

            return (
              <motion.article
                layout
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                onClick={() => setOpenId(open ? null : project.id)}
              >
                <div className="project-top">
                  <span>{project.id}</span>
                  <strong>{project.status}</strong>
                </div>

                <h3>{project.title}</h3>

                <p className="project-meta">
                  {project.category} • {project.year}
                </p>

                <p className="project-summary">{project.summary}</p>

                <div className="stack-row">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      className="project-detail"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p>{project.detail}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}