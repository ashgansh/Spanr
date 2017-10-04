import React from "react"
import PropTypes from "prop-types"
import {graphql, compose} from "react-apollo"
import gql from "graphql-tag"
import List from "../Wrappers/List"
import Delete from "./DeleteAsset"
import enhance from "./enhancer"

const renderAsset = (asset, index) =>
  <List key={index}>
    <Delete assetID={parseInt(asset.id, 10)} />
    <div>{`${asset.name}@${asset.location.name} -> ${asset.lifespan}`}</div>
  </List>

export const Users = enhance(({data: {assets}}) =>
  <div>
    <ul>
      {assets && assets.map((asset, index) => renderAsset(asset, index))}
    </ul>
  </div>
)

Users.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    assets: PropTypes.array,
    error: PropTypes.bool
  }).isRequired
}

export const assetsQuery = gql`
query assets{
  assets {
    id
    name
    lifespan
    location {
      name
    }
  }
}`

export const withAsset = compose(graphql(assetsQuery))

export default withAsset(Users)
