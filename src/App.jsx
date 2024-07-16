import { useEffect, useState } from "react"
import Header from "./components/0.header/Header"
import Preview from "./components/1.preview/Preview"
import About from "./components/2.about/About"
import Courses from "./components/3.courses/Courses"
import { CoursesProvider } from "./CoursesContext"
import Book from "./components/4.book/Book"
import { SelectedCourseProvider } from "./SelectedCourseContext"
import Footer from "./components/5.footer/Footer"

function App() {
    const [courses, setCourses] = useState(null)
    const [selectedCourse, setSelectedCourse] = useState(-1)

    useEffect(() => {
        const fun = async () => {
            const response = await fetch(
                "/api/getCourses",
                { method: "get" }
            )
            const json = await response.json()

            setCourses(json)
        }

        fun()
    }, [])

    return (
        <>
            <Header />
            <Preview />
            <About />

            <SelectedCourseProvider value={{selectedCourse, setSelectedCourse}}>
                <CoursesProvider value={courses}>
                    <Courses />
                    <Book />
                </CoursesProvider>
            </SelectedCourseProvider>

            <Footer />
        </>
    )
}

export default App
