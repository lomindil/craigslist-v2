package routes

import (
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	// Auth routes
	auth := r.Group("/auth")
	{
		auth.POST("/register", Register)
		auth.POST("/login", Login)
	}

	// Topic routes
	topics := r.Group("/topics")
	{
		topics.GET("/", GetTopics)
		topics.POST("/", CreateTopic)
		topics.GET("/:id", GetTopic)
		topics.POST("/:id/subtopics", CreateSubtopic)
	}

	// Post routes
	posts := r.Group("/posts")
	{
		posts.GET("/:id", GetPost)
		posts.POST("/", CreatePost)
		posts.POST("/:id/comments", CreateComment)
	}

	return r
}
