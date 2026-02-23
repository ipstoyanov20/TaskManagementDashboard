package dto

type TaskCreateUpdateDTO struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	Priority    int    `json:"priority"`
	Deadline    string `json:"deadline"`
}
