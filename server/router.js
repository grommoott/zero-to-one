const Router = require("express")
const controller = require("./routerController")
const router = new Router()

router.get("/getCourses", controller.getCourses)
router.get("/getCourseImage", controller.getCourseImage)
router.post("/makeOrder", controller.makeOrder)
router.post("/yookassaWebhook", controller.yookassaWebhook)

module.exports = router
