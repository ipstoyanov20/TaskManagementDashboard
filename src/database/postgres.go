package database

import (
	"src/config"
	"src/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect(cfg *config.Config) *gorm.DB {
	db, err := gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	db.AutoMigrate(&models.Task{}, &models.ActivityLog{})

	return db
}
