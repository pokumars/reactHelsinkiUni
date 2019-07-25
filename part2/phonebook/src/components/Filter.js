import React from 'react'

const Filter = (props) => {
    const { filter, handleChange} = props;
    

    return (
        <div>
            filter by this text <input value={filter} onChange={handleChange}/>
        </div>
    )
}
export default Filter