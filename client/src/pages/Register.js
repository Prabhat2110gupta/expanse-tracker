import React,{useEffect} from 'react'
import {Form,Input,message} from 'antd'

import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { message } from 'statuses';

const Register=()=>{
    const navigate=useNavigate();
    const submitHandler=async(values)=>{
        try {
            console.log(values);
          await axios.post('/users/register',values);  
          message.success("Registration Successfull");
          navigate("/login");
        } catch (error) {
             message.error("invalid username or password");
        }
    };
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/');
        }
    },[navigate]);
    return(
        <>
        <div  className="register-page">
        <Form layout="vertical" onFinish={submitHandler}>
            <h1>
              Register Form  
            </h1>
            <Form.Item label="Name" name="name" >
                
                <Input type='text'/>
                </Form.Item>
            <Form.Item label="Email" name="email" >
                
                <Input  type='email'/>
            </Form.Item>
           
            <Form.Item label="Password" name="password" >
                
                <Input type='password'/>
            </Form.Item>
            <div className="d-flex justify-content-btn ">
            <Link to="/login">Already Register Click here to login
            </Link>
            <button className='btn btn-primary'>Register

            </button>
            </div>
        </Form>
        </div>
        </>

    );
};
export default Register;