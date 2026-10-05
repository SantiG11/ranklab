import { Link } from "react-router";

type TemplateCardProps = {
  title: string;
  id: string;
  category: string;
};

export default function TemplateCard({ title, id, category }: TemplateCardProps) {
  return (
    <Link
      to={`/templates/${id}`}
      className="app-card app-card-hover group flex min-h-32 w-full items-center justify-between gap-4 p-5 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-app-bg"
    >
      <div className="flex min-w-0 flex-col gap-2">
        <span className="app-label text-base">{category}</span>
        <h3 className="app-title text-lg leading-snug sm:text-xl">{title}</h3>
      </div>
      <span aria-hidden="true" className="shrink-0 text-xl text-text-muted transition group-hover:translate-x-1 group-hover:text-brand-hover">
        &rarr;
      </span>
    </Link>
  );
}
