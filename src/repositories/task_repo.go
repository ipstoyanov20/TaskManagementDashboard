package repositories

import (
	"src/models"

	"gorm.io/gorm"
)

type TaskRepository struct {
	DB *gorm.DB
}

func NewTaskRepo(db *gorm.DB) *TaskRepository {
	return &TaskRepository{DB: db}
}

func (r *TaskRepository) All(filters map[string]interface{}) ([]models.Task, error) {
	var tasks []models.Task
	query := r.DB
	if p, ok := filters["priority"]; ok {
		query = query.Where("priority = ?", p)
	}
	err := query.Find(&tasks).Error
	return tasks, err
}

func (r *TaskRepository) Create(task *models.Task) error {
	return r.DB.Create(task).Error
}

func (r *TaskRepository) Update(id uint, data map[string]interface{}) error {
	return r.DB.Model(&models.Task{}).Where("id = ?", id).Updates(data).Error
}

func (r *TaskRepository) Delete(id uint) error {
	return r.DB.Delete(&models.Task{}, id).Error
}
