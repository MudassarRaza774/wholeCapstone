import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import HashLoader from 'react-spinners/HashLoader'
//i want to see only those items which belongs to the current logged in user

function Cart({ setCartCount }) {
    const [cartItems, setCartItems] = useState('')
    const [spinner, setSpinner] = useState(false)
    const [reload, setReload] = useState(true)
    const rawUserName = sessionStorage.getItem("loggedInUser")
    const userName = JSON.parse(rawUserName)
    useEffect(() => {
        setSpinner(true)
        fetch(`cart/items/${userName}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setSpinner(false)
                    setCartItems(data)
                }
            })
    }, [reload])

    setCartCount(cartItems.length)

    const removeItem = (id) => {
        setSpinner(true)
        fetch(`cart/deleteItem/${id}`, {
            method: "DELETE",
        })
            .then(data => {
                setSpinner(false)
                reload ? setReload(false) : setReload(true)
            })

    }
    return (
        <div>
            {
                spinner ? <HashLoader size={40} color="black" speedMultiplier={2} style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%"
                }} /> :
                    cartItems.length === 0 ? <p>You should add something to cart first</p> : cartItems === "user not login" ?
                        <p>You should have login first</p> : cartItems.map((values, index) => {
                            return (
                                <div key={index} style={{ padding: "5px", margin: "5px", backgroundColor: "#e0e0e0", display: "flex", justifyContent: "space-between" }} >
                                    <div style={{ display: "flex" }}>
                                        <img src={values.productImage[0]} alt="cloth" height='80px' width='80px' />
                                        &nbsp;
                                        <p>
                                            Name: {values.productName} &nbsp;
                                            Price: {values.productPrice}&nbsp;
                                            Color: {values.color}&nbsp;
                                            Size: {values.size}
                                        </p>
                                    </div>
                                    <div>
                                        <Button id={values._id} variant='contained' size='small' onClick={(e) => removeItem(e.target.id)}>remove</Button>
                                    </div>

                                </div>
                            )
                        })
            }
        </div>
    )
}

export default Cart