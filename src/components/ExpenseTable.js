import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryDetails } from '../actions/categoryActions';
import ExpenseModal from './ExpenseModal';
import { deleteExpense, updateExpense } from '../actions/expenseActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faArchive } from '@fortawesome/free-solid-svg-icons';
const ExpenseTable = (props) => {

    const { title,rows,archiveBtn } = props

    const categoryStore = useSelector(state => {
        return state.category.data
    })

    const [open, setOpen] = React.useState(false)
    const [expenseData, setExpenseData] = React.useState({})
    const [categories, setCategories] = React.useState([])

    const dispatch = useDispatch()
    // const categoryIsLoading = useSelector(state => state.category.isLoading)
    

    const handleModalOpen=(row)=>{
        setExpenseData(row);
        setOpen(!open)
    }
    const handlModaleClose = () => {
        setExpenseData({})
        setOpen(false)
       
    }
    const handleUpdateForm = (id,form) => {
        dispatch(updateExpense(id,form,handlModaleClose))
    }
    
    const handleArchive = (ele) => {
        let confirm
        if(archiveBtn){
             confirm=window.confirm(`are you sure want to restore ${ele.expenseName} ?` )
        }
        else{
             confirm=window.confirm(`are you sure want to archive ${ele.expenseName} ?` )
        }
        
        if(confirm){
            const form={
                isDeleted:!ele.isDeleted
            }
            dispatch(updateExpense(ele._id,form,handlModaleClose))
        }
    }

    const handleDelete=(ele)=>{
        const confirm=window.confirm(`are you sure want to delete ${ele.expenseName} ?` )
        if(confirm){
            dispatch(deleteExpense(ele._id))
        }
    }
    

    //AS view page renders faster than store, so need to do conditional rendering. you can't
    //do rendering directly by getting value from redux store. You have to do it through state
    React.useEffect(() => {
        setCategories(categoryStore)
    }, [categoryStore])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const handleEdit = (id) => {
    //     console.log(id);
    // }
   

    const getCategoryName = (categoryId) => {
        const category = categories.find(category => category._id === categoryId)
        return category.categoryName


    }
    return (
        <>

            <>
                <ExpenseModal
                    open={open}
                    data={expenseData}
                    handleChangeForm={handleUpdateForm}
                    handlModaleClose={handlModaleClose}
                    btnType='update'
                />

                {categories.length === 0 ? '...' :
                    <Paper sx={{ width: '100%' }}>
                    
                        <TableContainer sx={{ maxHeight: 440 }}>
                        {title && 
                        <div style={{display:'flex', justifyContent:'center'}}>
                        <h2>{title}</h2>
                        </div>}
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    
                                    <TableRow>
                                        <TableCell>Category Name</TableCell>
                                        <TableCell>item Name</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Expense Date</TableCell>
                                        <TableCell>Actions</TableCell>

                                    </TableRow>

                                </TableHead>
                                {categories.length > 0 &&
                                    <TableBody>
                                        {rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (

                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                        <TableCell>{getCategoryName(row.categoryId)}</TableCell>
                                                        <TableCell>{row.expenseName}</TableCell>
                                                        <TableCell>{row.amount}</TableCell>
                                                        <TableCell>{row.expenseDate.slice(0,10)}</TableCell>
                                                        <TableCell>
                                                            <div style={{ display: 'flex' }}>
                                                            {
                                                                archiveBtn ?
                                                                
                                                                <Grid onClick={() => { handleArchive(row) }} container sx={{color: 'green',cursor:'pointer'}}>
                                                                    <Grid item xs={4}>
                                                                    <FontAwesomeIcon icon={faArchive} />
                                                                    </Grid>
                                                                </Grid>
                                                                :
                                                                <Grid onClick={() => { handleModalOpen(row)}} container sx={{ color: 'blue' }} style={{ cursor: 'pointer' }}>
                                                                    <Grid item xs={4}>
                                                                        <EditIcon />
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                                
                                                                {
                                                                    archiveBtn?
                                                                    <Grid onClick={() => { handleDelete(row) }} container sx={{ color: 'red' }} style={{ cursor: 'pointer' }}>
                                                                    <Grid item xs={4}>
                                                                        <DeleteIcon />
                                                                    </Grid>
                                                                </Grid>
                                                                :
                                                                <Grid onClick={() => { handleArchive(row) }} container sx={{ color: 'red' }} style={{ cursor: 'pointer' }}>
                                                                    <Grid item xs={4}>
                                                                        <DeleteIcon />
                                                                    </Grid>
                                                                </Grid>
                                                                }
                                                            </div>
                                                        </TableCell>

                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>}
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 15, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                }
            </>


        </>

    );
}

export default ExpenseTable