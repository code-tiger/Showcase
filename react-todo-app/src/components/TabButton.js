export default function TabButton(props: {
  children: React.ReactNode,
  className?: string,
  active?: boolean,
  onClick?: () => void,
}) {
  const {
    children,
    className,
    active = false,
    onClick = () => undefined,
  } = props;

  return (
    <button
      className={[
        "inline-block rounded-tr-[60px] p-4",
        active ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800",
        className,
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
