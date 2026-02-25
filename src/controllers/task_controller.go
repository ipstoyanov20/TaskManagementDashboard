package controllers

import (
	"net/http"
	"strconv"

	"src/dto"
	"src/models"
	"src/services"

	"github.com/gin-gonic/gin"
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
		i, err := strconv.Atoi(prioStr)
		if err == nil {
			prio = &i
		}
	}

	titleStr := ctx.Query("title")
	var title *string
	if titleStr != "" {
		title = &titleStr
	}

	tasks, err := c.Service.ListTasks(prio, title)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, tasks)
}

func (c *TaskController) Create(ctx *gin.Context) {
	var input dto.TaskCreateUpdateDTO
	if err := ctx.ShouldBindJSON(&input); err == nil {
		task := models.Task{
			Title:       input.Title,
			Description: input.Description,
			Priority:    input.Priority,
			Deadline:    input.Deadline,
		}
		if err := c.Service.CreateTask(&task); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusCreated, task)
	} else {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func (c *TaskController) Update(ctx *gin.Context) {
	idStr := ctx.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var input dto.TaskCreateUpdateDTO
	if err := ctx.ShouldBindJSON(&input); err == nil {
		data := map[string]interface{}{
			"title":       input.Title,
			"description": input.Description,
			"priority":    input.Priority,
			"deadline":    input.Deadline,
		}
		if err := c.Service.UpdateTask(uint(id), data); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		// Fetch the updated task to return it
		tasks, _ := c.Service.Repo.All(map[string]interface{}{"id": uint(id)})
		if len(tasks) > 0 {
			ctx.JSON(http.StatusOK, tasks[0])
		} else {
			ctx.Status(http.StatusOK)
		}
	} else {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
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
