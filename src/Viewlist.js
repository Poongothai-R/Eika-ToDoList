import "./Viewlist.css";
import { useState } from "react";


function Viewlist(props) {

    let data = props.listData;
    let completeData = props.completeData;

    /* sort data variable declaration */
    const [displayFlag, setDisplayFlag] = useState(false);
    const [sortFlag, setSortFlag] = useState(false);
    const [sortData, setSortData] = useState([]);
    let sortObj = {
        sortBy: null,
        sortOrder: null
    };


    /* Sort data based on user's input */
    const sortDataHandle = (e) => {
        e.preventDefault();
        let objIndex = sortData.findIndex(id => id.sortBy === e.target.id);
        if (objIndex === -1) {
            sortObj=({
                sortBy: e.target.id,
                sortOrder: 'asc'
            });
            setSortData([...sortData, sortObj]);
        }
        else if (objIndex > -1) {
            let objOrder = sortData[objIndex].sortOrder;
            sortObj=({
                sortBy: e.target.id,
                sortOrder: (objOrder === 'asc') ? 'desc' : 'asc'
            });

            sortData[objIndex] = sortObj;
        }
        // console.log(sortObj);
        setSortFlag(true);
        switch (sortObj.sortOrder) {
            case 'asc':
                data.sort((a, b) => (a[sortObj.sortBy] > b[sortObj.sortBy]) ? 1 : (a[sortObj.sortBy] < b[sortObj.sortBy] ? -1 : 0));
                break;
            case 'desc':
                data.sort((a, b) => (a[sortObj.sortBy] > b[sortObj.sortBy]) ? -1 : (a[sortObj.sortBy] < b[sortObj.sortBy] ? 1 : 0));
                break;
            default:
                break;
        }
    };

    const addNewItem = (e) => {
        e.preventDefault();
        props.addAnotherItem(e);
    }

    const handleView = (e) => {
        e.preventDefault();
        props.checkboxHandle(e);
    }

    const handleComplete = (e) => {
        setDisplayFlag(!displayFlag);
        e.preventDefault();
    }

    if(sortFlag) {
        setSortFlag(false);
        console.log(data);
    }

    const renderViewItem =  data.map((recs, index) => {
        return (
            <div key={index} className="view_item_card">
                <div className="view_item_left">
                <input type="checkBox" id={`${index}`} onChange={handleView}></input>
                </div>
                <div  className="view_item_center">
                <label><span> {recs.name}</span> , <span>{recs.price}</span></label>
                </div>
                <div  className="view_item_right">
                {/*<a><img className="upload_img" src="/img/img.png" alt="upload image"/></a>*/}
                  <button className="upload_img"> <i className="fa fa-solid fa-image" aria-hidden="true"/></button>
                </div>
            </div>
        );
    });




    const renderCompleteItem = completeData.map((recs, index) => {
        return (
            <div key={index} className="complete_data_card">
                <label><span> {recs.name}</span> , <span>{recs.price}</span></label>
                <br />
            </div>
        );
    });

    return (
        <div className="view_list">
            <div className="view_header">
                <h2> Shopping List </h2><br/>
                <h4> Sort by:
                <span /> <button  className="sort-button" id="name" onClick={sortDataHandle}>Name </button>
                <span /> <button  className="sort-button" id="price" onClick={sortDataHandle}>Price</button>
                </h4>
            </div>
            <div className="view_display">
                {renderViewItem}<br/><br/>
                <button className="add-button" id="addItem" onClick={addNewItem}> Add Item </button>
            </div>
            <div className="view_complete">
                <br/><br/>
                <button className="complete-button" id="viewItem" onClick={handleComplete}> view completed items</button><br/><br/>
                {
                (displayFlag === true) ? renderCompleteItem : null
                }
            </div>
        </div>
    );
}

export default Viewlist;