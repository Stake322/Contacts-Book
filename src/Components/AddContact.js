
import React, { useEffect } from 'react'
import { useContext, useState } from 'react/cjs/react.development'
import { Button, Checkbox, Icon, Segment, Table, Input } from 'semantic-ui-react'
import * as api from "../api"


const AddContact = ({data, login, contacts, setContacts }) => {

    //add user
    const [addFirstName, setAddFirstName] = useState("");
    const [addSecondName, setAddSecondName] = useState("");
    const [addNumber, setAddNumber] = useState("");
    const [addEmail, setAddEmail] = useState("");
    const [addFavorite, setAddFavorite] = useState(false);

    const clearInputs = () => {
        //add
        setAddEmail("");
        setAddNumber("");
        setAddSecondName("");
        setAddFirstName("");
    }


    const addUser = (firstName, secondName, email, number, favorite) => {
        if (firstName && secondName && email && number) {
            const contact = { id: Math.random().toString(36).substring(2, 9), firstName: firstName, secondName: secondName, number: number, email: email, favorite: favorite }
            setContacts(old => [...old, contact])
            api.sendNewContact(login, [...contacts, contact], data.id, result => { });
            clearInputs();
        } else console.log("Ошибка при добавлении");
    }

    return (
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
    )
}

export default AddContact;
