const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan');
const app = express();
const bodyparser = require("body-parser");
const path = require('path');
const teams = require("./server/model/model.js")
const methodOverride = require('method-override')



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
app.use(methodOverride("_method"))
//app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
//app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
//app.use("/js", express.static(path.resolve(__dirname, "assets/js")));


app.get('/',(req, res)=>{
    res.render('index', 
    {allTeams: teams}
    );
})
app.post('/',(req, res) =>{
    console.log(req.body)
    const newTeam= {
        teamName: req.body.team_name,
        gm: req.body.team_GM,
        team: {
            QB: req.body.QB,
            RB1: req.body.RB1,
            RB2: req.body.RB2,
            Flex: req.body.Flex,
            WR1: req.body.WR1,
            WR2: req.body.WR2,
            TE: req.body.TE,
            Defense: req.body.Defense,
            Kicker: req.body.Kicker
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

app.get('/edit_team/:teamID',(req, res)=>{
    const currentIndex = req.params.teamID - 1
    console.log(currentIndex)
    res.render('edit_team', {
        team: teams[currentIndex],
        index: currentIndex
    });
})

app.put('/edit_team/:teamID',(req, res)=>{
    console.log(req.body)
    const id= req.params.teamID
    console.log(id)
    teams[id].teamName = req.body.team_name
    teams[id].gm = req.body.team_GM
    teams[id].team.QB = req.body.QB
    teams[id].team.RB1 = req.body.RB1
    teams[id].team.RB2 = req.body.RB2
    teams[id].team.Flex = req.body.Flex
    teams[id].team.WR1 = req.body.WR1
    teams[id].team.WR2 = req.body.WR2
    teams[id].team.TE = req.body.TE
    teams[id].team.Defense = req.body.Defense
    teams[id].team.Kicker = req.body.Kicker
    res.redirect('/')
})

app.delete('/view_team/:teamID', (req, res) =>{
    console.log("deleted successfully")
    teams.splice(req.params.teamID, 1)
    res.redirect('/')
}), 

app.listen(PORT, ()=>{console.log("Server is running on http://localhost:${PORT}")})