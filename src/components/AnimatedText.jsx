import { motion } from "framer-motion"
import PropTypes from "prop-types"
import { forwardRef, useEffect, useState } from "react"
import Caret from "./Caret"

export default forwardRef(function AnimatedText({
    delay = 0,
    randomness = 0,
    startDelay = 0,
    animate,
    fontSize,
    caretBlinkTime = 500,
    children,
    caret = true,
    endDelay = 0,
    nextWordDelay = 0,
    onAnimationEnded,
    specialDelays = new Array(),
    style
}, ref) {
    const [displayedText, setDisplayedText] = useState("")
    const [caretBlinking, setCaretBlinking] = useState(true)
    const timeouts = new Array()

    useEffect(() => {
        if (animate && displayedText == "") {
            let acum = startDelay

            for (let letter of children) {
                acum += delay + randomness * Math.random()

                specialDelays.forEach((el) => {
                    if (letter == el.letter) {
                        acum += el.delay
                    }
                })

                timeouts.push(
                    setTimeout(() => {
                        setDisplayedText((prev) => prev + letter)
                        setCaretBlinking(false)
                    }, acum)
                )

                if (letter === " ") {
                    acum += nextWordDelay
                }
            }

            timeouts.push(
                setTimeout(() => {
                    setCaretBlinking(true)
                    onAnimationEnded()
                }, acum + caretBlinkTime)
            )

            timeouts.push(
                setTimeout(() => {
                    onAnimationEnded()
                }, acum + endDelay)
            )

            return () => {
                for (let timeout of timeouts) {
                    clearTimeout(timeout)
                }
            }
        }
    }, [animate])

    return (
        <div ref={ref} className={`flex flex-row flex-wrap items-center `}>
            {displayedText.split("").map((val, id) => (
                <p
                    key={id}
                    className="text-white jetbrains-mono-bold"
                    style={{
                        ...style,
                        fontSize: fontSize,
                        width: val === " " ? `calc(${fontSize} * 0.4)` : "auto",
                    }}
                >
                    {val}
                </p>
            ))}

            {caret && (
                <Caret
                    blinkInterval={0.5}
                    blinkTime={0.5}
                    blinking={caretBlinking}
                    height={fontSize}
                    width={`calc(${fontSize} * 0.2)`}
                />
            )}
        </div>
    )
})