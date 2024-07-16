import PropTypes from "prop-types"
import menu from "/menu.svg"
import { motion } from "framer-motion"

export default function MenuButton({ toggleMenuVisible }) {
    return (
        <motion.img
            src={menu}
            className="h-16 cursor-pointer"
            onClick={toggleMenuVisible}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{duration: 0.1}}
        />
    )
}

MenuButton.propTypes = {
    toggleMenuVisible: PropTypes.func,
}
