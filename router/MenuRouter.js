import express from "express";
import Menu from "../model/menu.js"
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to the hotel menu")
});

//======================== create menu==========================
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const NewMenu = new Menu(data);
        const response = await NewMenu.save();
        console.log("Data saved");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

// ==================Get method to get the menu=======================

router.get("/", async (req, res) => {
    try {
        const data = await Menu.find();
        console.log("Data is here");
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})


//============== Find manu data  via Taste type ======================
router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'sweet' || tasteType == "spicy" || tasteType == "sour") {
            let response = await Menu.find({ taste: tasteType });
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

//========== update menu from Id=================
router.put('/:id', async (req, res) => {
    try {
        const Id = req.params.id;
        const UpdatedData = req.body;
        const response = await Menu.findByIdAndUpdate(Id, UpdatedData, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(404).json({ error: "Menu not found...!!!!" })
        }
        console.log("response updated");
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})
//============ delete Menu data=====================
router.delete('/:id', async (req, res) => {
    try {
        const Id = req.params.id;
        const response = await Menu.findByIdAndDelete(Id)
        if (!response) {
            return res.status(404).json({ error: "Menu not found...!!!!" })
        }
        console.log("Menu deleted successfully");
        res.status(200).json({ message: 'Menu deleted successfully..!!' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

export default router;