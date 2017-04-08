import React, { Component } from 'react';
import { gql, graphql, withApollo } from 'react-apollo';

const query = gql`{
  people {
    id
    name
    pets {
      ... on Cat {
        name
      }
      ... on Dog {
        needsWalk
      }
    }
  }
}`;

class App extends Component {
  addPerson = () => {
    const client = this.props.client;
    const currentData = client.readQuery({query});
    currentData.people.push({
      id: 4,
      name: 'Jane Doe',
      __typename: 'Person'
    });
    client.writeQuery({
      query,
      data: currentData
    });
  }
  render() {
    const { data: { loading, people } } = this.props;
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
          <button type="button" onClick={this.addPerson}>Add person</button>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {people.map(person => (
              <li key={person.id}>
                {person.name}
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  }
}

export default graphql(query)(withApollo(App));
