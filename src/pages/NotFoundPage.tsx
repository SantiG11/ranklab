import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center px-6">
      <section className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
        <p className="text-sm font-medium text-violet-400">404</p>

        <h1 className="mt-3 text-3xl font-bold text-slate-50">
          Page not found
        </h1>

        <p className="mt-3 text-slate-400">
          This page does not exist or is no longer available.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
