import { Link } from "react-router";

export function Header() {
  return (
    <header className="border-b border-app-border bg-app-bg">
      <div className="app-container flex h-16 items-center">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-text-main transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:opacity-80"
        >
          Rank<span className="text-brand-hover">Lab</span>
        </Link>
      </div>
    </header>
  );
}
