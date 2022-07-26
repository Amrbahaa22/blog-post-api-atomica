package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type UserForCredential struct {
	Email    string `json:"email,omitempty" validate:"required"`
	Password string `json:"password,omitempty" validate:"required"`
}

type User struct {
	Id       primitive.ObjectID `json:"id,omitempty" bson:"id"`
	Name     string             `json:"name,omitempty" validate:"required" bson:"name"`
	Gender   string             `json:"gender,omitempty" validate:"required"  bson:"gender"`
	Age      int                `json:"age,omitempty" validate:"required"      bson:"age"`
	Email    string             `json:"email,omitempty" validate:"required"  bson:"email"`
	Password string             `json:"password,omitempty" validate:"required"  bson:"password"`
}
