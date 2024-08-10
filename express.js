const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const fs = require("fs").promises;
const path = require('path');


const SECRET_KEY = "MZmZ1234"

const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
    {id:3, username: "mzmz@gmail.com", password: "mzmz1234"}
  ];

app.use(express.urlencoded({extended:"true"}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next)=>{
    console.log("Hello from MiddleWare")
    next()
})

app.get('/',async (req,res)=>{
    console.log(req.body)
    const html = await fs.readFile('./view/index.html', 'utf-8')
    res.header({"Content-Type": "text/html"})
    res.end(html)
})

app.post('/login',(req,res)=>{
    console.log(req.body)
    const username = req.body.email;
    const password = req.body.password;
    console.log(username)
    console.log(password)
    const user = users.find(u => u.username === username && u.password === password);

    if(user){
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '20d' });
        res.json({ token });
    }else{

        res.header({"Content-Type": "text/plain"})
        res.end("Wrong User or Pass")

    }

    
})

app.post('/priv',(req,res)=>{

    // const token = req.body.token;
    const authHeader = req.headers['authorization'];
    const token = authHeader;

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
          return res.end("Fuck u");
        }
        req.user = user; // Save the token's payload to the request object
        console.log("true user")
        res.end("Hello Sir")
    });
})

app.listen(process.env.PORT || 3000)