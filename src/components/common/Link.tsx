import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import Loader from "./Loader";

type LinkProps = {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const Link: React.FC<LinkProps> = ({
  to,
  children,
  variant = "primary",
  className,
  onClick,
  disabled = false,
  loading = false,
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all flex border border-[var(--primary)] items-center justify-center duration-200";

  const variantStyles = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90",
    secondary: "bg-transparent text-[var(--primary)] hover:bg-gray-100",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  if (disabled || loading) {
    return (
      <span
        className={clsx(
          baseStyles,
          variantStyles[variant],
          disabledStyles,
          className
        )}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader className={` ${ variant == "primary" ? "" : " !border-[var(--primary)] !border-t-transparent"}`} />
            تحميل...
          </span>
        ) : (
          children
        )}
      </span>
    );
  }

  return (
    <RouterLink
      to={to}
      onClick={onClick}
      className={clsx(baseStyles, variantStyles[variant], className)}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </RouterLink>
  );
};

export default Link;