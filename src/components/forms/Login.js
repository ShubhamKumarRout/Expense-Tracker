import React,{useEffect} from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';
import './register.css'
import { useSelector,useDispatch } from 'react-redux';
import { startUserLogin } from '../../actions/userActions';

const Login = (props) => {

    const {handleRegisterForm}=props

    const user=useSelector(state=>{
        return state.user
    })
    const dispatch=useDispatch()

    useEffect(()=>{
        if(Object.keys(user.error).length!==0){
            
        }
    },[user])
    
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
            dispatch(startUserLogin(values))
            
        }
    })

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
            <div>

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

        </>
    )
}

export default Login