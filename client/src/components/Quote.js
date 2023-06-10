import React, { useEffect, useState } from 'react'
import {useJwt, decodeToken, isExpired} from 'react-jwt'
import  {useNavigate} from 'react-router-dom'

const Dashboard = function(){
    const [quote, setQuote] = useState('')
    const [modifiedQuote, setModifiedQuote] = useState('')
    const token = localStorage.getItem('token')
    const history = useNavigate()
    
    const quoteChangeHandler = function(e){
        setModifiedQuote(e.target.value)
    }

    const formSubmitHandler = async function(e){
        e.preventDefault()
        const user = await fetch('https://mern-traversy-venkat.onrender.com/api/quote',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'x-access-token':localStorage.getItem('token')
            },
            body:JSON.stringify({
                quote:modifiedQuote
            })

        })

        const data = await user.json()
        if(data.status === 'ok'){
            setQuote(modifiedQuote)
        }
    }

    const populatState = async function(){
        const data = await fetch('https://mern-traversy-venkat.onrender.com/api/quote',{
            headers: {
                'x-access-token':localStorage.getItem('token')
            }   
        })

        const userData = await data.json()
        
        if(userData.status==='ok'){
            setQuote(userData.quote)
        }
    }
    
    useEffect(()=>{
        
        if(token){
            
            const user = decodeToken(token)
            if(!user){
                localStorage.removeItem('token')
                history.replace('/login')
            }else{
                populatState()
            }
        }
    },[])
    return (
        <div>
            <h1>Your quote: {quote|| 'No quote found'}</h1>
            <form onSubmit={formSubmitHandler}>
                <input type='text' onChange={quoteChangeHandler}/>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default Dashboard