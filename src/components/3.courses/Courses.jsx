import CoursesList from "./CoursesList"
import { motion } from "framer-motion"

export default function Courses() {
    return (
        <div className="flex flex-col items-center pt-32 pb-16 relative">
            <div id="courses-yakor" className="top-0 absolute"></div>

            <motion.h1
                initial="hidden"
                whileInView="shown"
                variants={{
                    shown: { y: "0rem", opacity: 1 },
                    hidden: { y: "-3rem", opacity: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                viewport={{ once: true, margin: "0% 0% -50% 0%" }}
                className="text-7xl jetbrains-mono-bold uppercase"
            >
                Курсы
            </motion.h1>
            <CoursesList />

            <div
                className="absolute w-full bottom-4 translate-y-full h-60"
                style={{
                    background: "url(/patterns/courses-pattern.svg) repeat",
                    filter: "drop-shadow(0 3px 5px #00000044)",
                    backgroundSize: "100rem",
                }}
            ></div>

            <div
                className="w-full h-12 bottom-0 absolute"
                style={{ backgroundColor: "#ffffff" }}
            ></div>
        </div>
    )
}
