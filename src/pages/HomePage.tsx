import TemplateCard from "../components/TemplateCard";
import { templates } from "../features/templates/templateData";

export function HomePage() {
  return (
    <main className="app-page">
      <div className="app-container flex flex-col py-8 sm:py-12">
        <section className="flex flex-col items-center py-6 text-center sm:py-8">
          <div className="flex flex-col items-center gap-4">
            <p className="app-label">Build your own tier list</p>
            <h1 className="app-title max-w-3xl text-4xl sm:text-5xl">RankLab</h1>

            <p className="app-subtitle max-w-xl text-base leading-7 sm:text-lg">
              Organize, customize, and explain your choices.
            </p>
          </div>
        </section>

        <section className="mt-4 flex flex-col gap-5 sm:mt-6">
          <div>
            <h2 className="app-title text-2xl sm:text-3xl">Choose a template</h2>

            <p className="app-subtitle mt-2">
              Start from one of the available ranking templates.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {templates.map((template) => {
              return (
                <TemplateCard
                  key={template.id}
                  title={template.title}
                  id={template.id}
                  category={template.category}
                />
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
