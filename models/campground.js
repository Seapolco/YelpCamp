const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Helps to shorten the code

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
})

module.exports = mongoose.model('Campground', CampgroundSchema);
