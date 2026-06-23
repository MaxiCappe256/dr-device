export default function Button({
  variant,
  iconLeft,
  iconRight,
  children,
  className,
  loading,
  ...props
}) {
  let customClassName = '';

  switch (variant) {
    case 'primary':
      customClassName =
        'text-on-primary bg-primary-container hover:bg-primary-hover transition-all';
      break;

    case 'secondary':
      customClassName = 'text-secondary bg-secondary-container';
      break;

    case 'inverted':
      customClassName = 'text-on-primary bg-on-background';
      break;

    case 'outline':
      customClassName =
        'text-on-background bg-on-primary-container border border-on-background';
      break;

    case 'danger':
      customClassName = 'text-error transition-colors bg-error-container hover:bg-on-error-container hover:text-white';
      break;

    default:
      break;
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 w-full p-3 rounded-md cursor-pointer ${customClassName} ${className} disabled:opacity-80 disabled:cursor-not-allowed`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {iconLeft}
          {children}
          {iconRight}
        </>
      )}
    </button>
  );
}
