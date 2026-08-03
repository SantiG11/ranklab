type TemplateCardProps = {
  title: string;
};

export default function TemplateCard({ title }: TemplateCardProps) {
  return (
    <div className="app-card app-card-hover flex flex-col aspect-square h-full w-full items-center justify-center overflow-hidden p-4 sm:max-w-64">
      <h3 className="app-title text-center text-xl">{title}</h3>
    </div>
  );
}
