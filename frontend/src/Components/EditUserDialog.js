import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { updateUser } from '../validationSchema/updateUser';
import Cookie from 'js-cookie'


export default function EditProfile({ setOpenEditDialog, loggedInUser }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        handleClickOpen()
    }, [])

    const initialData = loggedInUser

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpenEditDialog(false)
        setOpen(false);
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialData,
        validationSchema: updateUser,
        onSubmit: (value, action) => {
            action.resetForm()
            const guidelines = value.guidelines.split(',')
            const images = value.images.split(',')
            value = { ...value, guidelines, images }
            handleClose()
            updateData(value)
        }
    })

    const updateData = async (values) => {
        const result = await fetch(`user/update/${loggedInUser._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        if (result.status === 200) {
            Cookie.set('loggedInUser', JSON.parse(result))
        } else {
            alert("some problem in your way")
        }
    }

    return (
        <div>
            <Dialog open={open} fullWidth maxWidth="lg">
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit your Personal Details
                        </DialogContentText>

                        <TextField //name
                            autoComplete='off'
                            margin="dense"
                            onChange={handleChange}
                            id="firstName"
                            name="firstName"
                            value={values.firstName}
                            label="First Name"
                            fullWidth
                            size='small'
                            onBlur={handleBlur}
                            helperText={touched.firstName && errors.firstName ? errors.firstName : null}
                        />
                        <TextField //name
                            autoComplete='off'
                            margin="dense"
                            onChange={handleChange}
                            id="lastName"
                            name="lastName"
                            value={values.lastName}
                            label="Last Name"
                            fullWidth
                            size='small'
                            onBlur={handleBlur}
                            helperText={touched.lastName && errors.lastName ? errors.lastName : null}
                        />
                        <TextField //name
                            autoComplete='off'
                            margin="dense"
                            onChange={handleChange}
                            id="email"
                            name="email"
                            value={values.email}
                            label="Email"
                            fullWidth
                            size='small'
                            onBlur={handleBlur}
                            helperText={touched.email && errors.email ? errors.email : null}
                        />
                        <TextField //name
                            autoComplete='off'
                            margin="dense"
                            onChange={handleChange}
                            id="address"
                            name="address"
                            value={values.address}
                            label="Address"
                            fullWidth
                            size='small'
                            onBlur={handleBlur}
                            helperText={touched.address && errors.address ? errors.address : null}
                        />
                        <TextField //name
                            autoComplete='off'
                            margin="dense"
                            onChange={handleChange}
                            id="phoneNo"
                            name="phoneNo"
                            value={values.phoneNo}
                            label="Phone Number"
                            fullWidth
                            size='small'
                            onBlur={handleBlur}
                            helperText={touched.phoneNo && errors.phoneNo ? errors.phoneNo : null}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Apply Changes</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
