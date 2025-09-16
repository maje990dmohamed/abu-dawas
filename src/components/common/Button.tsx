import React from "react";
import clsx from "clsx";
import Loader from "./Loader";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium cursor-pointer transition-all flex border border-[var(--primary)] items-center justify-center duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90",
    secondary: "bg-transparent text-[var(--primary)] hover:bg-gray-200",
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(baseStyles, variantStyles[variant], className)}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader
            className={`${
              variant === "primary"
                ? ""
                : "!border-[var(--primary)] !border-t-transparent"
            }`}
          />
          تحميل...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
