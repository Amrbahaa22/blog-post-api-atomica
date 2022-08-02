package routes

import (
	"github.com/Amrbahaa22/blogPost/server/controllers"
	"github.com/Amrbahaa22/blogPost/server/middleware"
	"github.com/Amrbahaa22/blogPost/server/services"
	"github.com/gin-gonic/gin"
)

type UserRouteController struct {
	userController controllers.UserController
}

func NewRouteUserController(userController controllers.UserController) UserRouteController {
	return UserRouteController{userController}
}

func (uc *UserRouteController) UserRoute(rg *gin.RouterGroup, userService services.UserService) {

	router := rg.Group("users")
	router.Use(middleware.DeserializeUser(userService))
	router.GET("/me", uc.userController.GetMe)
}
