const express = require('express')
const User = require('../models/user')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


router.get('/', function(req,res,next){
    res.send('<html><body><h1>This is server side page</h1></body></html>')
    
})

router.post('/api/register', async function(req,res,next){
   
    try{
         if(!req.body.username || !req.body.password || !req.body.email|| !req.body.quote)  {
        return res.status(401).json({message:'all fields needs to be filled'})
        
    }


        const newPassword = await bcrypt.hash(req.body.password, 10)
        const userData = await new User({
            name:req.body.username,
            password:newPassword,
            email:req.body.email,
            quote:req.body.quote
        })

        const data = await userData.save()

         return res.json({status:'okk', data:data})
    }catch(err){
        res.json({status:'not okk'})
        throw new Error('invalid credentials')
    }
})



router.post('/api/quote', async function(req,res,next){
    const token= req.headers['x-access-token']
    
    try{
        const user = jwt.verify(token, 'secret12334')
        const email = user.email

        const updatedUser = await User.updateOne({email:email}, {$set:{quote:req.body.quote}})
        console.log(updatedUser)
        return res.json({status:'ok',user:updatedUser})
    }catch(err){
        console.log(err)
        return res.json({status:'not ok'})
    }
})


router.get('/api/quote', async function(req,res,next){
    const user = req.headers['x-access-token']
    
        try{
            const decoded = jwt.verify(user, 'secret12334')
            
            const filteredUser = await User.findOne({email:decoded.email})
            console.log(filteredUser)
            return res.json({status:'ok', quote:filteredUser.quote})
    }catch(err){
            console.log(err)
            return res.json({status:'not ok',error:'status invalid'})
}
})


router.post('/api/login', async function(req,res,next){
    console.log(req.body)

        try{
            const user = await User.findOne({
            
            email:req.body.email
              })

              if(!user) res.status(401).json({message:'bad user authentication'})

              const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

              if(isPasswordValid){
                console.log('ok')

                const token = jwt.sign({
                    name:user.name,
                    email:user.email
                },'secret12334')

                return res.json({status:'ok', user:token})
              }else{console.log('not ok')
                return res.json({status:'not ok'})
              }
    
    }catch(err){
            console.log(err)
        }
// res.send('<html><body><h1>Login page</h1></body></html>')
// res.status({status:"ok"})
})

module.exports = {
    userRouter:router
}