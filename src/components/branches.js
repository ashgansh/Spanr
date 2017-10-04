import React from "react"
import {renderComponent, branch} from "recompose"
import {Loading, Err, BlankState} from "./components"

const displayLoading = branch(
  props => props.data.loading,
  renderComponent(Loading)
)

const displayError = branch(
  ({data: {error}}) => error && Object.keys(error).length > 0,
  renderComponent(Err)
)

const displayBlankState = branch(
  props => props.data.assets && props.data.assets.length === 0,
  renderComponent(BlankState)
)

export {displayLoading, displayError, displayBlankState}
