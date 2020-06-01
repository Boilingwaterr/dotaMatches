import React from 'react';
import FindField from '../FindField';
import Style from './SearchComponent.module.css';

const SearchPage = props => (
    <div className = { Style.search }>
        <FindField { ...props }/>
        <h3>Например: 5425725505</h3>
    </div>
);

export default SearchPage;