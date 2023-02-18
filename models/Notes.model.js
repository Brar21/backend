const mongoose=require("mongoose")

const notesSchema=mongoose.Schema({
    title: String,
    body: String,
    user:String
})

const NotesModel=mongoose.model("note",notesSchema)
module.exports={NotesModel}