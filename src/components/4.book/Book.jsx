import BookForm from "./BookForm"
import pattern from "/patterns/book-pattern.svg"

export default function Book() {
    return (
        <div
            className="bg-main h-fit flex flex-col items-center pt-36 pb-24 px-2"
            style={{
                background: `url(${pattern}) repeat`,
                backgroundColor: "#00d815",
                backgroundSize: "60rem",
            }}
        >
            <div className="relative">
                <div className="book-yakor absolute -top-16"></div>
            </div>

            <h1
                className="text-white jetbrains-mono-bold uppercase text-center text-5xl md:text-7xl mx-2 py-10"
                style={{ textShadow: "0 2px 5px #00000044" }}
            >
                Записаться на курс
            </h1>
            <div className="rounded-xl shadow-lg bg-white p-4 w-fit sm:w-3/4 m-8">
                <p className="p-4 jetbrains-mono-bold text-lg border-zinc-100 border-2 rounded-xl">
                    Чтобы попасть в нашу онлайн-школу: <br />
                    1. Заполните форму <br />
                    2. Нажмите "Оформить заказ" и оплатите покупку <br />
                    3. В Telegram пропишите для бота команду "start" и потом
                    "activate" <br />
                    4. Введите кодовое слово, чтобы подтвердить, что это вы
                    пытаетесь активировать курс <br />
                    <br />
                    Если активировать покупку не получается, то скорее всего вы
                    ввели неправильный Username, но не волнуйтесь, если заказ не
                    будет принят за час, то платёж будет отклонён и деньги
                    вернутся на ваш баланс
                </p>
            </div>

            <BookForm />
        </div>
    )
}
