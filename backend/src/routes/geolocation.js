import express from "express"
import axios from "axios"

const router = express.Router()

// Obter localização do serviço
router.get("/location/:address", async (req, res) => {
  const { address } = req.params
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    )
    const location = response.data.results[0].geometry.location
    res.status(200).json(location)
  } catch (err) {
    res.status(500).json({ msg: "Erro ao obter localização" })
  }
})

export default router
