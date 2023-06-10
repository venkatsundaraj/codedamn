const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const router = require('./routes/userRouter')
const mongoose = require('mongoose')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname,'../', 'client', 'build')))
//served client files

app.use(router.userRouter)
app.use(errorHandler.error)

app.get('*', (req, res,next)=>{
    res.sendFile(path.join(__dirname,'../','client','build','index.html'))
})

mongoose.connect('mongodb+srv://venkateshsundarasan:wZONErsd15CdCK55@user-data.vcawxkl.mongodb.net/user-validation?retryWrites=true&w=majority')
.then(data=>{
    app.listen(PORT,()=>{
        console.log(`server started ${PORT}`)
    })

})
.catch(err=>{
    console.log(err)
})

