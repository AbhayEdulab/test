const express =require('express')
const multer = require('multer')
const ejs= require('ejs')
const path = require('path')


 
const app = express()
const port = 3000 
app.set('view engine','ejs')
app.use(express.static("./image"))

const storage = multer.diskStorage({
    destination:'./image/upload/',
    filename :function(req ,file, cb){
        cb(null,file.fieldname+'-'+ Date.now() +
        path.extname(file.originalname))
    }
})

const upload= multer({  
    storage :storage,
    limits:{fileSize:100000000},
    fileFilter: function(req,file ,cb){
        checkFileType(file, cb);
    }
}).single('myimage')

function checkFileType(file , cb){
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype); 

    if(mimetype && extname){
        return cb(null,true);
    }else{
      if(req.file == undefined){
          res.render('index',{
              msg: 'Error : No File Selected!'
            
          })

      }
      else{
        res.render('index',{
            msg: 'File Uploaded !',
           file:`Upload / ${req.file.filename}` 
        })
      }
    }
}




app.get ('/',(req,res)=>{
res.render('index')
})

app.post('/upload',(req,res)=>{
    upload(req, res, (err)=>{
        if(err){
            res.render('index',{
                msg:err
            })
        }else{
            console.log(req.file);
            res.send('test');
        }
    })
})
app.listen(port,()=>
{
    console.log(`Server started on port ${port}`)
})