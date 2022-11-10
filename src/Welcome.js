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
                    <p> Welcome to the EIKA's shopping list. Here you will be able to create a
                        to-do list
                        with for the furniture you want to buy.
                    </p>
                    <br/>
                    <p>
                        To get started press the Add new item button and a popup
                        will ask you the name and the price of the item you want
                        to add. You can also and an image after the item is added
                        by touching the camera icon.
                    </p><br/>
               </div>
           </div>

            <button className="welcome_btn" onClick={addNewItem} > Add item </button>

        </div>
    );
}export default Welcome;