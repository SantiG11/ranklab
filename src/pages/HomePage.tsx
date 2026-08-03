import TemplateCard from "../components/TemplateCard";

export function HomePage() {
  return (
    <main className="app-page">
      <div className="app-container flex flex-col py-8">
        <section className="app-section flex flex-col items-center p-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <h1 className="app-title max-w-3xl text-5xl">RankLab</h1>

            <p className="app-subtitle max-w-2xl text-base">
              Organize, customize, and explain your choices.
            </p>
          </div>
        </section>

        <section className="app-section mt-12 flex flex-col gap-8 p-4">
          <div>
            <h2 className="app-title text-2xl">Choose a template</h2>

            <p className="app-subtitle mt-2">
              Start from one of the available ranking templates.
            </p>
          </div>

          <div className="grid grid-cols-1 justify-items-center gap-4 rounded-3xl border border-app-border bg-app-bg-soft p-4 sm:grid-cols-3">
            <TemplateCard title="Spiderman Movies" id="spiderman-movies" />
            <TemplateCard title="Favourite Sports" id="favourite-sports" />
            <TemplateCard title="Desserts" id="desserts" />
          </div>
        </section>
      </div>
    </main>
  );
}
