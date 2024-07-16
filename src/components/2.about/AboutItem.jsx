import { motion } from "framer-motion"
import { aboutItem } from "../../data/animations"

export default function AboutItem({ item }) {
    return (
        <motion.div variants={aboutItem.child.variants} className="flex flex-col sm:flex-row lg:flex-col 2xl:flex-row items-center sm:items-start lg:items-center 2xl:items-start p-4 pt-8">
            <img
                src={`/about-items/${item.id}.svg`}
                className="h-48 select-none"
                draggable="false"
            />
            <div className="flex flex-col px-4">
                <h3 className="text-2xl text-white jetbrains-mono-bold w-60 py-4 text-center sm:text-start lg:text-center 2xl:text-start">
                    {item.header}
                </h3>
                <p className="text-lg text-white jetbrains-mono-bold w-60 text-center sm:text-start lg:text-center 2xl:text-start">
                    {item.description}
                </p>
            </div>
        </motion.div>
    )
}
