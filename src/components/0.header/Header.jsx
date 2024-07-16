import { useState } from "react"
import useWindowWidth from "../../hooks/useWindowWidth"
import FullLogo from "../FullLogo"
import Logo from "../Logo"
import HeaderButtons from "./HeaderButtons"
import Menu from "./Menu"
import MenuButton from "./MenuButton"

export default function Header() {
    const width = useWindowWidth()
    const [isMenuVisible, setMenuVisible] = useState(false)

    function toggleMenuVisible() {
        setMenuVisible(!isMenuVisible)
    }

    return (
        <>
            <header className="bg-zinc-900/90 backdrop-blur-lg p-2 flex flex-row items-center justify-between fixed w-full z-10">
                {width >= 450 && width < 768 && <div className="w-16" />}
                {width >= 1024 || width < 768 ? <FullLogo /> : <Logo />}
                {width >= 768 ? (
                    <HeaderButtons />
                ) : (
                    <MenuButton toggleMenuVisible={toggleMenuVisible} />
                )}
            </header>

            {width < 768 && (
                <Menu
                    isMenuVisible={isMenuVisible}
                    toggleMenuVisible={toggleMenuVisible}
                />
            )}
        </>
    )
}
