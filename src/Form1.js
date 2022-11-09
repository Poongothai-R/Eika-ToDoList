import './Form1.css';
import React, {useState,} from 'react';

const GetItemInput = (props) => {

    let checkData = props.checkData;

    let duplicateData = checkData.map((name) => {
        return name.name.toUpperCase();
    });
    // console.log(duplicateData);


    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [error, setError] = useState({});
    const [isSubmit, setIsSubmit] = useState('false');

    const submitHandler = (e) => {
        e.preventDefault();

        let itmName = null;
        let itmPrice = null;
        let chkData = null;

        setError({
            itemName: null,
            itemPrice: null,
            checkData: null
        });

        if (e.target.itemName.value === "" || e.target.itemPrice.value === "") {
            if (e.target.itemName.value === "") itmName = "Item Name is Required";
            if (e.target.itemPrice.value === "") itmPrice = "Item Price is Required";

        } else if (duplicateData.includes(e.target.itemName.value.toString().toUpperCase()))
            chkData = "Item already exists in the list";
        else props.AddItem(e);


        setError({
            itemName: itmName,
            itemPrice: itmPrice,
            checkData: chkData
        });

        setIsSubmit('true');

    }

    if(isSubmit){
        console.log(error.itemName);
    }


    return (
        <div className="InputLst">
            <div className="InputLst_header"><h2> ADD ITEM </h2></div>
            <form className="InputLst_form" onSubmit={submitHandler}>
                <label className="lbl_itm">Item Name: </label>
                <input type="text" value={itemName} id="itemName" placeholder="Enter Item name"
                       onChange={(e) => setItemName(e.target.value)}>
                </input>
                <label className="error"> <br/>{error.itemName}</label>
                <br/> <br/>
                <label className="lbl_itm">Item Price: </label>
                <input type="number" value={itemPrice} id="itemPrice" placeholder="Enter Number only"
                       onChange={(e) => setItemPrice(e.target.value)}>
                </input>
                <label className="error"><br/>{error.itemPrice}</label>
                <br/> <br/>
                <div className="btn-save">
                    <button className="form_btn" type="submit" id="formButton">save</button>
                </div>
                <br/>
                <label className="error">{error.checkData}</label>
            </form>
        </div>
    )
}

export default GetItemInput;