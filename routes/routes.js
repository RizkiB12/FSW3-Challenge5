const express = require("express");
const router = express.Router();
const fs = require("fs");
const { Car } = require("../models/index");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const dataPath = './cars.json';


const saveCarData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData);
}
const getCarData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
}

const carRoute = require('./car.js');
router.use(carRoute);

carRoute.post("/cars", async (req, res) => {
    if (req.body.ukuran === "Small") {
        req.body.type = "Home Car";
    } else if (req.body.ukuran === "Medium") {
        req.body.type = "Rare Car";
    } else if (req.body.ukuran === "Large") {
        req.body.type = "SUV";
    }
    await Car.create({
        name: req.body.nama,
        type: req.body.type,
        price: req.body.harga,
        image: req.body.gambar,
        size: req.body.ukuran,
        createdAt: new Date(),
        updatedAt: new Date(),
      })    

    res.redirect("/cars/list");
});

carRoute.get('/cars/list', async (req, res) => {
    const data = await Car.findAll();
    const cars = JSON.parse(JSON.stringify(data));
    let newCars = cars.map((car) => {
        let day = new Date(car.updatedAt).getDay();
        let month = months[new Date(car.updatedAt).getMonth()];
        let year = new Date(car.updatedAt).getFullYear();
        let hour = new Date(car.updatedAt).getHours();
        let minute = new Date(car.updatedAt).getMinutes();
        return { ...car, day, month, year, hour, minute };
      });
    
    res.render('cars', { layout: 'layouts/app', newCars });

});

carRoute.get("/cars/add", (req, res) => {
    res.render('addNewCar', { layout: 'layouts/app'});
});


carRoute.get('/cars/edit/:id', async (req, res) => {
    const car = await Car.findByPk(req.params.id);
    res.render('editCar', { layout: 'layouts/app', car });
});


carRoute.put("/cars/update/:id", async (req, res) => {
    if (req.body.ukuran === "Small") {
        req.body.type = "Home Car";
    } else if (req.body.ukuran === "Medium") {
        req.body.type = "Rare Car";
    } else if (req.body.ukuran === "Large") {
        req.body.type = "SUV";
    }
    const car = await Car.findByPk(req.params.id);
    await car.update({
        name: req.body.nama,
        type: req.body.type,
        price: req.body.harga,
        image: req.body.gambar,
        size: req.body.ukuran,
        createdAt: car.createdAt,
        updatedAt: new Date(),
        })

    res.redirect("/cars/list"); 
   
});

carRoute.delete("/cars/delete/:id", async (req, res) => {
   await Car.destroy({
         where: {
                id: req.params.id
            }
        });
        res.redirect('/cars/list');
});

carRoute.get("/test", (req, res) => {
    const cars = getCarData();
    const arrayCars = Object.values(cars)
    res.render('cars', { layout: 'layouts/app', arrayCars: arrayCars });
});




module.exports = router;


