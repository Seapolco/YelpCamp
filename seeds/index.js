const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require("./seedHelpers");
const Campground = require('../models/campground');

const axios = require('axios').default;

async function seedImg() {
    try {
      const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'Xhlcl9br6E9tpQYkg975b26b2SdK1WsjJdsTbzsT9yk',
          collections: 483251,
        },
      })
      return resp.data.urls.small
    } catch (err) {
      console.error(err)
    }
  }


mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection; // Helps to shorten the code.
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Databased connected!");
})

//array[Math.floor(Math.random() * array.length)];

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 20; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: await seedImg(),
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur officia omnis ratione, similique odio quia amet asperiores nam sequi quaerat saepe sit rerum mollitia placeat? Distinctio itaque ipsum quidem necessitatibus?",
            price
        })
        await camp.save();
    }
    
};


seedDB().then(() => {
    
    console.log("Database seeded!")
    mongoose.connection.close();

})

