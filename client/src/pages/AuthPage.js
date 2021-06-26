import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [ form, setForm ] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);
    
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handleRegister = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
            console.log('Data: ', data);
        } catch (error) {};
    };

    const handleLogin = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message);
            auth.login(data.token, data.userId);
        } catch (error) {};
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Link shortener</h1>
                <form className="card blue darken-1" action="#" method="POST" onSubmit={handleSubmit}>
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите email" 
                                    id="email" 
                                    type="email"
                                    name="email"
                                    className="validate yellow-input"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите пароль" 
                                    id="password" 
                                    type="password"
                                    name="password"
                                    className="validate yellow-input"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn orange lighten-1" 
                            style={{marginRight: '10px'}}
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button 
                            className="btn grey lighten-1 black-text"
                            onClick={handleRegister}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};