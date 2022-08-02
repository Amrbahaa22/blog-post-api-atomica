package routes

import (
	"github.com/Amrbahaa22/blogPost/server/controllers"
	"github.com/Amrbahaa22/blogPost/server/middleware"
	"github.com/Amrbahaa22/blogPost/server/services"
	"github.com/gin-gonic/gin"
)

type AuthRouteController struct {
	authController controllers.AuthController
}

func NewAuthRouteController(authController controllers.AuthController) AuthRouteController {
	return AuthRouteController{authController}
}

func (rc *AuthRouteController) AuthRoute(rg *gin.RouterGroup, userService services.UserService) {
	router := rg.Group("/auth")

	router.POST("/register", rc.authController.SignUpUser)
	router.POST("/login", rc.authController.SignInUser)
	router.GET("/refresh", rc.authController.RefreshAccessToken)
	router.GET("/logout", middleware.DeserializeUser(userService), rc.authController.LogoutUser)
}
