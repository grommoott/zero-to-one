import NavigationButtons from "./NavigationButtons"
import PopupWindow from "../PopupWindow"

export default function Menu({ toggleMenuVisible, isMenuVisible }) {
    return (
        <PopupWindow isVisible={isMenuVisible} toggleVisible={toggleMenuVisible} className="p-4 pt-16">
            <NavigationButtons type="menu" onClick={toggleMenuVisible} />
        </PopupWindow>
    )
}
