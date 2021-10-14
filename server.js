const express =require("express");
const multer = require("multer");

const app = express();

const fileStorageEngine = multer.diskStorage({
    distination : (req,file,cb)=>{
      cb(null,);
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() +"--"+ file.originalname);
    }
});
const upload = multer({
    storage:fileStorageEngine
});
//For single file Upload
app.post("/single",upload.single("image"),(req,res)=>{
    console.log(req.file);
    res.send("Single FILE upload Success");
});
//for Multiple file Upload
app.post ("/multiple",upload.array('images',3),(req,res)=>{
    console.log(req.files);
    res.send("Multiple File upload Success");
});
app.listen(3000);