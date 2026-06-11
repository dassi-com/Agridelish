const express = require('express') ;
const path = require('path') ; 
const app = express() ;
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const users = [];

app.use(express.json());
app.use(express.static(path.join(__dirname , 'public')));

app.get('/', (req , res) =>{
    res.sendFile(path.join(__dirname , 'public' , 'home.html' ))});

app.get('/about', (req , res) =>{
    res.sendFile(path.join(__dirname , 'public' , 'about.html'))});

app.get('/shop', (req , res) =>{
    res.sendFile(path.join(__dirname , 'public' , 'shop.html'))});

app.get('/chef', (req , res) =>{
    res.sendFile(path.join(__dirname , 'public' , 'chef.html'))});

app.get('/contact', (req , res) =>{
    res.sendFile(path.join(__dirname , 'public' , 'contact.html'))});

app.get('/book-table', (req , res) =>{
    res.sendFile(path.join(__dirname , 'public' , 'book-table.html'))});

app.get('/details', (req , res) =>{
    res.sendFile(path.join(__dirname , 'public' , 'details.html'))});

app.get('/fournisor', (req , res) =>{
    res.sendFile(path.join(__dirname , 'public' , 'fournisor.html'))});

app.post('/register', (req, res) => {
    const { email, nom, telephone } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).send('Email déjà utilisé');
    }
    const userId = uuidv4();
    users.push({ id: userId, email, nom, telephone });
    res.status(201).send('Utilisateur enregistré');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
