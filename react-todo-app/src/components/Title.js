export default function Title(props: {
  children: React.ReactNode,
  className?: string,
  fontSize?: number,
}) {
  const { children, className, fontSize = 33 } = props;

  return (
    <h1
      className={[
        `block max-w-full m-0 mb-[1rem] text-[${fontSize}px]`,
        className,
      ].join(" ")}
    >
      {children}
    </h1>
  );
}
