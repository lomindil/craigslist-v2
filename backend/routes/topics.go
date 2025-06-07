package routes

import (
	"craigslist-improved/models"
	"craigslist-improved/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type TopicInput struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
	ParentID    *uint  `json:"parent_id"`
}

func GetTopics(c *gin.Context) {
	var topics []models.Topic
	if err := utils.DB.Where("parent_id IS NULL").Preload("Subtopics").Find(&topics).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch topics"})
		return
	}
	c.JSON(http.StatusOK, topics)
}

func GetTopic(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid topic ID"})
		return
	}

	var topic models.Topic
	if err := utils.DB.Preload("Posts").Preload("Posts.User").Preload("Subtopics").First(&topic, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Topic not found"})
		return
	}

	c.JSON(http.StatusOK, topic)
}

func CreateTopic(c *gin.Context) {
	var input TopicInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	topic := models.Topic{
		Name:        input.Name,
		Description: input.Description,
		ParentID:    input.ParentID,
	}

	if err := utils.DB.Create(&topic).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create topic"})
		return
	}

	c.JSON(http.StatusCreated, topic)
}

func CreateSubtopic(c *gin.Context) {
	parentID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parent topic ID"})
		return
	}

	var input TopicInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verify parent topic exists
	var parentTopic models.Topic
	if err := utils.DB.First(&parentTopic, parentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Parent topic not found"})
		return
	}

	topic := models.Topic{
		Name:        input.Name,
		Description: input.Description,
		ParentID:    &parentTopic.ID,
	}

	if err := utils.DB.Create(&topic).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create subtopic"})
		return
	}

	c.JSON(http.StatusCreated, topic)
}
