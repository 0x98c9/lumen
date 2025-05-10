
import React from "react";
import { motion } from "framer-motion";

interface MotionSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const MotionSection = ({ children, delay = 0, className = "" }: MotionSectionProps) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 20,
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionSection;
