import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

import { cognitoUserPool } from 'utils/cognito/cognito-utils'
import { AppState, AppDispatch, actions } from 'state'


export const signInThunk = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch,
    state: AppState,
  }
  >(
    'auth/signInThunk',
    async (_, thunkAPI) => {
      const signInForm = thunkAPI.getState().form.signInForm
      const authenticationDetails = new AuthenticationDetails({
        Username: signInForm.email,
        Password: signInForm.password
      })
      const cognitoUser = new CognitoUser({
        Username: signInForm.email,
        Pool: cognitoUserPool
      })
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (res) => {
          thunkAPI.dispatch(actions.auth.setCognitoUser(true))
          thunkAPI.dispatch(actions.auth.setTokens({
            idToken: res.getIdToken().getJwtToken(),
            accessToken: res.getAccessToken().getJwtToken(),
            refreshToken: res.getRefreshToken().getToken()
          }))
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err))
        }
      })
    }
  )
