const mongoose = require('mongoose');
const cities = require('./cities');
const {places , descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camp-safari', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error! :-/"));
db.once("open", () => {
    console.log("Database connected :-)");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) { 
        const random300 = Math.floor(Math.random() * 300);
        const price = Math.floor(Math.random() * 2500) + 10;
        const camp = new Campground({
            author : '64f9c5aefa985ed8a01ee757',
            location: `${cities[random300].city}, ${cities[random300].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae excepturi ex minus quia quaerat numquam delectus soluta. Eligendi, maiores doloremque ratione nobis numquam veniam magnam, porro accusamus aspernatur repellat consectetur.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [ 
                    cities[random300].longitude,
                    cities[random300].latitude,
                 ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dl87o0tbc/image/upload/v1693748391/CampSafari/pflw8y8libjgwlwc2t5a.jpg',
                  filename: 'CampSafari/pflw8y8libjgwlwc2t5a',
                },
                {
                  url: 'https://res.cloudinary.com/dl87o0tbc/image/upload/v1693748393/CampSafari/tkdx4lu81qczwlfcakqk.jpg',
                  filename: 'CampSafari/tkdx4lu81qczwlfcakqk',
                }
              ],
            
        })
        await camp.save();
    }
}

// 64edb8e79dae301af868f8cc(old user id of parveen)
seedDB().then(() => {
    mongoose.connection.close();
});