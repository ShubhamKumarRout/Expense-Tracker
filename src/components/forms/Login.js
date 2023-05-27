import React,{useEffect,useState} from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';
import './register.css'
import { useSelector,useDispatch } from 'react-redux';
import { startUserLogin } from '../../actions/userActions';


const Login = (props) => {
    const {handleRegisterForm,handleAuth}=props

    const userError=useSelector(state=>{
        return state.user['error']
    })
    const [error,setError]=useState(false)

    const dispatch=useDispatch()

    useEffect(()=>{
        console.log(userError.length);
    },[userError])
    
    const initialValues={
       
        email:'',
        password:''
    }

    const validation=yup.object({
        
        email:yup.string().email().required('Enter email'),
        password:yup.string().min(8).required('Enter password')
    })

    const {values,errors,touched,handleChange,handleSubmit}=useFormik({
        initialValues:initialValues,
        validationSchema:validation,
        onSubmit:(values)=>{
            dispatch(startUserLogin(values,handleAuth,props))
            
        }
    })

    return (
        <div className='register'>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
            <div className='register'>
                
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
                    <p >Don't have an account?</p>
                    <p className='create-acc' onClick={handleRegisterForm}>Create one</p>
                </div>
                <input type='submit' className='btn'/>
                </div>
            </form>

        </div>
    )
}

export default Login