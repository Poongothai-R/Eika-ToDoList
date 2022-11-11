import './App.css';
import GetItemInput from './Inputform';
import ViewList from './Viewlist';
import Header from "./Header";
import Welcome from "./Welcome";
import Footer from "./Footer";
import React, { useState, useEffect } from 'react';


function App() {

        // Initializing value for add another item, completed item

    const [task, setTask] = useState([]);
    const [completeTask, setCompleteTask] = useState([]);
    const [anotherTask, setAnotherTask] = useState(0);

    useEffect(() => {
        let myLocalToDoList = JSON.parse(window.localStorage.getItem('myToDoList'));
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

    let ToDoList = JSON.parse(window.localStorage.getItem('myToDoList'));

    const AddItemHandler = (e) => {

            const newTask = {
                name: e.target.itemName.value,
                price: Number(e.target.itemPrice.value)
            };
            setTask([...task, newTask]);
            task.push(newTask);
            localStorage.setItem('myToDoList', JSON.stringify(task));
            setAnotherTask(0);

    };


    const AddAnotherItem = () => {
        setAnotherTask(1);
        console.log(anotherTask);
    };

    const markItemComplete = (e) => {
        if (e.target.checked) {
            let moveTask = {
                name: task[e.target.id].name,
                price: task[e.target.id].price
            };
            setCompleteTask([...completeTask,moveTask]);
            completeTask.push(moveTask);
            window.localStorage.setItem('myCompleteList',JSON.stringify(completeTask));

            task.splice(e.target.id,1);
            window.localStorage.setItem('myToDoList', JSON.stringify(task));

        }
    };




    return (
        <div className="App">

            {/*---- Updated meta tag to prevent auto zoom in IOS devices because of font size below 16px-----*/}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

            <Header/>

            <div>
            {
                ( (ToDoList === null) && (anotherTask === 0)) ?
                    (<Welcome addNewItem={AddAnotherItem}/>)
                    : ((anotherTask === 1)
                    ?
                    (<div> <GetItemInput checkData = {task} AddItem={AddItemHandler} /></div>)
                    :
                    (<div> <ViewList listData={task} completeData={completeTask} addAnotherItem={AddAnotherItem}
                                         checkboxHandle={markItemComplete}/>
                    </div>)
                )
            }
            </div>

            <Footer/>

        </div>
    );
}

export default App;