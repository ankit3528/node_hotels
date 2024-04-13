const express = require('express');
const app = express();
const router = express.Router();
const Person = require('../models/person');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body


router.post('/',async (req,res)=>
{
    try {
         //Assuming the request body contains the person data
        const data = req.body;

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //save the new person to the database
        const savedPerson = await newPerson.save();
        console.log("data saved");
        res.status(200).json(savedPerson);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//get the person data
router.get('/', async (req,res)=>{
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//get the specified work person data
router.get("/:workType", async(req,res)=>
{
    try {
        const workType = req.params.workType; // extract the work type from the URL parameter
        if (workType == "chef" || workType == "waiter" || workType == "manager") {
            const work = await Person.findOne({work: workType});
            console.log('work fetched');
            res.status(200).json(work);
        } else {
            console.log(workType)
            res.status(404).json({error : 'Invalid Work Type'+ " " + workType});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//Update the specified person data
router.put("/:id", async(req,res)=>{
    try {
        const personId = req.params.id; //Extract the id from the URL parameter
        const updatedPersonData = req.body; //updated data for the person
    
        const newsavedPersonData = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true, //return the updated document
            runValidators: true, //run Mongoose validation
        })
        
        if(!newsavedPersonData)
        {
            return res.status(404).json({error: 'Person not Found'});
        }

        console.log("data updated");
        res.status(200).json(newsavedPersonData);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//delete the specified person data
router.delete("/:id", async(req, res)=>{
    try {
        const personId = req.params.id; //Extract the id from the URL parameter
        
        //assuming you have a Person model
        const removePersonData = await Person.findByIdAndDelete(personId);
        if(!removePersonData)
        {
            return res.status(404).json({error: 'Person not Found'});

        }

        console.log("data deleted");
        res.status(200).json({message: 'Person Deleted Successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'});
    }
})
module.exports = router;