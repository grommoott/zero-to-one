import { popupWindow } from "@data/animations"
import { motion } from "framer-motion"
import CloseButton from "./CloseButton"

export default function PopupWindow({
    children,
    isVisible,
    toggleVisible,
    className = "",
}) {
    return (
        <>
            <motion.div
                variants={popupWindow.body.variants}
                transition={popupWindow.body.transition}
                initial={popupWindow.body.initial}
                animate={isVisible ? "visible" : "hidden"}
                className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 cursor-pointer z-40"
                style={{ pointerEvents: isVisible ? "auto" : "none" }}
                onClick={toggleVisible}
            ></motion.div>

            <motion.div
                variants={popupWindow.child.variants}
                transition={popupWindow.child.transition}
                initial={popupWindow.child.initial}
                animate={isVisible ? "visible" : "hidden"}
                className={`bg-zinc-900 rounded-xl w-3/4 h-fit flex flex-col justify-center items-stretch overflow-hidden shadow-xl pointer-events-auto fixed top-1/2 left-1/2 z-40 ${className}`}
                style={{
                    pointerEvents: isVisible ? "auto" : "none",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <CloseButton
                    onClick={toggleVisible}
                    className="absolute top-0 right-0"
                />
                {children}
            </motion.div>
        </>
    )
}
