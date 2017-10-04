import React from "react"
import {graphql} from "react-apollo"
import gql from "graphql-tag"
import Button from "../Wrappers/Button"
import enhance from "./enhancer"
import {StyledForm} from "../Wrappers/Form"
import {Field, reduxForm} from "redux-form"
import {compose} from "recompose"

const AssetForm = ({handleSubmit, pristine, reset, submitting, data: { locations }}) =>
  <StyledForm onSubmit={handleSubmit}>
    <Field name="name" component="input" type="text" placeholder="Yo" />
    <Field
      name="locationId"
      component="select"
      placeholder="Location"
    >
      {locations && locations.map((location) => <option value={location.id}>{location.name}</option>)}
    </Field>
    <Field
      name="lifespan"
      component="input"
      type="text"
      placeholder="Lifespan"
    />
    <button type="submit" disabled={pristine || submitting}>Submit</button>
    <button type="button" disabled={pristine || submitting} onClick={reset}>
      Clear Values
    </button>
  </StyledForm>

const createAssetMutation = gql`
mutation createAsset($name: String!, $locationId: Int!, $lifespan: String!) {
  createAsset(name: $name, locationId: $locationId, lifespan: $lifespan)  {
  id
  name
  lifespan
    location {
      id
    }
  }
}
`
export const locationsQuery = gql`
  query allLocations {
  locations {
    name
    id
  }
}`

const updateQueries = {
  assets: (prev, {mutationResult}) => {
    const newAsset = mutationResult.data.create_asset
    if (Array.isArray(prev.assets)) {
      prev.assets.push(newAsset)
    }
    return prev
  }
}

const AssetFormWithMutation = graphql(createAssetMutation, {
  props: ({mutate}) => ({
    onSubmit: ({name, locationId, lifespan}) => {
      return mutate({
        variables: {
          name,
          locationId: parseInt(locationId, 10),
          lifespan: parseInt(lifespan, 10)
        }
      })
    }
  })
})

const AssetFormWithData = graphql(locationsQuery)


const form = reduxForm({
  form: "asset"
})

export default compose(AssetFormWithMutation, AssetFormWithData, form)(AssetForm)
