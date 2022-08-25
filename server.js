const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan');
const app = express();
const bodyparser = require("body-parser");
const path = require('path');
const teams = require("./server/model/model.js")



dotenv.config({path: "config.env"})
const PORT = process.env.PORT||8080

// log requests
app.use(morgan("tiny"));


// parse requirements
app.use(bodyparser.urlencoded({extended: true}))

//set view engine
app.set("view engine", "ejs")
// if ejs files are somwhere specific- app.set("views", path.resolve(__dirname, "") )

//load assets
app.use(express.static("assets"))
//app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
//app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
//app.use("/js", express.static(path.resolve(__dirname, "assets/js")));


app.get('/',(req, res)=>{
    res.render('index', 
    {allTeams: teams}
    );
})
app.post('/',(req, res) =>{
    const newTeam= {
        teamName: req.body.teamName,
        gm: req.body.gm,
        team: {
            QB: req.body.team.QB,
            RB1: req.body.team.RB1,
            RB2: req.body.team.RB2,
            Flex: req.body.team.Flex,
            WR1: req.body.team.WR1,
            WR2: req.body.team.WR2,
            TE: req.body.team.TE,
            Defense: req.body.team.Defense,
            Kicker: req.body.team.Kicker
    }
}
    teams.push(newTeam);
    res.redirect('/');
})

app.get('/new_team',(req, res)=>{
    res.render('add_team');
})

app.get('/view_team/:teamID',(req, res)=>{
   const currentIndex = req.params.teamID - 1
    console.log(currentIndex);
    res.render('view_team', {
        team: teams[currentIndex],
        index: currentIndex
    });
})

app.get('/edit_team',(req, res)=>{
    res.render('edit_team');
})

app.listen(PORT, ()=>{console.log("Server is running on http://localhost:${PORT}")})