import React from "react"
import styled from "styled-components"
import {withRouter} from "react-router"
import {GC_AUTH_TOKEN} from "../../constants"
import {Link} from "react-router-dom"

const NavBar = styled.div`
  height: 10%;
  width: calc(100% - 2em);
  position: fixed;
  margin: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: papayawhip;
`

const NavigationBar = ({history}) =>
  <NavBar>
    <Link to="/asset-list">
      List
    </Link>
    <Link to="/asset-form">
      Form
    </Link>
    {localStorage.getItem(GC_AUTH_TOKEN)
      ? <div
          className="ml1 pointer black"
          onClick={() => {
            localStorage.removeItem(GC_AUTH_TOKEN)
            history.push(`/login/`)
          }}
        >
          logout
        </div>
      : <Link to="/login">login</Link>}
  </NavBar>

export default withRouter(NavigationBar)
