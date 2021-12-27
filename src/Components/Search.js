import React, { useEffect } from 'react'
import {Input } from 'semantic-ui-react'


const Search = ({ input, setInput, data, contacts, setContacts }) => {

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

    return (
        <Input action={{ icon: 'search' }} placeholder='Найти...' onChange={(e) => setInput(e.target.value)} />
    )
}

export default Search