import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

const inputVariants = cva(
  "px-4 py-2.5 w-full border border-slate-500 rounded-[6px] outline-none bg-inherit text-[14px] peer"
);

const TextInput = ({
  label,
  className,
  labelClassName,
  type,
  id,
  error,
  placeholder,
  onChange,
  ...props
}) => {
  const showError = error && error.length > 0;

  return (
    <div className="relative">
      <input
        autoComplete="off"
        type={type}
        id={id}
        className={cn(inputVariants({ className }), showError && "border-red-500")}
        onChange={onChange}
        {...props}
        placeholder={placeholder || ""}
      />
      <label
        htmlFor={id}
        className={`absolute bg-white text-md duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${labelClassName}`}
        // className="absolute bg-white text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
      {showError && <p className="text-red-500 pt-2">{error}</p>}
    </div>
  );
};

export default TextInput;


{
  /* <TextInput
name="url"
id="url"
value={values.url}
onChange={handleChange}
className="w-full"
label=" Enter Your news link/url Here"
error={Boolean(errors.url) && touched.url && errors.url}
/> */
}
