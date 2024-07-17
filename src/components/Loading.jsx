import { motion } from "framer-motion"
import loading from "/loading.svg"

export default function Loading({ className }) {
    return (
        <motion.img
            src={loading}
            animate={{ rotate: 360 }}
            transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 1.5,
                ease: "linear",
            }}
            className={`h-16 z-10 ${className}`}
        />
    )
}
