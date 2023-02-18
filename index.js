const express=require("express")
const {connection}=require("./db")
const {Router}=require("./Routes/routes")
const {notesRouter}=require("./Routes/notes.routes")
const {authenticate}=require("./middleware/authenticate")
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors({origin:'*'}))
app.get("/",(req,res) =>
{
    res.send("Welcome Homepage")
})
app.use("/user",Router)
app.use(authenticate)
app.use("/notes",notesRouter)

app.listen(8080,async () =>
{
    try
    {
        await connection
        console.log("Server is running at port 8080")
    } catch(err)
    {
        console.log({"error":err.message})
    }
})