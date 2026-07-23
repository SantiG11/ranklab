import { useParams } from "react-router";

export function TemplateRankingPage() {
  const { id } = useParams();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-sm font-medium text-violet-400">Template page</p>

        <h1 className="mt-3 text-3xl font-bold text-slate-50">
          Template: {id}
        </h1>

        <p className="mt-3 text-slate-400">
          Ranking editor placeholder. The tier list will be built here later.
        </p>
      </section>
    </main>
  );
}
