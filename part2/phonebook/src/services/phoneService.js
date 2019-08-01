import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';



//Get all contacts
const getAll = () => {
    const request = axios.get(baseUrl);

    return request.then((response) => response.data);
}

const addContact = (personObj) => {
    const request = axios.post(baseUrl, personObj);

    return request.then((response) => response.data);
}

const deleteContact = () => {

}

export default { addContact, getAll, deleteContact }