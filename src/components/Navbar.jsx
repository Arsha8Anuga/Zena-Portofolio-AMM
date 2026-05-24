import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function Navbar({
  navItems,
  active,
  onNavigate,
  visitorMode,
  setVisitorMode,
}) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (target) => {
    onNavigate(target);
    setOpen(false);
  };

  const toggleVisitorMode = () => {
    setVisitorMode((current) =>
      current === "recruiter" ? "explorer" : "recruiter",
    );
  };

  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <nav className="nav-shell">
        <button className="brand" onClick={() => handleNavigate(0)}>
          ZENA
        </button>

        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-link ${active === item.target ? "active" : ""}`}
              onClick={() => handleNavigate(item.target)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button className="mode-toggle" onClick={toggleVisitorMode}>
            {visitorMode === "recruiter" ? "RECRUITER" : "EXPLORER"}
          </button>

          <button
            className={`menu-toggle ${open ? "open" : ""}`}
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`mobile-nav-link ${
                  active === item.target ? "active" : ""
                }`}
                onClick={() => handleNavigate(item.target)}
              >
                <span>{item.label}</span>
                <small>0{item.target + 1}</small>
              </button>
            ))}

            <button className="mobile-mode-toggle" onClick={toggleVisitorMode}>
              Visitor Mode:{" "}
              <strong>
                {visitorMode === "recruiter" ? "RECRUITER" : "EXPLORER"}
              </strong>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}