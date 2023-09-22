const express = require("express")
const {findAdmin, updateAdminToken, products} = require("../helpers/mysql")

const router = express.Router()
const generateToken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
}
router.post("/login", async (req, res) => {
    const {username , password} = req.body
    const token = generateToken()
    const admin = await findAdmin({username, password})

    if (admin.length === 0) {
        res.status(401).json({message: "Неверный логин или пароль"})
        return
    }

    await updateAdminToken({username, token})

    res.json({message: "Вы успешно авторизовались", token})

})


router.post("/products", async (req, res) => {
    const {name, description, price} = req.body
    const product = await products({name, description, price})
    res.json({message: "Вы успешно добавили товар", product})
})

router.delete("/products/:id", async (req, res) => {
    const {id} = req.params
    const product = await products({id})
    res.json({message: "Вы успешно удалили товар", product})
})

router.put("/products/:id", async (req, res) => {
    const {id} = req.params
    const product = await products({id})
    res.json({message: "Вы успешно обновили товар", product})
})

module.exports = router