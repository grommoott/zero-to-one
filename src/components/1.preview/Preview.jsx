import { useEffect, useRef, useState } from "react"
import AnimatedText from "../AnimatedText"
import matrix from "/matrix-code.mp4"
import useWindowWidth from "../../hooks/useWindowWidth"
import logo from "/logo.svg"
import { motion, useInView } from "framer-motion"
import patternsLeft from "/patterns/preview-pattern-left.svg"
import patternsRight from "/patterns/preview-pattern-right.svg"

export default function Preview() {
    const [textsAnimated, setTextsAnimated] = useState(0)
    const zeroToOneText = useRef()
    const isZeroToOneTextInView = useInView(zeroToOneText, {once: true})
    const width = useWindowWidth()

    return (
        <div
            className="pt-20 preview-bg bg-zinc-800 relative -z-20"
            style={{ height: "40rem" }}
        >
            <img src={patternsLeft} className="-z-10 absolute left-0 -bottom-8 md:bottom-0 h-full"/>
            <img src={patternsRight} className="-z-10 absolute right-0 -top-6 md:top-0 h-full"/>

            {/* <video
                src={matrix}
                className="blur -top-4 w-full h-full object-cover absolute bg-video -z-10"
                autoPlay
                loop
                muted
            /> */}
            <div className="flex flex-col w-full h-full z-0 justify-center items-center">
                <AnimatedText
                    delay={150}
                    randomness={100}
                    startDelay={1000}
                    nextWordDelay={50}
                    endDelay={1000}
                    ref={zeroToOneText}
                    animate={isZeroToOneTextInView}
                    caret={textsAnimated == 0}
                    onAnimationEnded={() => setTextsAnimated(1)}
                    fontSize={width >= 768 ? "5rem" : "3rem"}
                    style={{ textShadow: "0 2px 8px #000000" }}
                >
                    Zero To One
                </AnimatedText>

                <AnimatedText
                    delay={100}
                    randomness={50}
                    startDelay={0}
                    nextWordDelay={150}
                    animate={textsAnimated == 1}
                    caret={textsAnimated == 1}
                    onAnimationEnded={() => setTextsAnimated(1)}
                    fontSize={
                        width >= 768 ? "3rem" : width >= 500 ? "2rem" : "1.5rem"
                    }
                    specialDelays={[
                        { letter: "!", delay: 300 },
                        { letter: ",", delay: 150 },
                    ]}
                    style={{ textShadow: "0 2px 8px #000000" }}
                >
                    Школа, в которой учат!
                </AnimatedText>
            </div>
        </div>
    )
}
