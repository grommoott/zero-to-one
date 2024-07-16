import { useState } from "react"
import Contact from "./Contact"
import contacts from "@data/contacts"

export default function Contacts() {
    const [copiedId, setCopiedId] = useState(-1)

    return (
        <div className="flex flex-col items-center jetbrains-mono-bold text-sm text-zinc-800 m-4">
            <p className="text-lg text-center">Контакты (нажмите, чтобы скопировать)</p>
            {contacts.map((val, id) => (
                <Contact
                    type={val.type}
                    onClick={() => setCopiedId(id)}
                    key={id}
                    isCopied={id == copiedId}
                >
                    {val.value}
                </Contact>
            ))}
        </div>
    )
}
