const express = require('express');
const app = express();
const router = express.Router();
const MenuItem = require('../models/Menuitem');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body


// save the menuitems in the database
router.post('/', async (req,res)=>{
    try {
         //Assuming the request body contains the menuitem data
         const dataitem = req.body;

         // Create a new menuitem document using the Mongoose model
        const newMenuItem = new MenuItem(dataitem);
        
        //save the new menuitem to the database
        const savedMenuitem = await newMenuItem.save();
        console.log("data saved");
        res.status(200).json(savedMenuitem);

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//get the menuitems from the database
router.get('/', async(req,res)=>{
    try {
        const dataitems = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(dataitems);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//get the specified taste data
router.get('/:taste', async(req,res)=>{
    try {
        const tasteType = req.params.taste;
        if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
            const taste = await MenuItem.findOne({taste: tasteType});
            console.log('taste fetched');
            res.status(200).json(taste);
        } else {
            console.log(tasteType)
            res.status(404).json({error : 'Invalid taste Type'+ " " + tasteType});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;