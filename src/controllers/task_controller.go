package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"src/dto"
	"src/models"
	"src/services"
)

type TaskController struct {
	Service *services.TaskService
}

func NewTaskController(s *services.TaskService) *TaskController {
	return &TaskController{Service: s}
}

func (c *TaskController) List(ctx *gin.Context) {
	prioStr := ctx.Query("priority")
	var prio *int
	if prioStr != "" {
		i, _ := strconv.Atoi(prioStr)
		prio = &i
	}
	tasks, _ := c.Service.ListTasks(prio)
	ctx.JSON(http.StatusOK, tasks)
}

func (c *TaskController) Create(ctx *gin.Context) {
	var input []dto.TaskCreateDTO
	if err := ctx.ShouldBindJSON(&input); err == nil {
		for _, t := range input {
			task := models.Task{Title: t.Title, Status: t.Status, Priority: t.Priority}
			c.Service.CreateTask(&task)
		}
		ctx.Status(http.StatusCreated)
	} else {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func (c *TaskController) Update(ctx *gin.Context) {
	id, _ := strconv.ParseUint(ctx.Param("id"), 10, 32)
	var input dto.TaskUpdateDTO
	if ctx.ShouldBindJSON(&input) == nil {
		data := map[string]interface{}{"status": input.Status, "priority": input.Priority}
		c.Service.UpdateTask(uint(id), data)
	}
	ctx.Status(http.StatusOK)
}

func (c *TaskController) Delete(ctx *gin.Context) {
	id, _ := strconv.ParseUint(ctx.Param("id"), 10, 32)
	c.Service.DeleteTask(uint(id))
	ctx.Status(http.StatusNoContent)
}

func (c *TaskController) LogList(ctx *gin.Context) {
	limit, _ := strconv.Atoi(ctx.Query("limit"))
	offset, _ := strconv.Atoi(ctx.Query("offset"))
	logs, _ := c.Service.ListActivityLogs(limit, offset)
	ctx.JSON(http.StatusOK, logs)
}
