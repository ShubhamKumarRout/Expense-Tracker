import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { TextField } from '@material-ui/core';

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

const CategoryModal = (props) => {
    const {open:modalOpen,data,handleCategoryEdit,handlModaleClose}=props
    const [open, setOpen] = React.useState(modalOpen?modalOpen:false);
    const [input,setInput]=React.useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false)
        handlModaleClose()
    }

    React.useEffect(()=>{
        setOpen(modalOpen)
    },[props])

    React.useEffect(()=>{
        setInput(data.categoryName)
    },[data])
    const handleInputChange=(e)=>{
        setInput(e.target.value)    
    }

    const handleUpdate=()=>{
        const formData={...data,categoryName:input}
        handleCategoryEdit(formData)
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
                        {/* <Typography id="spring-modal-title" variant="h6" component="h2">
                            Update Category-name
                        </Typography> */}
                        <TextField
                            id="outlined-basic"
                            label={'Edit Category'}
                            name='budget'
                            variant="outlined"
                            value={input}
                            onChange={handleInputChange}
                        />
                        <div>
                        <button
                        type="button"
                            onClick={handleUpdate}
                            className='btn'>
                                UPDATE
                        </button>
                        <button
                            onClick={handleClose}
                            className='btn'>
                            CANCEL
                        </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default CategoryModal