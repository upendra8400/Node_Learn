import express from "express";
import Person from "../model/person.js"
const router = express.Router();

// router.get('/', (req, res) => {
//     res.send("Welcome to my hotel..... How i can help you?,we have list of menus")
// });

//==========================create person data=================
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const NewPerson = new Person(data);
        const response = await NewPerson.save();
        console.log("Data saved");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})



//================= Get method to get the person==================

router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data is here");
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})


//============== Find person data  via work type ======================
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'Chief' || workType == "Manager" || workType == "Waiter") {
            let response = await Person.find({ work: workType });
            console.log("response fetched");
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: "Invalid work Type" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})


//=============== update person to ==================

router.put('/:id', async (req, res) => {
    try {
        const Id = req.params.id;
        const UpdatedData = req.body;
        const response = await Person.findByIdAndUpdate(Id, UpdatedData, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(404).json({ error: "Person not found...!!!!" })
        }
        console.log("response updated");
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})
//============ delete person data=====================
router.delete('/:id', async (req, res) => {
    try {
        const Id = req.params.id;
        const response = await Person.findByIdAndDelete(Id)
        if (!response) {
            return res.status(404).json({ error: "Person not found...!!!!" })
        }
        console.log("Person deleted successfully");
        res.status(200).json({ message: 'Person deleted successfully..!!' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

export default router;