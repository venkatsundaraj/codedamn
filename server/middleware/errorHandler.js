const error = function(err, req, res,next){
    const statusCode = res.statusCode ? res.statusCode : 400
    res.status(statusCode)
    console.log(err)

    return res.json({error:err.message})
}

module.exports = {
    error:error
}