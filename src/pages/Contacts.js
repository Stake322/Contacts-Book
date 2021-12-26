import React, { useEffect } from 'react'
import { useContext, useState } from 'react/cjs/react.development'
import { Button, Checkbox, Icon, Segment, Table, Input } from 'semantic-ui-react'
import * as api from "../api"

const ContactsTable = () => {
    const url = 'http://localhost:3001/#'

    const [login, setLogin] = useState();
    const [data, setData] = useState();
    const [contacts, setContacts] = useState([])
    const [valueId, setValueId] = useState();

    //add user
    const [addFirstName, setAddFirstName] = useState("");
    const [addSecondName, setAddSecondName] = useState("");
    const [addNumber, setAddNumber] = useState("");
    const [addEmail, setAddEmail] = useState("");
    const [addFavorite, setAddFavorite] = useState(false);
    //edit user
    const [editFirstName, setEditFirstName] = useState("");
    const [editSecondName, setEditSecondName] = useState("");
    const [editNumber, setEditNumber] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editFavorite, setEditFavorite] = useState(false);


    //
    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState()


    const styleSegments = { width: "60%", marginLeft: "auto", marginRight: "auto" }
    //sort dont work :)
    const renderContacts = () => {
        return (data !== undefined) ? contacts.sort((f, s) => f.firstName - s.firstName).map((value, index) => {
            return (
                <Table.Row key={value.id} positive={value.favorite}>
                    <Table.Cell collapsing>
                        {index + 1}
                    </Table.Cell>
                    <Table.Cell>{value.firstName}</Table.Cell>
                    <Table.Cell>{value.secondName}</Table.Cell>
                    <Table.Cell>{value.number}</Table.Cell>
                    <Table.Cell>{value.email}</Table.Cell>
                    <Table.Cell>{value.favorite ? "Да" : "Нет"}</Table.Cell>
                    <Table.Cell>
                        <Button icon='trash' compact negative onClick={() => removeUser(value.id)} />
                        <Button compact icon='cog' color='green' onClick={() => { setValueId(value.id); setEdit(true); setEditFirstName(value.firstName); setEditSecondName(value.secondName); setEditNumber(value.number); setEditEmail(value.email) }} />
                        {/* <Button compact icon='save' color='blue' onClick={() => changeUser(value.id)} /> */}
                    </Table.Cell>
                </Table.Row>
            )
        }) : <></>
    }

    const logout = () => {
        localStorage.removeItem('username');
        window.location.replace(url);
    }

    const clearInputs = () => {
        //add
        setAddEmail("");
        setAddNumber("");
        setAddSecondName("");
        setAddFirstName("");
        //edit
        setEditNumber("");
        setEditFirstName("")
        setEditSecondName("")
        setEditEmail("")
    }

    useEffect(() => {
        const username = localStorage.getItem("username")
        setLogin(username);
    }, [login])
    useEffect(() => {
        api.getUsers((localStorage.getItem("username")), result => {
            setData(result)
            setContacts(result.contacts);
        });
    }, [])


    useEffect(() => {
        let eq = (input === "" || input === null || input === undefined)
        if (eq && data)
            return setContacts(data.contacts)
        const newContacts = contacts;
        setContacts([]);
        newContacts.forEach((item) => {
            if (item.firstName.toLowerCase().includes(input.toLowerCase())) setContacts(old => [...old, item])
            else if (item.secondName.toLowerCase().includes(input.toLowerCase())) setContacts(old => [...old, item])
            else if (item.email.toLowerCase().includes(input.toLowerCase())) setContacts(old => [...old, item])
            else if (item.number.toLowerCase().includes(input.toLowerCase())) setContacts(old => [...old, item])
        })
    }, [input])


    const removeUser = (id) => {
        setContacts([...contacts.filter((item) => item.id !== id)]);
        api.deleteContact(login, [...contacts.filter((item) => item.id !== id)], data.id, result => { });

    }
    const addUser = (firstName, secondName, email, number, favorite) => {
        if (firstName && secondName && email && number) {
            const contact = { id: Math.random().toString(36).substring(2, 9), firstName: firstName, secondName: secondName, number: number, email: email, favorite: favorite }
            setContacts(old => [...old, contact])
            api.sendNewContact(login, [...contacts, contact], data.id, result => { });
            clearInputs();
        } else console.log("Ошибка при добавлении");
    }

    const changeUser = () => {
        const contact = { id: Math.random().toString(36).substring(2, 9), firstName: editFirstName, secondName: editSecondName, number: editNumber, email: editEmail, favorite: editFavorite }
        let newContacts = [...contacts.filter((item) => item.id !== valueId), contact]
        setContacts([...newContacts]);
        api.sendNewContact(login, [...newContacts], data.id, result => { })
    }


    return (
        <>
            <Segment textAlign='center' secondary style={styleSegments}>
                <Input action={{ icon: 'search' }} placeholder='Найти...' onChange={(e) => setInput(e.target.value)} />
                <Button floated='right' color='purple' onClick={logout}>
                    Выйти из системы
                </Button>
            </Segment>
            <Segment raised compact textAlign='center' style={styleSegments}>
                <Table compact celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Имя</Table.HeaderCell>
                            <Table.HeaderCell>Фамилия</Table.HeaderCell>
                            <Table.HeaderCell>Телефон</Table.HeaderCell>
                            <Table.HeaderCell>E-mail</Table.HeaderCell>
                            <Table.HeaderCell>Избранный контакт</Table.HeaderCell>
                            <Table.HeaderCell>Действие</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {renderContacts()}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>Новый</Table.HeaderCell>
                            <Table.HeaderCell >
                                <Input placeholder="Добавить имя" value={addFirstName} onChange={(e) => setAddFirstName(e.target.value)} />
                            </Table.HeaderCell>
                            <Table.HeaderCell >
                                <Input placeholder="Добавить фамилию" value={addSecondName} onChange={(e) => setAddSecondName(e.target.value)} />
                            </Table.HeaderCell>
                            <Table.HeaderCell >
                                <Input placeholder="Добавить номер" value={addNumber} onChange={(e) => setAddNumber(e.target.value)} />
                            </Table.HeaderCell>
                            <Table.HeaderCell >
                                <Input placeholder="Добавить почту" value={addEmail} onChange={(e) => setAddEmail(e.target.value)} />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <Checkbox label="Сделать избранным" toggle checked={addFavorite} onChange={(e) => { setAddFavorite(prev => !addFavorite) }} />
                            </Table.HeaderCell>
                            <Table.HeaderCell colSpan='4'>
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    primary
                                    size='small'
                                    onClick={() => addUser(addFirstName, addSecondName, addEmail, addNumber, addFavorite)}
                                >
                                    <Icon name='user' /> Добавить
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                    {edit ?
                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell>Изменить </Table.HeaderCell>
                                <Table.HeaderCell >
                                    <Input value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
                                </Table.HeaderCell>
                                <Table.HeaderCell >
                                    <Input value={editSecondName} onChange={(e) => setEditSecondName(e.target.value)} />
                                </Table.HeaderCell>
                                <Table.HeaderCell >
                                    <Input value={editNumber} onChange={(e) => setEditNumber(e.target.value)} />
                                </Table.HeaderCell>
                                <Table.HeaderCell >
                                    <Input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    <Checkbox label="Сделать избранным" toggle checked={editFavorite} onChange={(e) => { setEditFavorite(prev => !editFavorite) }} />
                                </Table.HeaderCell>
                                <Table.HeaderCell colSpan='4'>
                                    <Button
                                        floated='right'
                                        icon
                                        labelPosition='left'
                                        color="teal"
                                        size='small'
                                        onClick={() => { changeUser(); setEdit(false) }}
                                    >
                                        <Icon name='save' /> Сохранить
                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                        :
                        <></>
                    }

                </Table >
            </Segment>


        </>

    )
}
export default ContactsTable
