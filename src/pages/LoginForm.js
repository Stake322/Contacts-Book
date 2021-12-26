import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Divider, Loader } from 'semantic-ui-react'
import Portal from '../Components/Portal';
import * as api from "../api"




const LoginForm = (props) => {
    const url = "http://localhost:3001/#/contacts"
    const [login, setLogin] = useState();
    const [PW, setPW] = useState();
    const [isSingUp, setIsSingUp] = useState(false);
    const [open, setOpen] = useState(false);
    const [newLogin, setNewLogin] = useState();
    const [newPW, setNewPW] = useState();
    const [info, setInfo] = useState('');

    const openSingUp = () => setIsSingUp(prev => !isSingUp);
    const openAlert = (info) => { setOpen(true); setInfo(info); setTimeout(() => setOpen(false), 2000) }
    const registred = () => {
        //save data to localstorage
        if (newLogin === undefined || newPW === undefined || newLogin === "" || newPW === "") { }
        else {
            if (localStorage.getItem(newLogin)) { openAlert("Такой логин уже существует"); }
            else {
                api.registerContact((newLogin), result => { });
                openAlert("Регистрация прошла успешно");
                localStorage.setItem(newLogin, JSON.stringify({ password: newPW }));
            }
        }

    }
    const willLogin = () => {
        let loginData = JSON.parse(localStorage.getItem(login));
        if (localStorage.hasOwnProperty(login) && loginData.password == PW) {
            openAlert("Успешный вход! Приятного пользования")
            window.location.replace(url);
            localStorage.setItem("username", login);
        } else {
            openAlert("Неверный логин или пароль!")
        }
    }
    useEffect(() => {
        const username = localStorage.getItem("username")
        if (username) window.location.replace(url);
    }, [])

    return (
        <div>
            <Portal open={open} info={info} />
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Icon name="hand peace outline" /> Войти в ваш аккаунт
                    </Header>

                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Логин' onChange={(e) => setLogin(e.target.value)} />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Пароль'
                                type='password'
                                onChange={(e) => setPW(e.target.value)}
                            />
                            <Button onClick={willLogin} color='teal' fluid size='large' content="Войти" />

                        </Segment>
                    </Form>
                    <Divider horizontal >ИЛИ</Divider>
                    <Segment>
                        <Header as="h4">Если здесь впервые, то зарегистрируйтесь</Header>
                        <Button color="blue" onClick={openSingUp}>Регистрация</Button>
                    </Segment>

                    {isSingUp ?
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Логин' onChange={(e) => setNewLogin(e.target.value)} />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Пароль'
                                    type='password'
                                    onChange={(e) => setNewPW(e.target.value)}
                                />
                                <Button onClick={registred} color='purple' fluid size='large'>
                                    Зарегистрироваться
                                </Button>
                            </Segment>
                        </Form>
                        :
                        <div></div>
                    }

                </Grid.Column>
            </Grid>
        </div >
    )

}

export default LoginForm    