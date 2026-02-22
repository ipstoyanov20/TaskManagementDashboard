package main

import (
	"src/config"
	"src/database"
	"src/routes"
)

func main() {
	cfg := config.Load()
	db := database.Connect(cfg)

	r := routes.Setup(db)
	r.Run() // default 8080
}
