import FullLogo from "./FullLogo";

export default function FullLogoButton({ onClick }) {
    return <FullLogo className="hover:scale-110 active:scale-90 duration-100" onClick={onClick} />
}
