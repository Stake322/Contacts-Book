import React from 'react'
import {useState } from 'react/cjs/react.development'
import { Button, Checkbox, Icon, Table, Input } from 'semantic-ui-react'
import * as api from "../api"


const EditContact = ({ data, valueId, login, contacts, setContacts, setEdit, placeHolder }) => {
    //edit user
    const [editFirstName, setEditFirstName] = useState("");
    const [editSecondName, setEditSecondName] = useState("");
    const [editNumber, setEditNumber] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editFavorite, setEditFavorite] = useState(false);


    const changeUser = () => {
        const contact = { id: Math.random().toString(36).substring(2, 9), firstName: editFirstName, secondName: editSecondName, number: editNumber, email: editEmail, favorite: editFavorite }
        let newContacts = [...contacts.filter((item) => item.id !== valueId), contact]
        setContacts([...newContacts]);
        api.sendNewContact(login, [...newContacts], data.id, result => { })
    }
    return (
        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell>Изменить {placeHolder} </Table.HeaderCell>
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
    )
}

export default EditContact;
