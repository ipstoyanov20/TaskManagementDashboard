package services

import (
	"encoding/json"
	"fmt"
	"src/models"
	"src/repositories"
)

type TaskService struct {
	Repo    *repositories.TaskRepository
	LogRepo *repositories.LogRepository
}

func NewTaskService(r *repositories.TaskRepository, lr *repositories.LogRepository) *TaskService {
	return &TaskService{Repo: r, LogRepo: lr}
}

func (s *TaskService) ListTasks(priority *int) ([]models.Task, error) {
	filters := make(map[string]interface{})
	if priority != nil {
		filters["priority"] = *priority
	}
	return s.Repo.All(filters)
}

func (s *TaskService) CreateTask(t *models.Task) error {
	err := s.Repo.Create(t)
	if err == nil {
		s.logActivity(t.ID, "create", "", fmt.Sprintf("%+v", t))
	}
	return err
}

func (s *TaskService) BulkUpdate(tasks []models.Task) error {
	for _, t := range tasks {
		old := fmt.Sprintf("%+v", t)
		data := map[string]interface{}{"status": t.Status, "priority": t.Priority}
		s.Repo.Update(t.ID, data)
		s.logActivity(t.ID, "update", old, fmt.Sprintf("%+v", t))
	}
	return nil
}

func (s *TaskService) UpdateTask(id uint, data map[string]interface{}) error {
	oldTask, _ := s.Repo.All(map[string]interface{}{"id": id})
	err := s.Repo.Update(id, data)
	if err == nil {
		oldValue, _ := json.Marshal(oldTask)
		s.logActivity(id, "update", string(oldValue), fmt.Sprintf("%v", data))
	}
	return err
}

func (s *TaskService) DeleteTask(id uint) error {
	err := s.Repo.Delete(id)
	if err == nil {
		s.logActivity(id, "delete", "", "")
	}
	return err
}

func (s *TaskService) logActivity(taskID uint, action, oldValue, newValue string) {
	s.LogRepo.Log(&models.ActivityLog{TaskID: taskID, Action: action, OldValue: oldValue, NewValue: newValue})
}

func (s *TaskService) ListActivityLogs(limit, offset int) ([]models.ActivityLog, error) {
	return s.LogRepo.List(limit, offset)
}
