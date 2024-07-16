import PropTypes from "prop-types"
import {motion} from "framer-motion"

export default function Button({ type, children, onClick, className }) {
    let classNameDifference

    switch (type) {
        case "header":
            classNameDifference = "w-40 text-main hover:text-white active:scale-90 bg-white/0"
            break

        case "menu":
            classNameDifference = "menu-button active:scale-90"
            break

        case "dark":
            classNameDifference = "px-4 dark-button active:scale-90"
            break

        case "light":
            classNameDifference = "px-4 light-button active:scale-90 shadow hover:shadow-md active:shadow-sm"
            break
    }

    return (
        <button
            className={
                `z-0 h-12 jetbrains-mono-bold text-lg uppercase m-2 duration-100 rounded ${classNameDifference} ${className}`
            }
            onClick={onClick}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    theme: PropTypes.oneOf(["header", "menu", "light", "dark"]),
}
