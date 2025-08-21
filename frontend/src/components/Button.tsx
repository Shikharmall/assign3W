import React from "react";
import "../assets/Button.css";

type ButtonProps = {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`btn base ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };




// import React from "react";

// type ButtonProps = {
//   variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
//   size?: "default" | "sm" | "lg" | "icon";
//   className?: string;
//   children: React.ReactNode;
// } & React.ButtonHTMLAttributes<HTMLButtonElement>;

// const Button: React.FC<ButtonProps> = ({
//   variant = "default",
//   size = "default",
//   className = "",
//   children,
//   ...props
// }) => {
//   const baseClasses =
//     "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer";

//   const variantClasses: Record<typeof variant, string> = {
//     default: "bg-[#0ab7f3] text-xs text-white shadow-xs hover:bg-primary/90",
//     destructive:
//       "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
//     outline:
//       "border-1 text-xs border-gray-300 bg-white shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
//     secondary:
//       "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
//     ghost: "text-[#0ab7f3] hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
//     link: "text-primary underline-offset-4 hover:underline",
//   };

//   const sizeClasses: Record<typeof size, string> = {
//     default: "h-9 px-4 py-2",
//     sm: "h-8 rounded-md gap-1.5 px-3",
//     lg: "h-10 rounded-md px-6",
//     icon: "size-9",
//   };

//   return (
//     <button
//       className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} `}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// export { Button };
