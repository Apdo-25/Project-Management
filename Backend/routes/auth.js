const Router = require("express").Router; //Router function from express
const User = require("../models/user"); //User model
const router = new Router();
const bcrypt = require("bcrypt"); //bcryptjs for password hashing
const jwt = require("jsonwebtoken"); //jsonwebtoken for token generation
