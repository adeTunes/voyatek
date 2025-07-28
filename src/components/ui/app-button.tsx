import React, { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant: "primary" | "primary-light" | "secondary" | "secondary-black";
  px?: number;
  py?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const variantStyles: Record<ButtonProps["variant"], string> = {
  primary: "bg-primary-600 hover:bg-primary-600/70 duration-200 text-white",
  "primary-light":
    "bg-primary-100 hover:bg-primary-100/80 duration-200 text-primary-600",
  secondary: "bg-white text-primary-600",
  "secondary-black": "bg-white text-black-primary",
};

export function Button({ children, variant, px = 16, py = 12, onClick }: ButtonProps) {
  return (
    <button
      style={{ paddingInline: px, paddingBlock: py }}
      className={`${variantStyles[variant]} rounded cursor-pointer text-sm font-medium`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
