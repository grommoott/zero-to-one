import { motion } from "framer-motion"

export default function Caret({
    blinkInterval = 0,
    blinkTime = 0,
    height = "1rem",
    width = "0.2rem",
    blinking = true,
}) {
    return (
        <motion.div
            animate={{ opacity: [blinking ? 0 : 1, blinking ? 0 : 1, 1, 1] }}
            transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: [blinkInterval + blinkTime],
                times: [
                    0,
                    blinkInterval / (blinkInterval + blinkTime),
                    blinkInterval / (blinkInterval + blinkTime),
                    1,
                ],
            }}
            className={`bg-white`}
            style={{ height: height, width: width }}
        />
    )
}
