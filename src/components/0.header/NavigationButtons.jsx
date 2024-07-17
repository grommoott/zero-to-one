import PropTypes from "prop-types"
import Button from "../Button"

export default function NavigationButtons({type, onClick=() => {}}) {
    return <>
    <Button type={type} onClick={() => {
        document.querySelector(".about-yakor").scrollIntoView({behaviour: "smooth", block: "start"})
        onClick()
    }}>О школе</Button>
    <Button type={type} onClick={() => {
        document.querySelector(".courses-yakor").scrollIntoView({behaviour: "smooth", block: "start"})
        onClick()
    }}>Курсы</Button>
    <Button type={type} onClick={() => {
        document.querySelector(".book-yakor").scrollIntoView({behavior: "smooth", block: "start"})
        onClick()
    }} className={type == "header" && "w-60"}>Записаться на курс</Button>
    </>
}

NavigationButtons.propTypes = {
    type: PropTypes.oneOf(["header", "menu"]),
    onClick: PropTypes.func
}