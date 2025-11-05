const express = require('express');
const app = express();

const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const PORT = 3001;

db.sequelize.sync()
    .then((result) => {
  
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    });

    app.post('/hotel', async (req, res) => {
        const data = req.body;
        try {
            const hotel = await db.hotel.create(data);
            res.send(hotel);
        } catch (error) {
           res.status(500).send({message: error.message});
        }
    });

 