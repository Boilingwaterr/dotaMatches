import React, { useEffect, useState } from 'react';
import Style from './App.module.css';
import { useDefineConstants } from './hooks/fetchData.hook.js';
import { Query } from '@apollo/react-components'
import { GET_MATCH_BY_ID } from './graphql-cli/queries';
import MatchResults from './components/matches/MatchResults.jsx';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import SearchPage from './components/searchPage/SearchComponent.jsx';
import FindField from './components/FindField';

const QueryWrapper = props => (
    <>
      <Query query = { GET_MATCH_BY_ID } variables = { {'id':props.match.params.matchId} } >
          {({ loading, error, data }) => {
          if (loading) return <p>Loading…</p>;
          if (error) {
            return (
              <div className = { Style.errorField }>
                <FindField { ...props }/>
                {
                  error.message === "Network error: Failed to fetch" 
                  ? <p>Отсутствует соединение с сервером</p>
                  : <p>Матч не найден</p>
                }
              </div>
            );
          }
          return(
            <div>
              <MatchResults 
                data = { data }
                setMatchID = { props.setMatchID }
                { ...props }
              /> 
            </div> 
          )
          }}
      </Query>
    </>
)


const App = props => {
  const [ appIsReady, setAppIsReady ] = useState(false);

  const fetching = useDefineConstants();

  useEffect( () => {
    fetching(setAppIsReady);//setlocalstorage
  }, [appIsReady, fetching]);

  if (appIsReady) {
    return <div className = { Style.app }>
      <Switch>
        <Route path = '/matches/:matchId' component = { QueryWrapper }/>
        <Route exact path = '/' component = { SearchPage }/>
        <Redirect from = "*" to = "/" />
      </Switch>
    </div>
  } else {
    return <div className = { Style.app } style = {{color: "#c1c1c1"}}>Loading application...</div>
  }
}

export default withRouter(App);