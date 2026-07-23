export function HomePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col px-6 py-16">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <p className="mb-3 text-sm font-medium text-violet-400">RankLab MVP</p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-50">
          Build rankings that go beyond simple tiers.
        </h1>

        <p className="mt-4 max-w-2xl text-base text-slate-400">
          Organize, customize, and explain your choices.
        </p>

        <button
          type="button"
          className="mt-8 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500"
        >
          Start ranking
        </button>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-50">Choose a template</h2>
        <p className="mt-2 text-slate-400">
          Template cards will be added here.
        </p>
      </section>
    </main>
  );
}
