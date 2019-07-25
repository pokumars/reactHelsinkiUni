import React from 'react'

const PersonForm = (props) => {
    const {submitter, newName, handleNameChange, newNumber, handleNumberChange} = props
    return (
        <form onSubmit={submitter}>
            <div>
                name: <input  value= {newName}
                onChange={handleNameChange}/>
            </div>

            <div>
                number: <input value={newNumber} 
                onChange={handleNumberChange}/>
            </div>

            <div>
                <button type="submit">add</button>
            </div>
        </form>

    )
}
export default PersonForm