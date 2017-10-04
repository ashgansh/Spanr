import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import {graphql, compose} from "react-apollo"
import gql from "graphql-tag"
import enhance from "./enhancer"

const LocationsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const Location = styled.div`
  border: solid;
  margin-bottom: 1em;
  height: ${props => 80 / props.locationCount}em;
  width: ${props => 80 / props.locationCount}em;
`

const locationCount = 3

export const Locations = ({data: {locations}}) =>
  <LocationsWrapper>
    {locations &&
      locations.map((location, index) =>
        <Location key={index}>{location.name}{location.id}</Location>
      )}
  </LocationsWrapper>

export const locationsQuery = gql`
  query allLocations {
  locations {
    name
    id
  }
}`

export const withLocation = compose(graphql(locationsQuery))

export default withLocation(Locations)
