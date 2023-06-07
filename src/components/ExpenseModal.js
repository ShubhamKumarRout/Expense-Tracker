import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';


const Fade = React.forwardRef(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ownerState,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {React.cloneElement(children, { onClick })}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ExpenseModal = (props) => {

    const categoryDetails=useSelector(state=>state.category.data)

    const { open: modalOpen, data, handleChangeForm,handleUpdateForm, handlModaleClose, btnType } = props
    
    const [open, setOpen] = React.useState(modalOpen ? modalOpen : false);
    const [id,setId]=React.useState('')
    const [expenseName, setExpenseName] = React.useState( '')
    const [categoryId, setcategoryId] = React.useState('')
    const [expenseDate, setExpenseDate] = React.useState('')
    const [formError, setFormError] = React.useState({})
    const [amount,setAmount]=React.useState(0)

    const errors = {}

    const amountRegex=/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/

    React.useEffect(() => {
        setOpen(modalOpen)
    }, [modalOpen])

    React.useEffect(() => {
        setId(data._id ? data._id : '')
        setExpenseName(data.expenseName ? data.expenseName : '')
        setcategoryId(data.categoryId ? data.categoryId : '')
        setAmount(data.amount?data.amount:0)
        setExpenseDate(data.expenseDate?data.expenseDate:'')
    }, [data])

    // console.log(id);
  
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        
        setFormError({})
        setExpenseName('')
        setExpenseDate('')
        setAmount(0)
        setOpen(false)
        handlModaleClose()
    }



    const getCategoryName = (id) => {

    }

    const handleExpenseName = (e) => {
        setExpenseName(e.target.value)

    }
    const handleCategoryName = (e) => {
        setcategoryId(e.target.value)

    }
    const handleDateChange=(e)=>{
        setExpenseDate(e.target.value)
    }
    const handleAmount=(e)=>{
        setAmount((e.target.value))
    }

    const validation = () => {
        if (expenseName.trim().length === 0) {
            errors.expenseNameError = 'Expense Name'
        }
        if(categoryId.trim().length ===0){
            errors.categoryIdError = 'Select Category'
        }
        if(expenseDate.trim().length ===0){
            errors.expenseDateError = 'Select Date'
        }
        if(!(amountRegex.test(Number(amount)) && Number(amount) > 0) ){
            console.log('amount error');
            errors.expenseAmountError='Invalid Amount'
        }
        
        setFormError(errors)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        validation()
        if (Object.keys(errors).length === 0) {
            const form = {
                expenseName,
                categoryId,
                expenseDate,    
                amount:Number(amount)
            }
            if(btnType==='add'){
                handleChangeForm(form);
            }
            else{
                handleChangeForm(id,form)
            }
        }
    }



    return (
        <div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="spring-modal-title" variant="h6" component="h2">
                            {btnType === 'add' ? 'Add Expense' : ' Edit Expense'}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <div className='register'>
                                <div style={{ display: 'flex' ,width:'100%'}}>
                                    <div style={{width:'100%'}}>
                                        <div style={{margin:'5px'}}>
                                        <TextField
                                            id="outlined-basic"
                                            label={formError.expenseNameError ? formError.expenseNameError : "Expense Name"}
                                            name='expenseName'
                                            variant="outlined"
                                            value={expenseName}
                                            error={formError.expenseNameError && Boolean(formError.expenseNameError)}
                                            onChange={handleExpenseName}
                                        />
                                        </div>
                                        <div style={{margin:'5px'}}>
                                        <InputLabel id="outlined-basic">{formError.expenseDateError ? <label style={{color:'red'}}>{formError.expenseDateError}</label> : 'Select Date'}</InputLabel>
                                        <TextField  
                                            type='date'
                                            id="outlined-basic"
                                            variant="outlined"
                                            value={expenseDate.slice(0,10)}
                                            error={formError.expenseDateError && Boolean(formError.expenseDateError)}
                                            onChange={handleDateChange}
                                        />
                                        </div>
                                      
                                        
                                    </div>
                                    <div style={{width:'100%'}}>
                                    <div style={{margin:'5px'}}>
                                    <InputLabel id="demo-simple-select-label">{formError.categoryIdError ? <label style={{color:'red'}}>{formError.categoryIdError}</label> : 'Select Category'}</InputLabel>
                                    <Select style={{width:'100%'}}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='expenseName'
                                            value={categoryId}
                                            label={"Category"}
                                            onChange={handleCategoryName}
                                            autoWidth={true}
                                        >
                                        {
                                            categoryDetails.map(category=>{
                                                return (
                                                    <MenuItem key={category._id} value={category._id}>{category.categoryName}</MenuItem>
                                                )
                                            })
                                        }
                                            
                                        </Select>
                                    </div>
                                        <div style={{margin:'5px'}}>
                                        <TextField
                                            id="outlined-basic"
                                            label={formError.expenseAmountError ? formError.expenseAmountError : "Expense Amount"}
                                            name='expensedate'
                                            variant="outlined"
                                            value={amount}
                                            error={formError.expenseAmountError && Boolean(formError.expenseAmountError)}
                                            onChange={handleAmount}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="submit"
                                    value={btnType === 'add' ? 'Add ' : ' Update'}
                                    // onClick={handleUpdate}
                                    className='btn' />

                            </div>

                        </form>

                        <button
                            onClick={handleClose}
                            className='btn'>
                            CANCEL
                        </button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ExpenseModal