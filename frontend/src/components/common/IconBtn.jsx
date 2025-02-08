export default function IconBtn({
  text,
  onclick,
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type = "button",
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center justify-center gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 transition duration-200
        ${outline ? "border border-yellow-50 bg-transparent text-yellow-50" : "bg-yellow-50"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${customClasses}`}
      type={type}
    >
      {children && <span>{children}</span>}
      <span>{text}</span>
    </button>
  );
}

