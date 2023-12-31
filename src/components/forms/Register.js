import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';
import './register.css'
import { useDispatch } from 'react-redux';
import { startRegisterUser } from '../../actions/userActions';

const Register = (props) => {

    const {handleLogInForm}=props

    const dispatch=useDispatch()

    const initialValues={
        name:'',
        email:'',
        password:''
    }

    const validation=yup.object({
        name:yup.string().required('Enter your name'),
        email:yup.string().email().required('Enter email'),
        password:yup.string().min(8).required('Enter password')
    })

    const {values,errors,touched,handleChange,handleSubmit}=useFormik({
        initialValues:initialValues,
        validationSchema:validation,
        onSubmit:(values)=>{
            dispatch(startRegisterUser(values,props))
            
        }
    })

    return (
        <div className='register'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
            <div className='register' >

            
                <TextField
                    id="outlined-basic"
                    label={touched.name && errors.name?touched.name && errors.name:"User Name"}
                    variant="outlined"
                    name='name'
                    value={values.name}
                    error={touched.name && Boolean(errors.name)}
                    // helperText={touched.name && errors.name}
                    onChange={handleChange}
                />
                <TextField
                    id="outlined-basic"
                    label={touched.email && errors.email?touched.email && errors.email:"Email"}
                    name='email'
                    variant="outlined"
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    // helperText={touched.email && errors.email}
                    onChange={handleChange}
                />
                <TextField
                    id="outlined-basic"
                    label={touched.password && errors.password?touched.password && errors.password:"Password"}
                    name='password'
                    variant="outlined"
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    // helperText={touched.password && errors.password}
                    onChange={handleChange}
                />
                
                <div className='paragraph'>
                    <p >Have an account?</p>
                    <p className='create-acc' onClick={handleLogInForm}>Log in</p>
                </div>
                <input type='submit' className='btn'/>
                </div>
            </form>

        </div>
    )
}

export default Register