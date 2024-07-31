import logo from "/logo.svg"

export default function Logo({ className, ...props }) {
    return <img src={logo} className={"mx-4 h-16 " + className} {...props} />
}
