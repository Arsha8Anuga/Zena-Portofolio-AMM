export function SlideDots({ navItems, active, onNavigate }) {
  return (
    <div className="slide-dots">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`slide-dot ${active === item.target ? "active" : ""}`}
          onClick={() => onNavigate(item.target)}
          aria-label={`Go to ${item.label}`}
        />
      ))}
    </div>
  );
}