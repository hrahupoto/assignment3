const usermodel = require('../models/insertUser')

exports.insertUser=function (req,res){
const user = new usermodel(req.query)
user.save((err,userBalance)=> {
    if(err){
      return res.status(400).json({
        error:"Some thing went wrong"
      })
    }
    res.json({userBalance})
  })
}