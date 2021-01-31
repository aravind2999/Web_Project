//Requiring the express module that you installed
const express = require('express')
const app = express()
const request = require("request")
// const request = require("request")
//Install dotenv => npm install dotenv
const dotenv = require('dotenv')
const { response } = require('express')
dotenv.config()

//Install install ejs module => npm install ejs
app.set("view engine","ejs")
app.use('/public',express.static('public'))

//rendering homepage.ejs file
app.get("/",(req,res)=>{
    res.render("homepage")
})

// app.get("/result",(req,res)=>{
//     // console.log(req.query.username)
//     res.send("Data recieved")
// })

//Rendering the aboutme ejs file
app.get("/aboutme",(req,res)=>{
    res.render("Aboutme")
})

app.get("/result", (req,res)=>{
    console.log(req.query.movieName)
    console.log(process.env.API_KEY)
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            const data = JSON.parse(body)
            res.render("result",{movieData: data})
        }else{
            res.send("Uh oh error")
        }
    })
})
//Creating root route and get request at route "/"
// app.get("/",(req,res)=>{
//     res.send("Hello")
// })

app.get("*",(req,res)=>{
    res.send("Some Error")
})
//Starting the server at 3000 port
app.listen(process.env.PORT,function(){
    console.log(`Server started at port ${process.env.PORT}`)
})