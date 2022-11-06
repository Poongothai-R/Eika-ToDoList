import React, { useState} from "react";
import "./App.css";

function Form(){
    const [itemName,setItemName]=useState('')
    const [itemPrice,setItemPrice]=useState('')
    const [error,setError]=useState(false)
    console.log(itemName);
     let tasks = [];
    const handleSubmit=(e)=>{
        e.preventDefault(); // to stop form submitting

        let task = {
            name : e.name,
            price : e.price
        };
        let task_count = tasks.push(task);
        console.log(tasks);


        //setting local storage
        window.localStorage.setItem("MyTaskList", JSON.stringify(tasks));

       // form validation
        if(itemName.length===0||itemPrice.length===0){
            setError(true)
        }
        if(itemName&&itemPrice)
        {
            console.log("Item Name: ",itemName,"\nItem Price: ",itemPrice);

        }

    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Item Name :  </label>
                    <input type = "text" placeholder="Item Name" id="name"  />
                </div>


                {    //setting error message for item name
                    error&&itemName.length<=0?
                    <label>item Name can't be Empty</label>:""}

                <div>
                    <label>Item Price :  </label>
                    <input type = "number" placeholder="Item Price" id="price"  />
                </div>


                {    //setting error message for price
                    error&&itemPrice.length<=0?
                    <label>Item Price can't be Empty</label>:""}

                <div>
                    <button >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
export default Form;