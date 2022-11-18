"use client";

import { FC } from "react";

export interface ButtonTypeProp {
  text: string;
  onClick?: () => void;
  isDisable?: boolean;
}

const Button: FC<ButtonTypeProp> = ({ text, onClick, isDisable }) => {
  return (
    <button
      className="text-sm md:text-base font-bold px-8 py-3
                border-primaryDark border-2 broder-solid 
                transition
                ease-in 
                delay-100 hover:bg-primaryDark
                 hover:text-[#FFFFFF]
                disabled:bg-[#e5e7eb] disabled:text-[#64748b] disabled:border-[#e2e8f0] disabled:shadow-none
                cursor-pointer
                "
      onClick={onClick}
      disabled={isDisable}
    >
      {text}
    </button>
  );
};

export default Button;
