import { FC, ChangeEvent, FocusEvent } from "react";

interface InputTypeProp {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  isInValid: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

const Input: FC<InputTypeProp> = ({ isInValid, ...inputProps }) => {
  return (
    <input
      className={`w-full h-12 outline-none pl-4 border-[2px] border-solid ${
        isInValid ? "border-error" : "border-[#616161]"
      }`}
      {...inputProps}
    />
  );
};

export default Input;
