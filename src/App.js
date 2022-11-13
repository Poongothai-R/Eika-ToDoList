import './App.css';
import GetItemInput from './Inputform';
import ViewList from './Viewlist';
import Header from "./Header";
import Welcome from "./Welcome";
import Footer from "./Footer";
import React, { useState, useEffect } from 'react';


function App() {

        // Initializing value for add another item to mtToDoLIst and completed item to myCompleteList...

    const [task, setTask] = useState([]);
    const [completeTask, setCompleteTask] = useState([]);
    const [anotherTask, setAnotherTask] = useState(0);
    // const [image, setImage] = useState({});

    let ToDoList = JSON.parse(window.localStorage.getItem('myToDoList'));


    useEffect(() => {
        let myLocalToDoList = JSON.parse(window.localStorage.getItem('myToDoList'));
        //console.log(myLocalToDoList);
        if (myLocalToDoList) {
            setTask(myLocalToDoList);
        }
    }, []);


    useEffect(() => {
        let myLocalCompleteList = JSON.parse(window.localStorage.getItem('myCompleteList'));
        if (myLocalCompleteList) {
            setCompleteTask(myLocalCompleteList);
        }
    }, []);



    // To add item into myToDoList...
    const AddItemHandler = (e) => {

            const newTask = {
                name: e.target.itemName.value,
                price: Number(e.target.itemPrice.value),
                preview: null
            };
            setTask([...task, newTask]);
            task.push(newTask);
            localStorage.setItem('myToDoList', JSON.stringify(task));
            setAnotherTask(0);

    };

    // To get the input form...
    const AddAnotherItem = () => {
        setAnotherTask(1);
        //console.log(anotherTask);
    };

    //To move the selected item from myToDoList to myCompleteList
    const markItemComplete = (e) => {

        if (e.target.checked) {
            let moveTask = {
                name: task[e.target.id].name,
                price: task[e.target.id].price,
                image: task[e.target.id].img
            };
            setCompleteTask([...completeTask,moveTask]);
            completeTask.push(moveTask);
            window.localStorage.setItem('myCompleteList',JSON.stringify(completeTask));

            task.splice(e.target.id,1);
            window.localStorage.setItem('myToDoList', JSON.stringify(task));

        }
    };

    const uploadImgHandler = (e) => {
        // console.log(e);
        let itemIdx = (e.target.id).substring(11,)  ;
        console.log(itemIdx);
        task[itemIdx].preview=URL.createObjectURL(e.target.files[0]);
        window.localStorage.setItem('myToDoList', JSON.stringify(task));

    }


    return (
        <div className="App">

            {/*---- Updated meta tag to prevent auto zoom in IOS devices because of font size below 16px-----*/}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

            <Header/>

            {/* main body based on the list state */}

            <div>
            {
                ( (ToDoList === null) && (anotherTask === 0)) ?
                    (<Welcome addNewItem={AddAnotherItem}/>)
                    : ((anotherTask === 1)
                    ?
                    (<div> <GetItemInput checkData = {task} AddItem={AddItemHandler} /></div>)
                    :
                    (<div> <ViewList listData={task} completeData={completeTask} addAnotherItem={AddAnotherItem}
                                         checkboxHandle={markItemComplete} addImage={uploadImgHandler}/>
                    </div>)
                )
            }
            </div>

            <Footer/>

        </div>
    );
}

export default App;