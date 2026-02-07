import { motion } from "framer-motion";

type BtnProps = {
  children: React.ReactNode;
  onclick: () => void;
  title?: string;
};

function Btn({ children, onclick, title }: BtnProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.07, y: -1 }}
      whileTap={{ scale: 1.02 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="bg-zinc-900 text-zinc-200 rounded-lg font-bold px-3 py-2 cursor-pointer flex items-center gap-x-3"
      onClick={onclick}
      title={title || ""}
    >
      {children}
    </motion.button>
  );
}

export default Btn;
