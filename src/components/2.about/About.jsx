import aboutFacts from "../../data/aboutFacts"
import useWindowWidth from "../../hooks/useWindowWidth"
import { motion, useInView } from "framer-motion"
import AboutItem from "./AboutItem"
import Star from "./Star"
import pattern from "/patterns/about-pattern.svg"
import { aboutItem, about } from "../../data/animations"
import { useRef } from "react"

export default function About() {
    const stars = useRef()
    const isStarsInView = useInView(stars, {once: true, margin: "0% 0% -50% 0%"})

    return (
        <div className="flex flex-col items-stretch bg-zinc-950 text-white py-10 pb-20 relative">
            <div id="about-yakor" className="absolute -top-16"></div>
            <motion.h1
                initial="hidden"
                animate={isStarsInView ? "shown" : "hidden"}
                variants={about.parent.variants}
                transition={about.parent.transition}
                className="uppercase text-7xl jetbrains-mono-bold mx-auto py-10 relative"
                style={{zIndex: 1}}
            >
                О ШКОЛЕ
            </motion.h1>

            <div
                ref={stars}
                className="absolute my-6 py-10 w-80 left-1/2 right-1/2 -translate-x-1/2"
            >
                <Star
                    height="3rem"
                    top="1rem"
                    right="-3.5rem"
                    amplitude="0rem"
                    duration="4"
                    isVisible={isStarsInView}
                    delay={0.4}
                />
                <Star
                    height="2.5rem"
                    top="-1rem"
                    left="-1rem"
                    amplitude="0rem"
                    duration="3.5"
                    isVisible={isStarsInView}
                    delay={0.6}
                />
                <Star
                    height="2rem"
                    bottom="-2rem"
                    left="3rem"
                    amplitude="0rem"
                    duration="3"
                    isVisible={isStarsInView}
                    delay={1}
                />
            </div>

            <motion.div
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, margin: "0% 0% -50% 0%" }}
                transition={aboutItem.parent.transition}
                className="flex flex-col lg:flex-row items-center lg:items-start justify-start lg:justify-around"
            >
                {aboutFacts.map((val) => (
                    <AboutItem item={val} key={val.id} />
                ))}
            </motion.div>

            <div
                className="absolute bottom-1 h-32 w-full translate-y-full"
                style={{ background: `repeat-x url(${pattern})`, backgroundSize: "30rem" }}
            ></div>
        </div>
    )
}
