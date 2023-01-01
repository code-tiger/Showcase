export default function Button(props: {
  children: React.ReactNode,
  variant?: "primary" | "secondary",
  className?: string,
  onClick?: () => void,
}) {
  const { children, variant = "primary", className, onClick } = props;

  return (
    <button
      className={[
        "w-full py-3 px-4 rounded active:transform active:scale-95 transition duration-200 ease-in-out",
        variant === "primary"
          ? "bg-blue-500 hover:bg-blue-700 text-white font-bold"
          : "bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold",
        className,
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
