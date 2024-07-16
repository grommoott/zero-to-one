import Circle from "./Circle"

export default function CoursesIndicator({length, offset, shown}) {
    const circles = new Array()

    for (let i = 0; i < length; i++) {
        circles.push(i >= offset && i < offset + shown)
    }

    return <div className="flex flex-row justify-center items-center">
        {circles.map((val, id) => {
            return <Circle isActive={val} key={id}/>
        })}
    </div>
}