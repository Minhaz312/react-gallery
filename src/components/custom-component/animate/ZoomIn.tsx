import React from "react";
import { motion } from "framer-motion";

export default function ZoomIn({
    children,
    className = "",
    delay = 0.1,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{
                scale: 0.7,
            }}
            animate={{
                scale: [0.8, 1, 1.3, 1],
                transition: {
                    delay: delay,
                    duration: 1.33,
                    type: "spring",
                    stiffness: 180,
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
