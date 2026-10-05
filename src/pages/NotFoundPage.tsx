import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <main className="app-page flex items-center">
      <section className="app-section app-container w-full max-w-3xl p-8 text-center">
        <p className="app-label">404</p>

        <h1 className="app-title mt-3 text-3xl">
          Page not found
        </h1>

        <p className="app-subtitle mt-3">
          This page does not exist or is no longer available.
        </p>

        <Link
          to="/"
          className="app-button-primary mt-8"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
