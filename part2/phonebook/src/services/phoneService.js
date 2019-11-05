import axios from 'axios';
//const baseUrl = 'http://localhost:3001/persons';
//const baseUrl = 'http://localhost:3001/api/persons';
const baseUrl = '/api/persons';


//Get all contacts
const getAll = () => {
    const request = axios.get(baseUrl);

    return request.then((response) => response.data);
}

const addContact = (personObj) => {
    const request = axios.post(baseUrl, personObj);

    return request.then((response) => response.data);
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);


    return request.then((response)=>{
        console.log('delete request response ',response.data);
    });
}

const updateContact = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);

    return request.then((response) => {
        console.log('update contact response ',response.data);
        return response.data
    });

}

export default { addContact, getAll, deleteContact,updateContact }
