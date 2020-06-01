import React,  { useState } from 'react';
import find from '../assets/find.svg';
import Style from './FindField.module.css';

const FindField = props => {
    const [ keyWord, setKeyWord ] = useState(''); 

    const changeHandler = (event) => {
        setKeyWord(event.target.value);
    }

    const submitHandler = (event) => {
        if (event.key === 'Enter'){
            event.preventDefault();
            setKeyWord('');
            props.history.push(`/matches/${keyWord}`);
        } 
    }
    return <>
        <form onKeyPress = { submitHandler }>
            <label htmlFor = "find" className = { Style.labelStyle }>
                <input 
                    type = "number"
                    name = "find" 
                    value = { keyWord } 
                    onChange = { changeHandler }
                    autoComplete = 'off'
                    placeholder = 'Введите номер матча'  
                />
                <div>
                    <img src = { find } alt = "find"/>
                </div>
            </label>
        </form>
    </>
}

export default FindField;