import Logo from "./Logo";

export default function LogoButton({ onClick }) {
    return <Logo className="hover:scale-110 active:scale-90 duration-100" onClick={onClick} />
}
