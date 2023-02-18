const {FullscreenExitOutlined}=require("@ant-design/icons")
const mongoose=require("mongoose")
const connection=mongoose.connect("mongodb+srv://varinder:varinder@cluster0.mxyblci.mongodb.net/notespsc?retryWrites=true&w=majority")
module.exports={connection}