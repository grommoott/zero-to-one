import Input from "@book/Input";
import { useCoursesContex } from "../../CoursesContext";
import Button from "../Button";
import Select from "./Select";
import { useEffect, useState } from "react";
import { useSelectedCourseContext } from "../../SelectedCourseContext";
import { useAnimate } from "framer-motion";
import config from "../../config";

export default function BookForm() {
    const courses = useCoursesContex();
    const { selectedCourse, setSelectedCourse } = useSelectedCourseContext();
    const [msgScope, animateMsg] = useAnimate();
    const [processMsg, setProcessMsg] = useState();

    const [inputData, setInputData] = useState({});

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col">
                <Select
                    options={courses?.map((val) => val.name) || []}
                    selectedId={selectedCourse}
                    setSelectedId={setSelectedCourse}
                    placeholder="Не выбрано"
                />
                <Input
                    fieldName="Telegram username"
                    onChange={(val) =>
                        setInputData((data) => {
                            return { ...data, username: val };
                        })
                    }
                />
                <Input
                    fieldName="Кодовое слово"
                    onChange={(val) =>
                        setInputData((data) => {
                            return { ...data, keyword: val };
                        })
                    }
                />
            </div>

            <div
                className="hidden sm:block bg-white mx-4"
                style={{ width: "0.2rem" }}
            ></div>
            <div
                className="block sm:hidden bg-white my-4"
                style={{ height: "0.2rem" }}
            ></div>

            <div className="flex flex-col items-center justify-start">
                <p
                    className="text-4xl jetbrains-mono-bold text-white h-fit"
                    style={{ textShadow: "0 2px 5px #00000044" }}
                >
                    {courses?.at(selectedCourse)?.price && selectedCourse != -1
                        ? courses?.at(selectedCourse)?.price
                        : "???"}{" "}
                    РУБ
                </p>
                <Button
                    type="light"
                    onClick={async () => {
                        async function msg(error) {
                            setProcessMsg(error);
                            animateMsg(
                                msgScope.current,
                                { scale: [0, 1.1, 1], opacity: [0, 1, 1] },
                                {
                                    duration: 0.3,
                                    ease: "easeInOut",
                                    times: [0, 0.7, 1],
                                },
                            );
                        }

                        if (selectedCourse == -1) {
                            msg("выберите курс");
                            return;
                        }

                        if (inputData.username == "" || inputData.username == undefined) {
                            msg("введите ваш username в telegram");
                            return;
                        }

                        if (inputData.keyword == "" || inputData.keyword == undefined) {
                            msg("придумайте любое кодовое слово и запомните его");
                            return;
                        }

                        msg("Запрос отправлен!");

                        const response = await fetch(config.api + "/makeOrder", {
                            body: JSON.stringify({
                                username: inputData.username,
                                keyword: inputData.keyword,
                                course: courses[selectedCourse],
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                            method: "post",
                        });

                        if (response.status === 200) {
                            const url = await response.text()
                            location.replace(url)
                            window.open(url, "_top")
                        } else {
                            switch (response.statusText) {
                                case "Course is already activated":
                                    msg("Курс уже активирован (см. инструкцию)");
                                    break;

                                case "Order is already exists":
                                    msg("Курс уже ждёт активации (см. инструкцию)");
                                    break;

                                default:
                                    msg("Произошла ошибка сервера, приносим свои извинения");
                                    break;
                            }
                        }
                    }}
                >
                    оформить заказ
                </Button>
                <p
                    className="text-white jetbrains-mono-bold uppercase text-wrap w-48 text-center "
                    style={{ textShadow: "0px 3px 5px #00000044" }}
                    ref={msgScope}
                >
                    {processMsg}
                </p>
            </div>
        </div>
    );
}
