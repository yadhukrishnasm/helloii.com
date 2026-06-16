interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "full";
}

export function Container({
  children,
  className,
  size = "wide",
}: ContainerProps) {
  const sizeClass =
    size === "full"
      ? "max-w-none"
      : size === "wide"
        ? "max-w-[1680px]"
        : "max-w-[1400px]";

  return (
    <div
      className={`mx-auto w-full ${sizeClass} px-5 font-sans sm:px-6 lg:px-10 xl:px-14 2xl:px-16 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
