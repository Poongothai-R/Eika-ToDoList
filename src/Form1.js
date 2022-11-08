import './Form1.css';
import React, { useState, } from 'react';

const GetItemInput = (props) => {

    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        props.AddItem(e);
    }


    return (
        <div className="InputLst">
            <div className="InputLst_header"><h2> Add New Item </h2></div>
            <form className="InputLst_form" onSubmit={submitHandler}>
                <label className="lbl_itm">Item Name: </label>
                <input type="text" value={itemName} id="itemName" placeholder="Enter Item name" onChange={(e) => setItemName(e.target.value)}>
                </input>
                <br /> <br />
                <label className="lbl_itm">Item Price: </label>
                <input type="number" value={itemPrice} id="itemPrice" placeholder="Enter Number only" onChange={(e) => setItemPrice(e.target.value)}>
                </input>
                <br /> <br /><div className="btn-save">
                <button className="form_btn" type="submit" id="formButton">save</button></div>
            </form>
        </div>
    )
}

export default GetItemInput;