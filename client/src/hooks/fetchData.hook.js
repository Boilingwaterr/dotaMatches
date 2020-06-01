import { useCallback } from 'react';

export const useDefineConstants = () => {
  const url = 'https://api.opendota.com/api/constants';
    return useCallback(( setAppIsReady, constant = '' ) => {
    fetch(url + constant)
      .then( response => response.json())
      .then( data => {

        let dataLength = data.length;
        let storageLength = Object.keys(localStorage).length;

        if (dataLength !== storageLength) {
            data.map( item => {
              return fetch(`${url}/${item}`)
                .then( response => response.json())
                .then( data => {
                  localStorage.setItem(item, JSON.stringify(data));
                  storageLength = Object.keys(localStorage).length;
                  if(dataLength === storageLength) setAppIsReady(true);
                })
            });
        } else {
          setAppIsReady(true);
        }
      })
    }, [])
}

export const usePlayerWinrate = () => {
  return useCallback(( setState, id = null ) => {
    const url = `https://api.opendota.com/api/players/${id}/wl`;
    fetch(url)
      .then( response => response.json())
      .then( data => {
        console.log('fetch...')
        setState(data);
      })
    }, [])
}