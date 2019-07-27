import React from 'react';

const SearchBar = (props) => {
    const { search, handleSearchChange } = props;

    return(
        <div>
            find countries <input onChange={handleSearchChange}  value={search}/>
        </div>
    );
}

export default SearchBar;