const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
// const Person = require('./models/person');
// const MenuItem = require('./models/Menuitem');

app.get('/', function(req,res)
{
    res.send("welcome to the node js server")
})

app.get('/employee',function(req,res)
{
    var employee_details = {
        name: "Ankit Sharma",
        company: "consolebit",
        emp_id : 101,
        working_status : true,
    }

    res.send(employee_details)
})

// app.post('/person',async (req,res)=>
// {
//     //this one is the old method where callbacks is used now a days we move on asyn and await.

//     //Assuming the request body contains the person data 
//     // const data = req.body

//     // Create a new Person document using the Mongoose model
//     // const newPerson = new Person(data);

//      //save the new person to the database
//     // newPerson.save((error, savedPerson)=>{
//     //     if(error){
//     //         console.log('Error saving person:',error);
//     //         res.status(500).json({error: 'Internal server error'})
//     //     }else{
//     //         console.log('data saved successfully');
//     //         res.status(200).json(savedPerson);
//     //     }

//     try {
//          //Assuming the request body contains the person data
//         const data = req.body;

//         // Create a new Person document using the Mongoose model
//         const newPerson = new Person(data);

//         //save the new person to the database
//         const savedPerson = await newPerson.save();
//         console.log("data saved");
//         res.status(200).json(savedPerson);
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// //get the person data
// app.get('/person', async (req,res)=>{
//     try {
//         const data = await Person.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// // save the menuitems in the database
// app.post('/menuitem', async (req,res)=>{
//     try {
//          //Assuming the request body contains the menuitem data
//          const dataitem = req.body;

//          // Create a new menuitem document using the Mongoose model
//         const newMenuItem = new MenuItem(dataitem);
        
//         //save the new menuitem to the database
//         const savedMenuitem = await newMenuItem.save();
//         console.log("data saved");
//         res.status(200).json(savedMenuitem);

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// //get the menuitems from the database
// app.get('/menuitem', async(req,res)=>{
//     try {
//         const dataitems = await MenuItem.find();
//         console.log('data fetched');
//         res.status(200).json(dataitems);
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// //get the specified work person data
// app.get("/person/:workType", async(req,res)=>
// {
//     try {
//         const workType = req.params.workType; // extract the work type from the URL parameter
//         if (workType == "chef" || workType == "waiter" || workType == "manager") {
//             const work = await Person.findOne({work: workType});
//             console.log('work fetched');
//             res.status(200).json(work);
//         } else {
//             console.log(workType)
//             res.status(404).json({error : 'Invalid Work Type'+ " " + workType});
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// import the router files
const personRoutes = require('./routes/personRoutes');

// use the routers
app.use('/person',personRoutes);

// import the router files
const menuitemRoutes = require('./routes/menuitemRoutes');
// use the routers
app.use('/menuitem', menuitemRoutes);


app.listen(3000,()=>{
    console.log("listening on port 3000")
})