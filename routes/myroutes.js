const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/', (req, res)=>{
    //res.sendFile(path.join(__dirname, '../view/login.html'))
    res.render("login");
})

router.get('/login', (req, res)=>{
    //res.sendFile(path.join(__dirname, '../views/login.html'))
    res.render("login");
})

router.get('/register', (req, res)=>{
    //res.sendFile(path.join(__dirname, '../views/register.html'))
    res.render("register");
})

router.get('/home', (req, res)=>{
    //res.sendFile(path.join(__dirname, '../views/index.html'))
    res.render("index");
})

router.get('/addchallenge', (req, res)=>{
    //res.sendFile(path.join(__dirname, '../views/add_challenge.html'))
    res.render("add_challenge");
})

router.get('/editchallenge', (req, res)=>{
    //res.sendFile(path.join(__dirname, '../views/edit_challenge.html'))
    res.render("edit_challenge");
})

router.get('/challenge_list', (req, res)=>{
    //res.sendFile(path.join(__dirname, '../views/challenge_list.html'))
    res.render("challenge_list");
})

module.exports = router