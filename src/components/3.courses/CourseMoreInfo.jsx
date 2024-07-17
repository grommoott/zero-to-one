import { useContext } from "react"
import PopupWindow from "../PopupWindow"
import { useCoursesContex } from "../../CoursesContext"
import Button from "../Button"
import config from "../../config"

export default function CourseMoreInfo({
    courseId,
    isVisible,
    toggleVisible,
    onBook,
}) {
    const courses = useCoursesContex()
    const course = courses?.filter((val) => val.id === courseId)[0]

    return (
        <PopupWindow isVisible={isVisible} toggleVisible={toggleVisible}>
            {course && (
                <div className="flex flex-col">
                    <img
                        src={`${config.api}/getCourseImage?name=${courses[courseId].name}`}
                        className="h-60 object-cover select-none"
                        draggable="false"
                    />
                    <div className="flex flex-col justify-start items-start p-4">
                        <h1 className="text-3xl lg:text-5xl text-white jetbrains-mono-bold">
                            {course.name}
                        </h1>
                        <p className="text-lg text-white jetbrains-mono-bold max-h-40 my-4 overflow-scroll">
                            {course.fullDescription}
                        </p>

                        <p className="text-white text-3xl jetbrains-mono-bold">
                            ЦЕНА:{" "}
                            <span className="text-main">
                                {course.price} РУБ
                            </span>
                        </p>
                        <Button
                            type="dark"
                            onClick={() => {
                                toggleVisible()
                                onBook(courseId)
                            }}
                            className="self-stretch mx-0"
                        >
                            Записаться
                        </Button>
                    </div>
                </div>
            )}
        </PopupWindow>
    )
}
