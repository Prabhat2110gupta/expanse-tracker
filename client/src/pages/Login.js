import React, {useEffect}from 'react'
import {Form,Input,message} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login=()=>{
    const navigate=useNavigate();

    const submitHandler=async(values)=>{
       try {
        const {data}=await axios.post("/users/login",values);
        message.success('login success');
        localStorage.setItem('user',JSON.stringify({...data.user,password:''}));
        navigate('/');
       } catch (error) {
         message.error('something went wrong');
       }
    };
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/');
        }
    },[navigate]);
    return(
        <>
        <div  className="login-page">
        <Form layout="vertical" onFinish={submitHandler}>
            <h1>
             Login Page 
            </h1>
          
            
            <Form.Item label="Email" name="email" >
                
                <Input  type='email'/>
            </Form.Item>
           
            <Form.Item label="Password" name="password" >
                
                <Input type='password'/>
            </Form.Item>
            <div className="d-flex justify-content-btn ">
            <Link to="/register">Not having account ,Click to register
            </Link>
            <button className='btn btn-primary'>Login

            </button>
            </div>
        </Form>
        </div>
        </>

    );
};
export default Login;