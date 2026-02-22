package models

import "gorm.io/gorm"

type ActivityLog struct {
	gorm.Model
	TaskID   uint   `json:"task_id"`
	Action   string `json:"action"` // create/update/delete
	OldValue string `json:"old_value"`
	NewValue string `json:"new_value"`
}
