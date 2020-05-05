const router = require('express').Router();
const bcrypt=require("bcryptjs")
const Users=require("../user/userModel")
const secret =require("../config/secret")
const jwt=require("jsonwebtoken")
router.post('/register', (req, res) => {
  // implement registration
  const user=req.body
  const hash=bcrypt.hashSync(user.password, 10)
  user.password=hash
  Users.add(user)
  .then(newUser=>{
    user.id=newUser[0]
    delete user.password
    const token=generateToken(user)
    res.status(201).json({user,token})
  })
  .catch(err=>{
    res.status(500).json({message:"cannot register user", err})
  })

});

router.post('/login', (req, res) => {
  // implement login
  const {username,password}=req.body
  Users.find({username})
  .first()
  .then(user=>{
    if(user && bcrypt.compareSync(password,user.password)){
      console.log(user)
      const token=generateToken(user);
      res.status(200).json({username:user.username, token})
    }else{
      res.status(401).json({message:"Invalid credentials"})
    }
  })
  .catch(error=>{
    res.status(500).json({message:"cannot login sorry", error})
  })
});


function generateToken(user){
  const payload={
    userid:user.id,
    username:user.username
  }
  const options={
    expiresIn : "3d"
  }
  const token=jwt.sign(payload,secret.jwtSecret,options)
  return token;
}

module.exports = router;
