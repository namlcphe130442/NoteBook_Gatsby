import React, {useState} from 'react';
import './SearchNote.css';

function SearchNote(props) {

    const {searchOnClick} = props;
    const [txtSearch, setTxtSearch] = useState('');

    function handleSearchChange(event){
        const value = event.target.value;
        setTxtSearch(value);
    }

    function handleSearchClick(){
        searchOnClick(txtSearch);
    }

    return(
        <div className="search">
            <div className="leftSearch">
                <input className="searchText" type="text" onChange={handleSearchChange}/>
            </div>
            <div className="rightSearch">
                <button className="buttonSearch" onClick={handleSearchClick}>Search</button>
            </div>
        </div>
    );
}

export default SearchNote;