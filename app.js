const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection; // Helps to shorten the code.
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Databased connected!");
})


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));


app.listen(3000, () => {
    console.log('Hello from Yelp!')
});

app.get('/', (req,res) => {
    res.render('home')
});

app.get('/makecampground', async (req,res) => {
    const camp = new Campground({
        title: 'BlackwaterNaturalPromenade',
        price: "£50",
        description: "Berries abound!",
        location: 'Blackwater'

    });

    await camp.save();

    console.log(camp)
    
    res.send(camp);
});

