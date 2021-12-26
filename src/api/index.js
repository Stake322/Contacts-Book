import axios from "axios";


const url = "http://localhost:3000"


export const getUsers = (user, callback) =>
    axios.get(`${url}/users`)
        .then(res => {
            let someData = res.data; // massive data object
            someData.map((value, index) => {
                let v = Object.values(value) //massive keys object
                if (v.includes(user)) {
                    callback(value) //find object
                }
            });
            // callback(res.data)
        })
        .catch(error => {
            callback(false, error);
            console.log("erorr getUsers", error);
        });


//PUT DETELE НЕОБХОДИМ /ID 
export const sendNewContact = (user, contact, globalId, callback) =>
    axios({
        method: "PUT",
        data: { user, contacts: contact },
        url: `${url}/users/${globalId}`
    }).then((res) => {
        callback(res)
    }).catch(err => {
        callback(false, err)
    })


const firstContact = {
    id: Math.random().toString(36).substring(2, 9),
    firstName: "Ильяс",
    secondName: "Мамаев",
    number: "+79276295729",
    email: "stake164rus@mail.ru",
    favorite: true
}

export const registerContact = (user, callback) =>
    axios({
        method: "POST",
        data: { user, contacts: [firstContact] },
        url: `${url}/users`
    }).then((res) => {
        callback(res)
    }).catch(err => {
        callback(false, err)
    })



export const deleteContact = (user, contacts, globalId, callback) =>
    axios({
        method: "PUT",
        data: { user, contacts },
        url: `${url}/users/${globalId}`
    }).then((res) => {
        console.log("сервер удалил: ", res);
        callback(res)
    }).catch(err => {
        callback(false, err)
    })

export const changeContact = (user, contacts, id, globalId, callback) => {
    return axios({
        method: "PUT",
        data: { user, contacts },
        url: `${url}/users/${globalId}`
    }).then((res) => {
        res.data.contacts.map((value, index) => {
            if (value.id === id) callback(value)
        })
    }).catch(err => {
        callback(false, err)
    })
}
