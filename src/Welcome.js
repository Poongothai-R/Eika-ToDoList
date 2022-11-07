import "./welcome.css"

function Welcome(props){
    const addNewItem = (e) => {
        e.preventDefault();
        props.addNewItem(e);
    }
    return(
       <div className="welcome">
           <img className="" src="/img/shopping_img.jpg"/>
           <h1> EIKA'S Shopping List</h1>
           <p>  Here you will be able
               to create a todo list with for the furniture you want
               to buy. </p>

           <p>To get started press the Add new item button and a popup
               will ask you the name and the price of the item you want
               to add. You can also and an image after the item is added
               by touching the camera icon.</p>

        <div>
            <button className="btn-add" onClick={addNewItem} > Add New Item </button>
        </div>
        </div>
    );
}export default Welcome;