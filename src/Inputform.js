import './Inputform.css';
import React, {useState,} from 'react';

const GetItemInput = (props) => {
    let checkData = props.checkData;
    let duplicateData = checkData.map((name) => {
        return name.name.toUpperCase();
    });


    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [error, setError] = useState({});


    const submitHandler = (e) =>
    {
        e.preventDefault();
        formValidate(e);
    }


 function formValidate(e)
 {
     let itmName = null;
     let itmPrice = null;
     let chkData = null;
     let dataList= (e.target.itemName.value.toString().toUpperCase());

     if (e.target.itemName.value === "" || e.target.itemPrice.value === "")
     {
         if (e.target.itemName.value === "") itmName = "Item Name is Required";
         if (e.target.itemPrice.value === "") itmPrice = "Item Price is Required";

     }
     else if (duplicateData.includes(dataList))
         chkData = "Item already exists in the list";
     else  props.AddItem(e);


     setError({
         itemName: itmName,
         itemPrice: itmPrice,
         checkData: chkData

      });

 }

    return (
        <div className="InputLst">
            <div className="InputLst_header"><h2>Add item</h2></div>
            <form className="InputLst_form" onSubmit={submitHandler}>
                <label className="lbl_itm">Item Name: </label>
                <input type="text" value={itemName} id="itemName" placeholder="Enter Item name"
                       onChange={(e) => setItemName(e.target.value)}>
                </input>
                <label className="error"><br/> {error.itemName}</label>
                <br/>
                <label className="lbl_itm">Item Price: </label>
                <input type="number" value={itemPrice} id="itemPrice" placeholder="Enter Number only"
                       onChange={(e) => setItemPrice(e.target.value)}>
                </input>
                <label className="error"><br/>{error.itemPrice}</label>
                <br/>
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