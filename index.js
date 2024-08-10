const express = require('express');
const app = express();
const client = require("./db")
const cors = require("cors");
const auth = require('./auth');
require('dotenv').config();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.get('/q', auth, async (req, res) => {
    const { lat, long, rad, min, max } = req.query
    if (rad) {
        try {
            await client.connect();
            await client.db("admin").command({ ping: 1 });
            const data = await client.db("sample_restaurants")
                .collection("restaurants")
                .aggregate([
                    {
                        $match: {
                            "address.coord": {
                                $geoWithin: {
                                    $centerSphere: [
                                        [Number.parseFloat(lat), Number.parseFloat(long)], //coordinates will come here
                                        (Number.parseFloat(rad) / 1000) / 6378.1              //radius 
                                    ]
                                }
                            }
                        }
                    }, {
                        $project: {
                            "Name of the Restaurant": "$name",
                            "Location": {
                                $concat: [
                                    "$address.building",
                                    " ",
                                    "$address.street",
                                    ", ",
                                    "$borough", " ",
                                    "$address.zipcode"
                                ]
                            },
                            "Description of restaurant": "$cuisine",
                            "Restaurant": { latitude: { $arrayElemAt: ["$address.coord", 0] }, longitude: { $arrayElemAt: ["$address.coord", 1] } },
                            "Average Rating of the restaurant": { $avg: "$grades.score" },
                            "No of Ratings": { $size: "$grades" },
                            _id: 0
                        }
                    }
                ]).toArray();
            res.status(200).send(data);
        } catch (error) {
            res.status(501).send("Internal Server Error");
        }
        finally {
            await client.close();
        }
    }
    else {
        try {
            client.connect()
            const data = await client.db("sample_restaurants")
                .collection("restaurants")
                .aggregate([
                    {
                        $match: {
                            "$and": [
                                {
                                    "address.coord": {
                                        $geoWithin: {
                                            $centerSphere: [
                                                [Number.parseFloat(lat), Number.parseFloat(long)], //coordinates will come here
                                                (Number.parseFloat(max) / 1000) / 6378.1                //max distance
                                            ]
                                        }
                                    }
                                },
                                {
                                    "address.coord": {
                                        $not: {
                                            $geoWithin: {
                                                $centerSphere: [
                                                    [Number.parseFloat(lat), Number.parseFloat(long)], //coordinates will come here
                                                    (Number.parseFloat(min) / 1000) / 6378.1                      //min distance
                                                ]
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $project: {
                            "Name of the Restaurant": "$name",
                            "Location": {
                                $concat: [
                                    "$address.building",
                                    " ",
                                    "$address.street",
                                    ", ",
                                    "$borough", " ",
                                    "$address.zipcode"
                                ]
                            },
                            "Description of restaurant": "$cuisine",
                            "Restaurant": { latitude: { $arrayElemAt: ["$address.coord", 0] }, longitude: { $arrayElemAt: ["$address.coord", 1] } },
                            "Average Rating of the restaurant": { $avg: "$grades.score" },
                            "No of Ratings": { $size: "$grades" },
                            _id: 0
                        }
                    }
                ])
                .toArray();
            res.status(200).send(data);
        } catch (error) {
            res.status(501).send("Internal Server Error");
        }
        finally{
            await client.close();
        }
    }
})

app.listen(port, () => {
    console.log(`Server Started on https://localhost:${port}`);
})
