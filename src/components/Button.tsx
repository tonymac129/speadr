import { motion } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  onclick: () => void;
  primary?: boolean;
  title?: string;
};

function Button({ children, onclick, primary, title }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.07, y: -1 }}
      whileTap={{ scale: 1.02 }}
      transition={{ duration: 0.4, type: "spring" }}
      className={`${primary ? "bg-zinc-300 text-zinc-950 w-full" : "bg-zinc-900 text-zinc-200 w-fit px-5"} rounded-lg text-lg font-bold py-3 cursor-pointer flex justify-center items-center gap-x-3`}
      onClick={onclick}
      title={title}
    >
      {children}
    </motion.button>
  );
}

export default Button;
