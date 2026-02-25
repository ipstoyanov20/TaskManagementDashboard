package routes

import (
	"src/controllers"
	"src/repositories"
	"src/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(db *gorm.DB) *gin.Engine {
	router := gin.Default()

	router.Use(cors.Default())

	taskRepo := repositories.NewTaskRepo(db)
	logRepo := repositories.NewLogRepo(db)
	taskService := services.NewTaskService(taskRepo, logRepo)
	taskController := controllers.NewTaskController(taskService)

	router.GET("/tasks", taskController.List)
	router.POST("/tasks", taskController.Create)
	router.PUT("/tasks/:id", taskController.Update)
	router.DELETE("/tasks/:id", taskController.Delete)
	router.GET("/tasks/activity-log", taskController.LogList)

	return router
}
