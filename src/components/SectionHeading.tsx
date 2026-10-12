export default function SectionHeading({
  eyebrow,
  children,
  align = "center",
}: {
  eyebrow: string;
  children: React.ReactNode;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center" : "text-left"} mb-12`}>
      <div className={`flex items-center ${center ? "justify-center" : ""} gap-4 mb-4`}>
        <span className="h-px w-8 bg-primary/40" />
        <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
          {eyebrow}
        </p>
        {center && <span className="h-px w-8 bg-primary/40" />}
      </div>
      <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight">
        {children}
      </h2>
    </div>
  );
}
