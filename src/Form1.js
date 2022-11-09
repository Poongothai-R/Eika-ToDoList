import './Form1.css';
import React, {useEffect, useState,} from 'react';

const GetItemInput = (props) => {

    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [error,setError] = useState({});
    const [isSubmit,setIsSubmit] = useState('false');

    const submitHandler = (e) => {
        e.preventDefault()
       // if((e.target.itemName.value === "") || (e.target.itemPrice.value === ""))
           setError(formValidate(e));
        setIsSubmit('true');
        props.AddItem(e);
    }
    useEffect(()=>{
        if(Object.keys(error).length === 0 && isSubmit){
            console.log(error);
        }
    },[error]);
      const  formValidate = (e)=>{
        if(e.target.itemName.value === "")
            error.itemName = ("Item Name is Required");
        if (e.target.itemPrice.value === "")
            error.itemPrice = ("Item Price is Required");
        return error;
    };

    return (
        <div className="InputLst">
            <div className="InputLst_header"><h2> Add New Item </h2></div>
            <form className="InputLst_form" onSubmit={submitHandler}>
                <label className="lbl_itm">Item Name: </label>
                <input type="text" value={itemName} id="itemName" placeholder="Enter Item name" onChange={(e) => setItemName(e.target.value)}>
                </input>
                <label className="error"> <br/>{error.itemName}</label>
                <br /> <br />
                <label className="lbl_itm">Item Price: </label>
                <input type="number" value={itemPrice} id="itemPrice" placeholder="Enter Number only" onChange={(e) => setItemPrice(e.target.value)}>
                </input>
                <label className="error"><br/>{error.itemPrice}</label>
                <br /> <br /><div className="btn-save">
                <button className="form_btn" type="submit" id="formButton">save</button></div>
            </form>
        </div>
    )
}

export default GetItemInput;