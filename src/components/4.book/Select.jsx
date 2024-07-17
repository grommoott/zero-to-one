import { useAnimate } from "framer-motion"
import { useEffect, useState } from "react"
import { select } from "@data/animations"
import { motion } from "framer-motion"
import arrowUp from "/arrow-up.svg"

export default function Select({
    options = [],
    onChange = () => {},
    selectedId = -1,
    setSelectedId = () => {},
    placeholder = "Non-selected",
}) {
    const [isDeployed, setIsDeployed] = useState()
    const elementHeight = 2.75

    function toggleDeployed() {
        setIsDeployed(!isDeployed && options.length != 0)
    }

    return (
        <motion.button
            className="bg-white shadow duration-100 h-fit relative min-w-60 m-2"
            initial={"initial"}
            animate={
                isDeployed != undefined
                    ? isDeployed
                        ? "shown"
                        : "hidden"
                    : "initial"
            }
            variants={{
                shown: {
                    borderRadius: [
                        "0.25rem 0.25rem 0rem 0rem",
                        "0.25rem 0.25rem 0rem 0rem",
                        "0.25rem 0.25rem 0rem 0rem",
                    ],
                },
                hidden: {
                    borderRadius: [
                        "0.25rem 0.25rem 0rem 0rem",
                        "0.25rem 0.25rem 0rem 0rem",
                        "0.25rem 0.25rem 0.25rem 0.25rem",
                    ],
                },
                initial: {
                    borderRadius: "0.25rem 0.25rem 0.25rem 0.25rem",
                },
            }}
            transition={{
                duration: Math.max(Math.min(4, options.length) / 10 - 0.05, 0),
                ease: "easeInOut",
                times: [0, 1, 1],
            }}
            onClick={toggleDeployed}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={isDeployed ? "shown" : "hidden"}
                variants={{ shown: { opacity: 1 }, hidden: { opacity: 0 } }}
                transition={{
                    duration: Math.min(4, options.length) / 10,
                    ease: "easeInOut",
                }}
                className="w-full h-12 absolute bg-black/0 top-0 left-0 right-0 rounded pointer-events-none"
                style={{ borderBottom: `2px #d4d4d8 solid`, zIndex: 1 }}
            ></motion.div>

            <div className="flex flex-row group justify-between items-center px-1 border-b-zinc-100 m-2">
                <p className=" h-8 text-black group-hover:text-main duration-100 jetbrains-mono-bold text-lg">
                    {selectedId == -1 ? placeholder : options[selectedId]}
                </p>

                <motion.img
                    animate={isDeployed ? "shown" : "hidden"}
                    variants={{
                        shown: {
                            rotate: 0,
                        },
                        hidden: {
                            rotate: 180,
                        },
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    src={arrowUp}
                    className="h-6"
                />
            </div>

            <motion.div
                className="flex flex-col items-start bg-white overflow-y-scroll absolute w-full shadow z-10"
                style={{ borderRadius: "0 0 0.25rem 0.25rem" }}
                initial="hidden"
                animate={isDeployed ? "shown" : "hidden"}
                variants={{
                    shown: {
                        height:
                            elementHeight * Math.min(4, options.length) + "rem",
                        transition: {
                            duration: Math.min(4, options.length) / 10,
                            ease: "easeInOut",
                            staggerChildren: 0.3 / options.length,
                            delayChildren: 0.1,
                        },
                    },
                    hidden: {
                        height: "0rem",
                        transition: {
                            duration: Math.min(4, options.length) / 10,
                            ease: "easeInOut",
                            staggerChildren: 0.3 / options.length,
                            staggerDirection: -1,
                        },
                    },
                }}
            >
                {options.map((val, id) => (
                    <motion.p
                        className="text-lg text-center jetbrains-mono-bold py-2 cursor-pointer w-full"
                        onClick={() => {
                            onChange(id)
                            setSelectedId(id)
                            toggleDeployed()
                        }}
                        onKeyUp={(key) => {
                            if (key.key != "Enter") {
                                return
                            }
                            
                            onChange(id)
                            setSelectedId(id)
                            toggleDeployed()
                        }}
                        key={id}
                        whileHover={{
                            color: "#00d815",
                            transition: {
                                duration: 0.1,
                                ease: "easeInOut",
                            },
                        }}
                        whileTap={{
                            scale: 0.9,
                            transition: {
                                duration: 0.1,
                                ease: "easeInOut",
                            },
                        }}
                        whileFocus={{
                            color: "#00d815",
                            transition: {
                                duration: 0.1,
                                ease: "easeInOut",
                            },
                        }}
                        variants={select.item.variants}
                        transition={select.item.transition}
                    >
                        {val}
                    </motion.p>
                ))}
            </motion.div>
        </motion.button>
    )
}
