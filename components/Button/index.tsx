"use client";

import { FC } from "react";

export interface ButtonTypeProp {
  text: string;
  onClick?: () => void;
}

const Button: FC<ButtonTypeProp> = ({ text, onClick }) => {
  return (
    <button
      className="text-sm md:text-base font-bold px-8 py-3
                border-primaryDark border-2 broder-solid transition ease-in delay-100 hover:bg-primaryDark hover:text-[#FFFFFF]"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
