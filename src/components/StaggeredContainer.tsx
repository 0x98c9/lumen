
import React from "react";
import { motion } from "framer-motion";

interface StaggeredContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const StaggeredContainer = ({ children, className = "", delay = 0 }: StaggeredContainerProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };
  
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredItem = ({ children, className = "" }) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };
  
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
};

export default StaggeredContainer;
