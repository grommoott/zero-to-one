import close from "/close.svg"

export default function CloseButton({ onClick, className }) {
    return (
        <img
            src={close}
            className={`h-12 w-12 cursor-pointer hover:scale-110 focus:scale-110 active:scale-90 duration-100 hover:rotate-90 active:-rotate-90 m-2 ${className} select-none`}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            draggable="false"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(key) => key.key === "Enter" && onClick()}
        />
    )
}
