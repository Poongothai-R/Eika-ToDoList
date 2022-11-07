import { useState } from "react";

function ViewToDoList(props) {

    let data = props.listData;
    let completeData = props.completeData;
    const [displayFlag, setDisplayFlag] = useState(false);
    const [sortFlag, setSortFlag] = useState(false);
    const [sortData, setSortData] = useState([]);

    let sortObj = {
        sortBy: null,
        sortOrder: null
    };


    /*const sortName = (e) => {
        setSortOrder (sortOrder>1 ? 0 : sortOrder+1);
        switch(sortOrder) {
            case 1:
                data.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name ? -1 : 0));
                break;
            case 2:
                data.sort((a, b) => (a.name > b.name) ? -1 : (a.name < b.name ? 1 : 0));
                break;
            default:
                window.location.reload();
                data = props.listData;
                break;
        }
        e.preventDefault();
        setSortFlag(true);
        // console.log(data);
    }

    const sortPrice = (e) => {
        data.sort((a, b) => (a.price > b.price) ? 1 : (a.price < b.price ? -1 : 0));
        e.preventDefault();
        setSortFlag(true);
    }*/

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
    console.log(typeof (props.listData.price));
    const renderViewItem =  data.map((recs, index) => {
        return (
            <div key={index} className="displayList">
                <input type="checkBox" id={`${index}`} onChange={handleView}></input>
                <label><span> {recs.name}</span> , <span>{recs.price}</span></label>
            </div>
        );
    });




    const renderCompleteItem = completeData.map((recs, index) => {
        return (
            <div key={index}>
                <label><span> {recs.name}</span> , <span>{recs.price}</span></label>
                <br />
            </div>
        );
    });

    return (
        <div className="view">
            <div >
            <h1> Shopping List</h1>   <br/>
            <h3> Sort by:
                <span /> <button id='name' onClick={sortDataHandle}>Name </button>
                <span /> <button id="price" onClick={sortDataHandle}>Price</button>
            </h3> </div> <br/>
            {renderViewItem}
            <br />
            <div >
            <button className="btn-add" onClick={addNewItem}> Add Item </button>
            <br /> <br />
            </div>
            <div className="view">
            <button id = 'view' onClick={handleComplete}> View completed items</button>
                <br /><br /></div>
            {
                (displayFlag === true) ? renderCompleteItem : null
            }
        </div>
    );
}

export default ViewToDoList;