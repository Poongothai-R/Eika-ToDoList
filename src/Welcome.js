import "./welcome.css"

function Welcome(props){
    const addNewItem = (e) => {
        e.preventDefault();
        props.addNewItem(e);
    }
    return(
       <div className="welcome">
           <div className="welcome_content">
               <div>
                <img className="welcome_img" src="/img/shopping_img.jpg" alt="welcome image"/>
               </div><br/>
               <div className="welcome_txt">
                   <h1> EIKA'S Shopping List</h1><br/>
                    <p>  Here you will be able to create a todo list
                        with for the furniture you want to buy.
                    </p>
                    <br/>
                    <p>
                        To get started press the Add new item button and a popup
                        will ask you the name and the price of the item you want
                        to add. You can also and an image after the item is added
                        by touching the camera icon.
                    </p>
               </div>
           </div>

            <button className="welcome_btn" onClick={addNewItem} > Add New Item </button>

        </div>
    );
}export default Welcome;