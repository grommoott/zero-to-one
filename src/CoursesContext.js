import { createContext, useContext } from "react"

const CoursesContext = createContext(null)

const CoursesProvider = CoursesContext.Provider

const useCoursesContex = () => useContext(CoursesContext)

export {
    CoursesProvider,
    useCoursesContex
}