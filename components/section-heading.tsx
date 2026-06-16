import { Reveal } from "./ui/reveal";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mx-auto max-w-4xl text-center">
        {badge && (
          <span
            className="
              mb-6
              inline-flex
              rounded-full
              border
              border-neutral-200
              bg-white
              px-4
              py-2
              text-sm
              font-medium
            "
          >
            {badge}
          </span>
        )}

        <h2
          className="
            text-4xl
            font-bold
            tracking-tight
            text-neutral-950
            md:text-6xl
          "
        >
          {title}
        </h2>

        {description && (
          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed
              text-neutral-600
            "
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
