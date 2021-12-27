import React, {useState, useEffect } from 'react'
import { Button,  Segment, Table } from 'semantic-ui-react'
import * as api from "../api"
import Search from '../Components/Search'
import AddContact from '../Components/AddContact'
import EditContact from '../Components/EditContact'
import TableHeader from '../Components/TableHeader'

const { mainPage, contactPage } = require('../config.json')

const ContactsTable = () => {
    const [login, setLogin] = useState();
    const [data, setData] = useState();
    const [contacts, setContacts] = useState([])
    const [valueId, setValueId] = useState();
    //placeholder
    const [placeHolder, setPlaceHolder] = useState("");
    //
    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState()
    const styleSegments = { width: "60%", marginLeft: "auto", marginRight: "auto" }
    //sort dont work :)
    const renderContacts = () => {
        return (data !== undefined) ? contacts.sort((f, s) => f.firstName - s.firstName).map((value, index) => {
            return (
                <Table.Body>
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
                            <Button compact icon='cog' color='green' onClick={() => { setValueId(value.id); setEdit(prev=> !edit); setPlaceHolder(value.firstName) }} />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>

            )
        }) : <></>
    }
    const logout = () => {
        localStorage.removeItem('username');
        window.location.replace(mainPage);
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

    const removeUser = (id) => {
        setContacts([...contacts.filter((item) => item.id !== id)]);
        api.deleteContact(login, [...contacts.filter((item) => item.id !== id)], data.id, result => { });

    }

    return (
        <>
            <Segment textAlign='center' secondary style={styleSegments}>
                <Search input={input} setInput={setInput} data={data} contacts={contacts} setContacts={setContacts} />
                <Button floated='right' color='purple' onClick={logout}>
                    Выйти из системы
                </Button>
            </Segment>
            <Segment raised compact textAlign='center' style={styleSegments}>
                <Table compact celled definition>
                <TableHeader/>
                {renderContacts()}
                <AddContact data={data} login={login} contacts={contacts} setContacts={setContacts} />
                {edit ?
                    <EditContact data={data} valueId={valueId} login={login}
                        contacts={contacts}
                        setContacts={setContacts}
                        setEdit={setEdit}
                        placeHolder={placeHolder}
                    />
                    :
                    <></>
                }

            </Table >
        </Segment>
        </>

    )
}
export default ContactsTable
