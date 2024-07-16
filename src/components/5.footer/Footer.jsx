import FullLogo from "../FullLogo"
import Contact from "./Contact"
import Contacts from "./Contacts"
import pattern from "/patterns/footer-pattern.svg"

export default function Footer() {
    return (
        <footer
            className="h-fit bg-zinc-900 flex flex-col md:flex-row items-center justify-center"
            style={{
                background: `url(${pattern}) repeat`,
                backgroundSize: "42rem",
                backgroundColor: "#18181b"
            }}
        >
            <div className="flex flex-col items-center jetbrains-mono-bold text-sm text-zinc-800 m-4">
                <FullLogo />
                <p>OOO "ZeroToOne - IT School"</p>
                <p>ИНН 239471056492</p>
            </div>
            <Contacts />
        </footer>
    )
}
