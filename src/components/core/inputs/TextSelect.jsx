import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const inputVariants = cva(
  "px-4 py-2.5 w-full border border-slate-500 rounded-[6px] outline-none bg-inherit text-[14px] peer"
);

const SelectInput = ({
  labelClassName,
  label,
  className,
  id,
  error,
  placeholder,
  options,
  ...props
}) => {
  return (
    <div className="relative ">
      <select id={id} className={cn(inputVariants({ className }))} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute bg-white text-sm duration-300 transform   -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-4  peer-placeholder-shown:scale-100  peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${labelClassName}`}
      >
        {label}
      </label>
      <p className="text-red-400 pt-2">{error}</p>
    </div>
  );
};

export default SelectInput;
