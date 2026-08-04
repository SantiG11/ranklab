import { useParams } from "react-router";
import { templates } from "../features/templates/templateData";
import { NotFoundPage } from "./NotFoundPage";
import RankingItemCard from "../components/RankingItemCard";

export function TemplateRankingPage() {
  const { id } = useParams();
  const template = templates.find((template) => template.id === id);

  if (!template) return <NotFoundPage />;

  return (
    <main className="app-page">
      <div className="app-container flex flex-col gap-5 py-10">
        <section className="app-section flex flex-col gap-2 p-4">
          <h1 className="app-title mt-3 text-center text-5xl">
            {template.title}
          </h1>

          <p className="app-subtitle text-center mt-3">
            {template.description}
          </p>

          <p className=" text-text-soft text-right">
            Category: <span className="font-bold">{template.category}</span>
          </p>
        </section>

        <section className="app-section flex w-full flex-col items-center gap-5 p-5">
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-app-border">
            {template.tiers.map((tier) => (
              <div
                key={tier.id}
                className="grid grid-cols-[7rem_minmax(0,1fr)] border-b border-app-border last:border-b-0"
              >
                <div className="flex min-h-20 items-center justify-center border-r-2 border-app-border p-2">
                  <span className="app-title text-2xl">{tier.name}</span>
                </div>

                <div className="grid min-w-0 grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-0 bg-app-bg-soft">
                  {tier.items.map((item: { id: string; title: string }) => (
                    <RankingItemCard
                      key={`${tier.id}-${item.id}`}
                      title={item.title}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid min-h-[7rem] w-full max-w-5xl grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-0 overflow-hidden rounded-2xl border border-app-border bg-app-bg-soft">
            {template.unrankedItems.map((item) => (
              <RankingItemCard key={`unranked-${item.id}`} title={item.title} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
