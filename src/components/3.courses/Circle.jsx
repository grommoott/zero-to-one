import { motion } from "framer-motion"
import { circle } from "@data/animations"

export default function Circle({ isActive }) {
    return (
        <motion.div
            variants={circle.variants}
            animate={isActive ? "active" : "common"}
            transition={circle.transition}
            className="h-4 w-4 m-2 bg-black shadow"
        ></motion.div>
    )
}
