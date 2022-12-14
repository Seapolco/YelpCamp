const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');


mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection; // Helps to shorten the code.
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Databased connected!");
})


const app = express();
app.engine('ejs', ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.listen(3000, () => {
    console.log('Hello from Yelp!')
});

app.get('/', (req,res) => {
    res.render('home', {title: "home"})
});

app.get('/campgrounds', async (req,res) => {
    const campgrounds = await Campground.find({});
    res.locals.title = 'Campgrounds';
    //console.log(res.locals.title)
    res.render('campgrounds/index', {campgrounds})
});

app.get('/campgrounds/new', (req,res) => {
    res.locals.title = 'New Campground';
    console.log(req.locals)
    res.render('campgrounds/new')
})

app.post('/campgrounds', async (req,res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground.id}`);
})


app.get('/campgrounds/:id', async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.locals.title = campground.title;
    console.log(campground.title)
    res.render('campgrounds/show', {campground})
})

app.get('/campgrounds/:id/edit', async (req,res) => {
    res.locals.title = 'Edit Campground';
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
})

app.put('/campgrounds/:id', async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground.id}`);
});

app.delete('/campgrounds/:id', async (req,res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});








// app.get('/makecampground', async (req,res) => {
//     const camp = new Campground({
//         title: 'BlackwaterNaturalPromenade',
//         price: "??50",
//         description: "Berries abound!",
//         location: 'Blackwater'

//     });

//     await camp.save();

//     console.log(camp)
    
//     res.send(camp);
// });

