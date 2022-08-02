package services

import "github.com/Amrbahaa22/blogPost/server/models"

type UserService interface {
	FindUserById(string) (*models.DBResponse, error)
	FindUserByEmail(string) (*models.DBResponse, error)
}
