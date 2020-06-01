const { ApolloServer } = require('apollo-server');
const Schema = require('./schema/schema');

const { typeDefs, resolvers, DataAPI } = Schema;

const PORT = 8000;

const context = () => {
    return {
      token: 'foo',
    }
}

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    dataSources: () => { // добавляем источник данных у которого есть свой REST API 
        return {
        dataAPI: new DataAPI(),
        };
    },
    context
});

server.listen(PORT).then( () => console.log('server started.', PORT) );

