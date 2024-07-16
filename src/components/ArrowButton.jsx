import PropTypes from "prop-types"
import arrowLeft from "/arrow-left.svg"
import arrowRight from "/arrow-right.svg"

export default function ArrowButton({ type = "left", onClick }) {
    return (
        <img
            src={type == "left" ? arrowLeft : arrowRight}
            className="h-8 sm:h-10 hover:scale-110 active:scale-90 duration-100 m-1 sm:m-4 cursor-pointer"
            onClick={onClick}
        />
    )
}

ArrowButton.propTypes = {
    type: PropTypes.oneOf(["left", "right"]),
}
