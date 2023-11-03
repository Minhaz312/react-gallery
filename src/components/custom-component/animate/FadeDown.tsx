import { motion } from "framer-motion";
import React from "react";
export default function FadeDown({
    children,
    y = -100,
    delay = 0,
    duration = 0.33,
}: {
    children: React.ReactNode;
    y?: number;
    delay?: number;
    duration?: number;
}) {
    return (
        <motion.div
            initial={{
                y: y,
            }}
            animate={{
                y: 0,
                transition: {
                    delay: delay,
                    duration: duration,
                    type: "spring",
                    stiffness: 180,
                },
            }}
        >
            {children}
        </motion.div>
    );
}
