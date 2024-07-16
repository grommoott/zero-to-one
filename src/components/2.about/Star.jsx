import { motion, useAnimate, useAnimationControls } from "framer-motion"
import star from "/star.svg"
import { useEffect } from "react"

export default function Star({
    top,
    bottom,
    right,
    left,
    duration,
    height,
    rotate,
    isVisible,
    delay
}) {
    const starControls = useAnimationControls()
    const bloomControls = useAnimationControls()

    useEffect(() => {
        if (isVisible) {
            starControls.start({
                y: 0,
                scale: 0.9,
                opacity: 1,
                transition: {
                    delay: delay,
                    duration: 1,
                    ease: "easeInOut"
                },
            }).then(() => {
                starControls.start({
                    scale: [0.9, 1, 0.9],
                    transition: {
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        duration: duration,
                    },
                })
            })

            bloomControls.start({
                y: 0,
                scale: 0.9,
                opacity: 0.5,
                transition: {
                    delay: delay,
                    duration: 1,
                    ease: "easeInOut"
                },
            }).then(() => {
                bloomControls.start({
                    scale: [0.9, 1, 0.9],
                    opacity: [0.5, 1, 0.5],
                    transition: {
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        duration: duration,
                    },
                })
            })
        }
    }, [isVisible])

    return (
        <>
            <motion.img
                src={star}
                animate={starControls}
                initial={{
                    y: height,
                    rotate: rotate,
                    top: top,
                    bottom: bottom,
                    right: right,
                    left: left,
                    opacity: 0,

                }}
                className="absolute select-none bg-zinc-950 -z-20"
                draggable="false"
                style={{ height: height }}
            />
            <motion.img
                src={star}
                className="absolute select-none -z-20"
                animate={bloomControls}
                initial={{
                    y: height,
                    rotate: rotate,
                    top: top,
                    bottom: bottom,
                    right: right,
                    left: left,
                    opacity: 0
                }}
                draggable="false"
                style={{ height: height, filter: "blur(12px)" }}
            />
        </>
    )
}
