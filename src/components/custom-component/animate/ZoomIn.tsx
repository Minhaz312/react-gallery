import React from "react";
import { motion } from "framer-motion";

export default function ZoomIn({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            initial={{
                scale: 0.3,
            }}
            animate={{
                scale: [0.5, 1, 1.5, 1],
                transition: {
                    delay: 0.01,
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
