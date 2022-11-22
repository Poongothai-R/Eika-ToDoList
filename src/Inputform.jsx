import './Inputform.css';
import React, {useState,} from 'react';

const GetItemInput = (props) => {

    // Variable initialization for getting inputs, checking duplicate data and original data
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [error, setError] = useState({});
    let checkData = props.checkData;
    let duplicateData = checkData.map((name) => {
        return name.name.toUpperCase();
    });

    // Form Submission handler
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

     // checking empty input fields and duplicate data
     if (e.target.itemName.value === "" || e.target.itemPrice.value === "" || e.target.itemPrice.value === "0")
     {
         if (e.target.itemName.value === "") itmName = "Item Name is Required";
         if (e.target.itemPrice.value === "" ) itmPrice = "Item Price is Required";
         if(e.target.itemPrice.value === "0") itmPrice = "Item Price should be greater than Zero";
     }
     else if (duplicateData.includes(dataList))
         chkData = "Item already exists in the list";
     else  props.AddItem(e);

    // setting Error message...
     setError({
         itemName: itmName,
         itemPrice: itmPrice,
         checkData: chkData

      }
      );
 }

    return (
        <div className="InputLst">
            <div className="InputLst_header"><h2>Add item</h2></div>
            <form className="InputLst_form" onSubmit={submitHandler}>

                {/*label,input box and error message for item name */ }
                <label className="lbl_itm">Item Name: </label>
                <input type="text" autoFocus
                       onFocus={e => e.currentTarget.select()} value={itemName} id="itemName" placeholder="Enter Item name"
                       onChange={(e) => setItemName(e.target.value) }>
                </input>
                <label className="error">{error.itemName}</label>
                <br/>

                {/*label,input box and error message for item price */ }
                <label className="lbl_itm">Item Price: </label>
                <input type="number" value={itemPrice} id="itemPrice" placeholder="Enter Number only"
                       onChange={(e) => setItemPrice(e.target.value)}>
                </input>
                <label className="error">{error.itemPrice}</label>
                <br/>

                {/*button for add item */ }
                <div className="btn-save">
                    <button className="form_btn" type="submit" id="formButton">save</button>
                </div>
                <br/>

                {/*error message for duplicate data*/}
                <label className="error">{error.checkData}</label>
            </form>
        </div>
    );
}
export default GetItemInput;