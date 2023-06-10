import React,{useState} from "react"
import { useNavigate } from "react-router-dom"


const Register = function(){
    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue]= useState('')
    const [quoteValue, setQuoteValue] = useState('')
    const history = useNavigate()

    const nameChangeHandler = function(e){
        
        setNameValue(e.target.value)
    }

    const emailChangeHandler = function(e){
        setEmailValue(e.target.value)
    }

    const passwordChangeHandler = function(e){
        setPasswordValue(e.target.value)
    }
    const quoteChangeHandler = function(e){
        setQuoteValue(e.target.value)
    }

    const formSubmitHandler = async function(e){
        e.preventDefault()
        const user = await fetch('https://mern-traversy-venkat.onrender.com/api/register',{
            method:'POST', 
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:nameValue,
                password:passwordValue,
                email:emailValue,
                quote:quoteValue
            })
        })

        const data = await user.json()
        console.log(data)
        if(data.status==='okk'){
            history('/login')
        }
    }


    return(
        <form onSubmit={formSubmitHandler}>
            <label htmlFor="username">Username</label>
            <input id="username" type='text' onChange={nameChangeHandler} />
            <label htmlFor="email">Email</label>
            <input id="email" type='text' onChange={emailChangeHandler} />
            <label htmlFor="password">Password</label>
            <input id="pssword" type='text' onChange={passwordChangeHandler} />
            <label htmlFor="quote">Quote</label>
            <input id="quote" type='text' onChange={quoteChangeHandler} />
            <button type="submit">Register</button>
        </form>
    )
}

export default Register