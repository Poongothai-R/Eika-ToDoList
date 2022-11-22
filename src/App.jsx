import './App.css';
import GetItemInput from './Inputform';
import Viewlist from './Viewlist';
import Header from "./Header";
import Welcome from "./Welcome";
import Footer from "./Footer";
import React, { useState, useEffect } from 'react';
import Resizer from "react-image-file-resizer";


function App() {

    const [task, setTask] = useState([]);
    const [completeTask, setCompleteTask] = useState([]);
    const [anotherTask, setAnotherTask] = useState(0);
    const [taskFlag,setTaskFlag] = useState(false);

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
                preview: task[e.target.id].preview
            };
            setCompleteTask([...completeTask,moveTask]);
            completeTask.push(moveTask);
            window.localStorage.setItem('myCompleteList',JSON.stringify(completeTask));

            task.splice(e.target.id,1);
            window.localStorage.setItem('myToDoList', JSON.stringify(task));

        }
    };

    // Resize the file for better uploading speed...
    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                30,
                30,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    //Upload image process...
    const uploadImgHandler = async (e) => {
        // console.log(e);
        let itemIdx = (e.target.id).substring(11,)  ;
        console.log(itemIdx);
        try {
            const file = e.target.files[0];
            const image = await resizeFile(file);
            console.log(image);
           task[itemIdx].preview = image;
            window.localStorage.setItem("myToDoList",JSON.stringify(task));
            setTaskFlag(true);
        } catch (err) {
            console.log(err);
        }
    };
        // setting the flag for re-rendering...
        if(taskFlag)
        {
            setTaskFlag(false);
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
                    (<div> <Viewlist listData={task} completeData={completeTask} addAnotherItem={AddAnotherItem}
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