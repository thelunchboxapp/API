import express from "express"
import cors from "cors"
import restaurants from "./api/routes/restaurants.route.js"
import social from "./api/routes/social.route.js"
import list from "./api/routes/lists.route.js"
import reviews from "./api/routes/reviews.route.js"
import users from "./api/routes/users.route.js"
import cuisines from "./api/routes/cuisines.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurant", restaurants)
app.use("/api/v1/social", social)
app.use("/api/v1/list", list)
app.use("/api/v1/review", reviews)
app.use("/api/v1/users", users)
app.use("/api/v1/cuisines", cuisines)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app