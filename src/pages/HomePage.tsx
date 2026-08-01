export function HomePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col px-6 py-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 flex flex-col items-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-50">
            RankLab
          </h1>
          <p className="max-w-2xl text-base text-slate-400 text-center">
            Organize, customize, and explain your choices.
          </p>
        </div>
      </section>

      <section className="mt-12 border border-slate-800 bg-slate-900 rounded-3xl p-4 flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-50">
            Choose a template
          </h2>
          <p>Start from one of the available ranking templates</p>
        </div>

        <div className="border-8 border-slate-800 bg-slate-900 rounded-3xl p-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3 justify-items-center">
          <div className="h-full w-full lg:max-w-64 aspect-square overflow-hidden border-8 border-black bg-slate-900 rounded-3xl p-2  flex items-center justify-center">
            Template
          </div>
          <div className="h-full w-full lg:max-w-64 aspect-square overflow-hidden border-8 border-black bg-slate-900 rounded-3xl p-2 flex items-center justify-center ">
            Template
          </div>
          <div className="h-full w-full lg:max-w-64 aspect-square overflow-hidden border-8 border-black bg-slate-900 rounded-3xl p-2 flex items-center justify-center ">
            Template
          </div>
        </div>
      </section>
    </main>
  );
}
