package repositories

import (
	"src/models"

	"gorm.io/gorm"
)

type LogRepository struct {
	DB *gorm.DB
}

func NewLogRepo(db *gorm.DB) *LogRepository {
	return &LogRepository{DB: db}
}

func (r *LogRepository) Log(log *models.ActivityLog) error {
	return r.DB.Create(log).Error
}

func (r *LogRepository) List(limit, offset int) ([]models.ActivityLog, error) {
	if limit <= 0 {
		limit = 10 // default limit
	}
	if offset < 0 {
		offset = 0
	}

	var logs []models.ActivityLog
	err := r.DB.Order("created_at DESC").Limit(limit).Offset(offset).Find(&logs).Error
	return logs, err
}
