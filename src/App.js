import React, {Component} from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import {
  ApolloProvider
} from "react-apollo"

import {
  ApolloClient,
}  from "apollo-client"

import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';


import "./App.css"
import Login from "./components/Login"
import { GC_AUTH_TOKEN } from './constants';

import AssetList from "./components/AssetList"
import AssetForm from "./components/AssetForm"
import NavigationBar from "./components/NavigationBar"
import Locations from "./components/Locations"

import {BaseWrapper, ContentWrapper} from "./components/Wrappers"

const httpLink = createHttpLink({
  uri: "/api",
  opts: {
    credentials: 'same-origin',
  }
})


const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(GC_AUTH_TOKEN);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  });
  return forward(operation)
})

const link = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <BaseWrapper>
            <NavigationBar />
            <ContentWrapper>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/asset-form" component={AssetForm} />
                <Route path="/asset-list" component={AssetList} />
                <Route path="/locations" component={Locations} />
                <Redirect to="/locations" />
              </Switch>
            </ContentWrapper>
          </BaseWrapper>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
