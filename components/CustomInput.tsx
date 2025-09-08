import { ChangeEvent, InputHTMLAttributes } from "react";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
}

export default function CustomInput({
  value,
  onChange,
  className = "",
  placeholder = "",
  ...rest
}: Props) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    onChange(nextValue);
  };

  return (
    <input
      value={value}
      onChange={handleInputChange}
      className={className}
      placeholder={placeholder}
      {...rest}
    />
  );
}
