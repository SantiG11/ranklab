import { Link } from "react-router";

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-xl font-bold text-slate-50">
          RankLab
        </Link>
      </div>
    </header>
  );
}
