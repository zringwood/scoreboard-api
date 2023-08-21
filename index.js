//Server imports 
require("dotenv")
const express = require('express');
const app = express();
const port = process.env.PORT || process.argv[2] || 8080;
const cors = require('cors');
const short = require('short-uuid');
app.use(cors());
app.use(express.json())
// Temporary stand-in for a proper database
const matches = {}

//route adds match data to the database and returns the URLs generated for the controller and the scoreboard. 
app.post("/",(req,res) => {
        const id = short.generate();
        matches[id] = JSON.stringify(req.body);
        return res.status(200).send(id);
})
app.get("/:id", (req,res) => {
    const id = req.params.id;
    if(matches[id])
        return res.status(200).send(matches[id])
    return res.status(404).send("No match with that id.")
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
