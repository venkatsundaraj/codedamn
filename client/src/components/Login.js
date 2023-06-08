import React,{useState} from "react"
import { useNavigate } from "react-router-dom"


const Register = function(){
    
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue]= useState('')
    const history = useNavigate()
    

    const emailChangeHandler = function(e){
        setEmailValue(e.target.value)
    }

    const passwordChangeHandler = function(e){
        setPasswordValue(e.target.value)
    }

    const formSubmitHandler = async function(e){
        e.preventDefault()
        
        const user = await fetch('http://localhost:1337/api/login',{
            method:'POST', 
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                 password:passwordValue,
                email:emailValue
            })
        })

        const data = await user.json()
        console.log(data)
        if(data.status === 'ok'){
            localStorage.setItem('token', data.user)
            alert('Login successful')
            history('/quote')
        }else{
            alert('Kindly check the email and password')
        }
    }


    return(
        <form onSubmit={formSubmitHandler}>
            <label htmlFor="email">Email</label>
            <input id="email" type='text' onChange={emailChangeHandler} />
            <label htmlFor="password">Password</label>
            <input id="pssword" type='text' onChange={passwordChangeHandler} />
            <button type="submit">Login</button>
        </form>
    )
}

export default Register