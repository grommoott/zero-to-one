import { useContext, useEffect, useState } from "react"
import useWindowWidth from "../../hooks/useWindowWidth"
import ArrowButton from "../ArrowButton"
import CourseCard from "./CourseCard"
import { useAnimate } from "framer-motion"
import CoursesIndicator from "./CoursesIndicator"
import { useCoursesContex } from "../../CoursesContext"
import Loading from "../Loading"
import CourseMoreInfo from "./CourseMoreInfo"
import { useSelectedCourseContext } from "../../SelectedCourseContext"

export default function CoursesList() {
    const width = useWindowWidth()
    const [offset, setOffset] = useState(0)
    const [coursesScope, animateCourses] = useAnimate()
    const { _, setSelectedCourse } = useSelectedCourseContext()
    const courses = useCoursesContex()

    const [openedCourseId, setOpenedCourseId] = useState(undefined)
    const [isCourseInfoVisible, setIsCourseInfoVisible] = useState(false)

    const length = courses?.length || 0
    const cardWidth = width >= 400 ? 17 : 14
    let shown = 0

    if (width < 800) {
        shown = 1
    } else if (width < 1024) {
        shown = 1
    } else if (width < 1700) {
        shown = 3
    } else if (width < 2100) {
        shown = 5
    } else {
        shown = 7
    }

    const maxOffset = length - shown
    const viewportWidth = shown * cardWidth + "rem"
    const addOffset = (val) => {
        let nextOffset = Math.max(Math.min(maxOffset, offset + val), 0)
        setOffset(nextOffset)

        if (offset == 0) {
            animateCourses(
                coursesScope.current,
                {
                    right: [0, nextOffset * cardWidth + "rem"],
                },
                { duration: 0.2, ease: "easeInOut" }
            )
        } else {
            animateCourses(
                coursesScope.current,
                {
                    right: nextOffset * cardWidth + "rem",
                },
                { duration: 0.2, ease: "easeInOut" }
            )
        }
    }

    const onBook = (id) => {
        setSelectedCourse(id)
        document
            .querySelector(".book-yakor")
            .scrollIntoView({
                behaviour: "auto",
                block: "start",
            })
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row justify-center items-center">
                    {length > shown && (
                        <ArrowButton
                            type="left"
                            onClick={() => addOffset(-1)}
                        />
                    )}

                    {!courses && <Loading className="m-auto p-20" />}

                    {courses?.length == 0 && (
                        <h1 className="text-3xl lg:text-5xl jetbrains-mono-bold text-zinc-300 p-20 text-center">
                            К сожалению, сейчас нет доступных курсов :(
                        </h1>
                    )}

                    {courses?.length > 0 && (
                        <div
                            className="overflow-hidden flex flex-row items-center"
                            style={{
                                width: viewportWidth,
                                height: width >= 400 ? "30rem" : "32rem",
                            }}
                        >
                            <div
                                ref={coursesScope}
                                className={`flex flex-row flex-nowrap relative z-0 ${
                                    length <= shown
                                        ? "justify-center w-full"
                                        : "justify-start"
                                }`}
                                style={{ right: offset * cardWidth + "rem" }}
                            >
                                {courses.map((val) => (
                                    <CourseCard
                                        course={val}
                                        key={val.id}
                                        onMoreInfo={(id) => {
                                            setOpenedCourseId(id)
                                            setIsCourseInfoVisible(true)
                                        }}
                                        onBook={onBook}
                                        style={
                                            width >= 400
                                                ? {}
                                                : {
                                                      width: "12rem",
                                                      height: "26rem",
                                                  }
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {length > shown && (
                        <ArrowButton
                            type="right"
                            onClick={() => addOffset(1)}
                        />
                    )}
                </div>
                <CoursesIndicator
                    length={length}
                    offset={offset}
                    shown={shown}
                />
            </div>
            <CourseMoreInfo
                isVisible={isCourseInfoVisible}
                toggleVisible={() =>
                    setIsCourseInfoVisible(!isCourseInfoVisible)
                }
                onBook={onBook}
                courseId={openedCourseId}
            />
        </>
    )
}
