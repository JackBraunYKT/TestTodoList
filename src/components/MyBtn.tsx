import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const MyBtn: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="flex-none flex items-center justify-center size-6 rounded-sm hover:bg-gray-200"
    >
      {children}
    </button>
  );
};

export default MyBtn;
