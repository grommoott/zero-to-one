const popupWindow = {
    body: {
        initial: {
            opacity: 0,
        },
        variants: {
            visible: {
                backdropFilter: "blur(10px)",
                opacity: 1,
            },
            hidden: {
                backdropFilter: "blur(0px)",
                opacity: 0,
            },
        },
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
    child: {
        initial: {
            opacity: 0,
        },
        variants: {
            visible: {
                y: "calc(0rem - 50%)",
                x: "-50%",
                opacity: 1,
            },
            hidden: {
                y: "calc(-5rem - 50%)",
                x: "-50%",
                opacity: 0,
            },
        },
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
}

const circle = {
    variants: {
        common: {
            scale: 1,
            borderRadius: "0.5rem",
            rotate: 0,
            backgroundColor: "#18181aaa",
        },
        active: {
            scale: 1,
            borderRadius: "0.25rem",
            rotate: 45,
            backgroundColor: "#18181aee",
        },
    },
    transition: {
        duration: 0.2,
        ease: "easeInOut",
    },
}

const courses = {
    transition: {
        duration: 0.2,
        ease: "easeInOut",
    },
}

const select = {
    item: {
        variants: {
            shown: {
                opacity: 1,
                x: "0rem",
            },
            hidden: {
                opacity: 0,
                x: "-2rem",
            },
        },
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
}

const about = {
    parent: {
        variants: {
            shown: {
                y: "0rem",
                opacity: 1
            },
            hidden: {
                y: "5rem",
                opacity: 0
            }
        },
        transition: {
            duration: 0.5,
            ease: "easeInOut",
            staggerChildren: 0.1
        }
    },
    child: {
        variants: {
            shown: {

            }
        }
    }
}

const aboutItem = {
    parent: {
        variants: {
            shown: {},
            hidden: {},
        },
        transition: {
            staggerChildren: 0.25,
        },
    },
    child: {
        variants: {
            shown: {
                y: "0rem",
                opacity: 1,
                transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                },
            },
            hidden: {
                y: "5rem",
                opacity: 0,
                transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                },
            },
        },
    },
}

export { popupWindow, circle, courses, select, about, aboutItem }
