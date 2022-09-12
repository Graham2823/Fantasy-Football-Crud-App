// const data = [
//     {
//         teamName: "The Beasts",
//         gm: "Jordan",
//         team: {
//             QB: "Rodgers",
//             RB1: "Ekler",
//             RB2: "Jones",
//             Flex: "Cordarelle",
//             WR1: "Davante",
//             WR2: "Amon Ra",
//             TE: "Mark Andrews",
//             Defense: "Packers",
//             Kicker: "Yung Hoe"
//         }

//     }
// ];

const mongoose = require('./connections.js');

const {Schema, model} = mongoose;

const teamSchema = new Schema({
    teamName: String,
    gm: String,
    Team: {
        QB: String,
        RB1: String,
        RB2: String,
        Flex: String,
        WR1: String,
        WR2: String,
        TE: String,
        Defense: String,
        Kicker: String
    }
})

const Teams = model('Teams', teamSchema)

module.exports = Teams



// module.exports = teams

