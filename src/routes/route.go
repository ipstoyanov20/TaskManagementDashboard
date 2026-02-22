package routes

import (
	"src/controllers"
	"src/repositories"
	"src/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(db *gorm.DB) *gin.Engine {
	router := gin.Default()

	taskRepo := repositories.NewTaskRepo(db)
	logRepo := repositories.NewLogRepo(db)
	taskService := services.NewTaskService(taskRepo, logRepo)
	taskController := controllers.NewTaskController(taskService)

	api := router.Group("/api/v1")
	api.GET("/tasks", taskController.List)
	api.POST("/tasks", taskController.Create)
	api.PUT("/tasks/:id", taskController.Update)
	api.DELETE("/tasks/:id", taskController.Delete)
	api.GET("/tasks/activity-log", taskController.LogList)

	return router
}
