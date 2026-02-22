package dto

type TaskCreateDTO struct {
	Title    string `json:"title" binding:"required"`
	Status   string `json:"status"`
	Priority int    `json:"priority"`
}

type TaskUpdateDTO struct {
	Status   string `json:"status"`
	Priority int    `json:"priority"`
}
