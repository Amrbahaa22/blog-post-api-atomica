package routes

import (
	"github.com/Amrbahaa22/blogPost/server/controllers"
	"github.com/Amrbahaa22/blogPost/server/middleware"
	"github.com/Amrbahaa22/blogPost/server/services"
	"github.com/gin-gonic/gin"
)

type PostRouteController struct {
	postController controllers.PostController
}

func NewPostControllerRoute(postController controllers.PostController) PostRouteController {
	return PostRouteController{postController}
}

func (r *PostRouteController) PostRoute(rg *gin.RouterGroup, userService services.UserService) {
	router := rg.Group("/posts")

	router.GET("/", r.postController.FindPosts)
	router.GET("/:postId", r.postController.FindPostById)
	router.POST("/", r.postController.CreatePost)
	router.PATCH("/:postId", r.postController.UpdatePost)
	router.DELETE("/:postId", middleware.DeserializeUser(userService), r.postController.DeletePost)
}
