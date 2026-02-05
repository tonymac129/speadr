import { motion } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  onclick: () => void;
};

function Button({ children, onclick }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.07, y: -1 }}
      whileTap={{ scale: 1.02 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="bg-zinc-300 text-zinc-950 rounded-lg text-lg font-bold px-8 py-3 cursor-pointer flex items-center gap-x-3"
      onClick={onclick}
    >
      {children}
    </motion.button>
  );
}

export default Button;
