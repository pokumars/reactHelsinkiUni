import axios from 'axios'

//this will use a proxy. why? --> https://fullstackopen.com/en/part3/deploying_app_to_internet#proxy
const baseUrl = '/api/notes'

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
}

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
      id: 10000,
      content: 'This note is not saved to server',
      date: '2019-05-30T17:30:31.098Z',
      important: true,
    }
    return request.then(response => response.data.concat(nonExisting));
    //return request.then(response => response.data);
}

const create = (newObject) => {
    const config = {
        headers: { Authorization: token},
    }

    const request = axios.post(baseUrl, newObject, config);
    return request.then((response) => response.data)
}

const update = (id, newObect) => {
    const request = axios.put(`${baseUrl}/${id}`, newObect);

    return request.then((response) => response.data)
}

export default { getAll, create, update, setToken };