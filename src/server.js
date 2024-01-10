import express from "express"
import cors from "cors"
import restaurants from "./api/routes/restaurants.route.js"
import social from "./api/routes/social.route.js"
import wishlist from "./api/routes/wishlists.route.js"
import reviews from "./api/routes/reviews.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurants", restaurants)
app.use("/api/v1/social", social)
app.use("/api/v1/wishlists", wishlist)
app.use("/api/v1/reviews", reviews)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app