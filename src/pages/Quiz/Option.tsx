import type { JSX} from "react";

export type Choice = {
    answer: string | boolean;
    correct: boolean;
}

type Props = {
  choice: Choice;
  style: string;
} &  JSX.IntrinsicElements['div'];

const Option = ({choice, style, ...rest}: Props) => {
  return (
    <div
      {...rest}
      className={`my-2 p-3 ${style} rounded-md bg-zinc-50 cursor-pointer hover:bg-zinc-100 self-stretch flex items-center`}>
        <p className="capitalize">{String(choice.answer)}</p>      
    </div>
  )
}

export default Option;