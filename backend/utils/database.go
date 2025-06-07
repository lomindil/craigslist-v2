package utils

import (
	"craigslist-improved/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	DB.AutoMigrate(&models.User{}, &models.Topic{}, &models.Post{}, &models.Comment{})

	// Create initial topics if they don't exist
	initialTopics := []models.Topic{
		{Name: "Discussion Forums", Description: "General discussion forums"},
		{Name: "Job Listings", Description: "Job postings and opportunities"},
		{Name: "For Rent", Description: "Properties for rent"},
		{Name: "For Sale", Description: "Items for sale"},
	}

	for _, topic := range initialTopics {
		var existingTopic models.Topic
		if err := DB.Where("name = ?", topic.Name).First(&existingTopic).Error; err != nil {
			DB.Create(&topic)
		}
	}
}
