import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import App from './App.jsx';
import ApolloClient from 'apollo-boost';
import { BrowserRouter } from 'react-router-dom';

export const client = new ApolloClient({
  uri: 'http://localhost:8000',
});

function DotaApp(){
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

ReactDOM.render(
  <ApolloProvider client = { client }>
    <DotaApp/>
  </ApolloProvider>,
  document.getElementById('root')
);

