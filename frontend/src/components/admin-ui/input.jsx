import { useSelector } from "react-redux";

const Input = ({ title, type = "text", name, state, setState }) => {
  const { mode } = useSelector((state) => state.mode);
  const changeHandler = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setState((prev) => ({ ...prev, [prop]: value }));
  };
  return (
    <div className="flex flex-col justify-center items-stretch mt-3">
      <label htmlFor={title}>{title}</label>
      <input
        type={type}
        placeholder={title}
        name={name}
        className={`w-full h-[35px] p-2 focus:outline-none focus:shadow-[inset_0_0_2px_2px] focus:shadow-blue-500 rounded-sm mt-1 ${
          mode ? "bg-white" : "bg-zinc-700"
        }`}
        value={state}
        onChange={(e) => changeHandler(e)}
      />
    </div>
  );
};

export default Input;
