package models


type Task struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	Priority    int    `json:"priority"`
	Deadline    string `json:"deadline"`
}
