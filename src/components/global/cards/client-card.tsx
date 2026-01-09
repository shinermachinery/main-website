import { MapPin, Star } from "lucide-react";

interface ClientCardProps {
  companyName: string;
  projects: string[];
  isHighlight?: boolean;
}

export function ClientCard({
  companyName,
  projects,
  isHighlight = false,
}: ClientCardProps) {
  if (isHighlight) {
    return (
      <div
        className="flex flex-col items-start justify-center p-5 rounded-2xl"
        style={{
          backgroundImage:
            "linear-gradient(90.66deg, rgba(42, 94, 152, 0.1) 15.881%, rgba(24, 183, 90, 0.1) 115.02%)",
        }}
      >
        <p
          className="text-xl font-medium leading-7 tracking-[-0.0313rem] bg-clip-text"
          style={{
            WebkitTextFillColor: "transparent",
            backgroundImage:
              "linear-gradient(93.30deg, rgb(42, 94, 152) 15.881%, rgb(24, 183, 90) 115.02%)",
          }}
        >
          {companyName}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-5 rounded-2xl bg-background">
      {/* Company Name */}
      <p className="text-xl font-medium text-foreground">{companyName}</p>

      {/* Projects List */}
      <div className="flex flex-col gap-3">
        {projects.map((project, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Star className="size- shrink-0 fill-brand-green text-brand-green" />
            <p className="text-sm font-normal text-muted-foreground line-clamp-2 flex-1">
              {project}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
