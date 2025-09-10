import type { JSX} from "react";

type Props = {
    label: string;
} & JSX.IntrinsicElements['input'];

const Input = ({label, ...rest}: Props) => {
  return (
    <div className="max-sm:w-65 w-80 m-2 flex flex-col gap-1">
    <label className="text-sm text-zinc-600 font-semibold">{label}</label>
        <input 
            className="border border-gray-300 px-4 py-2 rounded-xl outline-none"
            {...rest}
        />
    </div>
  )
}

export default Input