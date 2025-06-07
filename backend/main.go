package main

import (
	"github.com/rs/cors"
	"log"
	"net/http"
	"craigslist-improved/routes"
	"craigslist-improved/utils"
)

func main() {
	// Initialize database
	utils.InitDB()
	
	// Set up routes
	router := routes.SetupRoutes()

	    // Add CORS support
		c := cors.New(cors.Options{
			AllowedOrigins:   []string{"http://localhost:3000"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Content-Type", "Authorization"},
			AllowCredentials: true,
		})
	
		handler := c.Handler(router)

    log.Println("Server starting on :8080...")
    log.Fatal(http.ListenAndServe(":8080", handler))
}
