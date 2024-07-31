import logo from "/full-logo.png"

export default function FullLogo({ className, onClick, ...props }) {
    return <img src={logo} onClick={onClick} className={"mx-4 h-16 " + className} {...props} />
}
