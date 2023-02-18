const express=require("express")
const {NotesModel}=require("../models/Notes.model")
const notesRouter=express.Router()

notesRouter.post("/create",async(req,res) =>
{
    const note=req.body
    const newnote=new NotesModel(note)
    await newnote.save()
    res.send({"msg":"created"})
})
notesRouter.get("/",async(req,res) =>
{
    const notes= await NotesModel.find()
    res.send(notes)
})
notesRouter.patch("/update/:id",async(req,res) =>
{
    const Id = req.params.id;
    const data = req.body;
    const note=await NotesModel.findOne({_id: Id});
    const userID=note.userID
    const userID_request=req.body.userID
    
    console.log(userID);
    try {
      if (userID_request !== userID) {
        res.send({ msg: "you are not authorized" });
      } else {
        let update = await NotesModel.findByIdAndUpdate({ _id: Id }, data);
        console.log(update);
        res.send(`updated data ${Id}`);
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
})
notesRouter.delete("/delete/:id",async(req,res) =>
{
    const Id = req.params.id;
    const note=await NotesModel.findOne({_id: Id});
    const userID_in_note=note.userID
    const userID_request=req.body.userID
    
    //console.log(userID);
    try {
      if (userID_request !== userID_in_note) {
        res.send({ msg: "you are not authorized" });
      } else {
        let update = await NotesModel.findByIdAndDelete({ _id: Id });
        console.log(update);
        res.send(`Deleted data ${Id}`);
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
})

module.exports={notesRouter}