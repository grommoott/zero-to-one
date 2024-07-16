import { useRef, useState } from "react"

export default function Input({
    onChange = () => {},
    fieldName,
    isValidExternal = true,
    validator = () => true,
}) {
    const [isFocused, setIsFocused] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const inputRef = useRef(null)

    return (
        <div className="relative w-fit h-fit m-2">
            <input
                type="text"
                ref={inputRef}
                onChange={(e) => {
                    onChange(e.target.value)
                    setIsValid(validator(e.target.value))
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`px-2 pt-4 pb-1 jetbrains-mono-bold shadow rounded outline-none hover:shadow-md text-lg ${
                    !(isValid && isValidExternal) && "text-red-500"
                }`}
            />

            <p
                className={`absolute ${
                    isFocused || inputRef?.current?.value
                        ? "text-sm top-1/4 -translate-y-2/3"
                        : "text-lg top-1/2 -translate-y-1/2"
                }
                ${
                    !(isValid && isValidExternal) && "text-red-500"
                } jetbrains-mono-bold mx-2 text-zinc-400 pointer-events-none duration-100 select-none`}
            >
                {fieldName}
            </p>
        </div>
    )
}
