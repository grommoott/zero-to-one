import { useState } from "react"
import useWindowWidth from "../../hooks/useWindowWidth"
import HeaderButtons from "./HeaderButtons"
import Menu from "./Menu"
import MenuButton from "./MenuButton"
import FullLogoButton from "../FullLogoButton"
import LogoButton from "../LogoButton"

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
                {width >= 1024 || width < 768 ? <FullLogoButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} /> : <LogoButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />}
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
