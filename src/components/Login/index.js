import React, {Component} from "react"
import {displayLoading, displayError, displayBlankState} from "../branches"
import {compose} from "recompose"
import styled from "styled-components"
import {GC_AUTH_TOKEN} from "../../constants"
import {graphql} from "react-apollo"
import gql from "graphql-tag"

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

const UserLogin = ({email, password, updateEmail, updatePassword}) => [
  <input
    key="email"
    value={email}
    onChange={e => updateEmail(e.target.value)}
    type="text"
    placeholder="Your email address"
  />,
  <input
    key="password"
    value={password}
    onChange={e => updatePassword(e.target.value)}
    type="password"
    placeholder="Choose a safe password"
  />
]

const Error = styled.div`
  color: red;
`
class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: "",
    password: "",
    name: "",
    error: false
  }

  updateEmail(email) {
    this.setState({email, error: false})
  }
  updatePassword(password) {
    this.setState({password, error: false})
  }

  render() {
    const {error} = this.state
    return (
      <div>
        <h4>{this.state.login ? "Login" : "Sign Up"}</h4>
        <StyledForm>
          {!this.state.login &&
            <input
              value={this.state.name}
              onChange={e => this.setState({name: e.target.value})}
              type="text"
              placeholder="Your name"
            />}
          <UserLogin
            email={this.state.email}
            password={this.state.password}
            updateEmail={email => this.updateEmail(email)}
            updatePassword={password => this.updatePassword(password)}
          />
          <button onClick={e => this._confirm(e)}>
            {this.state.login ? "login" : "create Account"}
          </button>
        </StyledForm>
        <div>
          {error && <Error>Invalid Credentials</Error>}

          <div
            className="pointer button"
            onClick={() => this.setState({login: !this.state.login})}
          >
            {this.state.login
              ? "need to create an account?"
              : "already have an account?"}
          </div>
        </div>
      </div>
    )
  }

  _confirm = async e => {
    e.preventDefault()
    const {name, email, password, login} = this.state
    if (login) {
      const result = await this.props
        .signinUserMutation({
          variables: {
            email,
            password
          }
        })
        .catch(e => this.setState({error: true}))

      if (result && result.data) {
        const token = result.data.login.token
        this._saveUserData(token)
        this.props.history.push(`/`)
      }
    } else {
      const result = await this.props.createUserMutation({
        variables: {
          name,
          email,
          password
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token
      this._saveUserData(id, token)
    }
  }

  _saveUserData = token => {
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
    name: $name,
    authProvider: {
      email: {
        email: $email,
        password: $password
      }
    }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
      }) {
      token
      user {
        id
      }
    }
  }
`

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    login(
    email: $email,
    password: $password
    ) {
      token
    } 
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, {name: "createUserMutation"}),
  graphql(SIGNIN_USER_MUTATION, {name: "signinUserMutation"})
)(Login)
