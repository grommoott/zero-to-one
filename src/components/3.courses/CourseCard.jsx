import PropTypes from "prop-types"
import { motion } from "framer-motion"
import Button from "../Button"
import { host } from "../../config"

export default function CourseCard({ course, onBook, onMoreInfo, style }) {
    return (
        <motion.div
            className="flex flex-col w-60 h-96 mx-4 duration-100 bg-zinc-900 shadow-xl rounded-xl overflow-hidden"
            style={style}
        >
            <div className="w-full h-1/3 object-cover group overflow-hidden relative cursor-pointer">
                <img
                    src={`/api/getCourseImage?name=${course.name}`}
                    className="w-full group-hover:scale-125 duration-200 group-hover:blur-sm group-active:grayscale select-none"
                    onClick={() => onMoreInfo(course.id)}
                    draggable="false"
                />
                <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black/100 to-black/0 opacity-0 group-hover:opacity-100 duration-200 pointer-events-none" />
                <h3 className="absolute bottom-2 text-white w-full text-xl jetbrains-mono-bold text-center opacity-0 group-hover:opacity-100 duration-200 select-none group-active:scale-90  pointer-events-none">
                    Нажмите, чтобы узнать больше
                </h3>
            </div>

            <div className="p-4 flex flex-col h-2/3">
                <h3 className="jetbrains-mono-bold text-xl sm:text-2xl text-white">
                    {course.name}
                </h3>
                <p className="jetbrains-mono-bold text sm:text-lg text-white py-2">
                    {course.description}
                </p>
                <div className="grow "></div>
                <p className="jetbrains-mono-bold text-xl sm:text-3xl text-main">
                    {course.price} РУБ
                </p>
                <Button
                    type="dark"
                    onClick={() => onBook(course.id)}
                    className="self-stretch mx-0"
                >
                    Записаться
                </Button>
            </div>
        </motion.div>
    )
}

CourseCard.propTypes = {
    course: PropTypes.exact({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        fullDescription: PropTypes.string,
        price: PropTypes.number,
    }),
}
