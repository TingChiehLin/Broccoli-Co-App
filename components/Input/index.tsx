import { FC } from "react";

interface InputTypeProp {
  placeholder: string;
  type: string;
}

const Input: FC<InputTypeProp> = ({ placeholder, type }) => {
  return (
    <input
      className="w-full h-12 outline-none pl-4 border-[1px] border-solid border-[#616161]"
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
