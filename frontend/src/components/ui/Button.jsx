export default function Button({ variant, iconLeft, iconRight, children, ...props }) {
  let className = "";

  switch (variant) {
    case "primary":
      className =
        "text-on-primary bg-primary-container hover:bg-primary-hover transition-all";
      break;

    case "secondary":
      className = "text-secondary bg-secondary-container";
      break;

    case "inverted":
      className = "text-on-primary bg-on-background";
      break;

    case "outline":
      className =
        "text-on-background bg-on-primary-container outline outline-on-background";
      break;

    default:
      break;
  }

  return (
    <button
      className={`${className} flex items-center justify-center gap-2 w-full lg:w-auto p-3 rounded-md cursor-pointer`}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
