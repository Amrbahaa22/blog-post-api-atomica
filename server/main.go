package main

import (
	"server/configs"
	"server/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {

	app := fiber.New()

	// run database
	configs.ConnectDB()

	//routes
	routes.UserRoute(app)

	app.Listen(":" + configs.EnvGetPort())

	// your endpoints go here these are the endpoints
	//C
	// router.POST("/order/create", routes.AddOrder)
	//R
	// router.GET("/waiter/:waiter", routes.GetOrdersByWaiter)
	// router.GET("/orders", routes.GetOrders)
	// router.GET("/order/:id/", routes.GetOrderById)
	//U
	// router.PUT("/waiter/update/:id", routes.UpdateWaiter)
	// router.PUT("/order/update/:id", routes.UpdateOrder)
	//D
	// router.DELETE("/order/delete/:id", routes.DeleteOrder)

	//this runs the server and allows it to listen to requests.

}
