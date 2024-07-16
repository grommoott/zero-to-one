import copy from "/copy.svg"
import copied from "/copied.svg"

export default function Contact({
    type,
    heigth = "1rem",
    children,
    onClick,
    isCopied,
}) {
    let imagePath = "/contacts/"

    switch (type) {
        case "telegram":
            imagePath += "telegram.svg"
            break

        case "whatsapp":
            imagePath += "whatsapp.svg"
            break

        default:
            imagePath = ""
            break
    }

    return (
        <div
            className="flex flex-row items-center m-1 hover:scale-110 active:scale-90 duration-100 cursor-pointer"
            onClick={() => {
                onClick()
                navigator.clipboard.writeText(children)
            }}
        >
            {imagePath != "" && (
                <img
                    src={imagePath}
                    style={{ height: heigth }}
                    className="mr-2"
                />
            )}
            <p className="select-none">{children}</p>
            <img
                src={isCopied ? copied : copy}
                style={{ height: heigth }}
                className="ml-2"
            />
        </div>
    )
}
