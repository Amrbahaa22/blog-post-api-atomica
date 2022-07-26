package routes

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoute(app *fiber.App) {
	app.Post("api/v1/user", controllers.CreateUser)
	app.Get("api/v1/user/:userId", controllers.GetAUser)
	app.Put("api/v1/user/:userId", controllers.EditAUser)
	app.Delete("/user/:userId", controllers.DeleteAUser)
	app.Get("/users", controllers.GetAllUsers)
}
