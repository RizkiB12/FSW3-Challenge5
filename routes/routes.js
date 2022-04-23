const express = require("express");
const router = express.Router();
const fs = require("fs");

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

carRoute.post("/cars", (req, res) => {

    var existCar = getCarData();
    const newCarId = Math.floor(100000 + Math.random() * 900000);

    existCar[newCarId] = req.body;

    saveCarData(existCar);
    res.send(req.body);
});

carRoute.get('/cars/list', (req, res) => {
    const cars = getCarData();
    
    const arrayCars = Object.values(cars)
    res.render('cars', { layout: 'layouts/app', arrayCars: arrayCars });

});

carRoute.get("/cars/add", (req, res) => {
    res.render('addNewCar', { layout: 'layouts/app'});
});


carRoute.get('/cars/edit', (req, res) => {
    res.render('editCar', { layout: 'layouts/app'});
});

carRoute.get("/cars/:id", (req, res) => {
    const cars = getCarData();
    const car = cars[req.params.id];
    res.send(car);
});

carRoute.put("/cars/update/:id", (req, res) => {
    var existCar = getCarData();
    fs.readFile(dataPath, 'utf8',(err, data) => {
        const carId = req.params['id'];
        existCar[carId] = req.body;
        saveCarData(existCar);
        res.send(`cars with id ${carId} has been updated`)
        },true);
});

carRoute.delete("/cars/delete/:id", (req, res) => {
    fs.readFile(dataPath, 'utf8',(err, data) => {
        var existCar = getCarData();
        const carId = req.params.id;
        delete existCar[carId];
        saveCarData(existCar);
        res.send(`cars with id ${carId} has been deleted`)
        },true);
});

carRoute.get("/test", (req, res) => {
    const cars = getCarData();
    const arrayCars = Object.values(cars)
    res.render('cars', { layout: 'layouts/app', arrayCars: arrayCars });
});




module.exports = router;


