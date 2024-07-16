import { createContext, useContext } from "react"

const SelectedCourseContext = createContext(-1)
const SelectedCourseProvider = SelectedCourseContext.Provider
const useSelectedCourseContext = () => useContext(SelectedCourseContext)

export {
    SelectedCourseProvider, useSelectedCourseContext
}