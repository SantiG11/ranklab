import { Link } from "react-router";

type TemplateCardProps = {
  title: string;
  id: string;
};

export default function TemplateCard({ title, id }: TemplateCardProps) {
  return (
    <Link
      to={`/templates/${id}`}
      className="app-card app-card-hover flex aspect-square h-full w-full flex-col items-center justify-center overflow-hidden p-4 sm:max-w-64"
    >
      <h3 className="app-title text-center text-xl">{title}</h3>
    </Link>
  );
}
