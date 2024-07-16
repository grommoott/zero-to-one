import logo from "/full-logo.png"

export default function FullLogo({className, ...props}) {
    return <img src={logo} className={"mx-4 h-16 " + className} {...props}/>
}