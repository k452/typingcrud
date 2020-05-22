import { createAsyncThunk } from '@reduxjs/toolkit'
import { CognitoUser } from 'amazon-cognito-identity-js'

import { ThunkAPI } from 'utils/thunk'
import { cognitoUserPool } from 'utils/cognito/cognito-utils'


export const forgotPassword = createAsyncThunk<void, void, ThunkAPI>(
  'auth/forgotPasswordThunk',
  async (_, thunkAPI) => {
    const { email } = thunkAPI.getState().authForm.forgotPasswordForm
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: cognitoUserPool
    })
    cognitoUser.forgotPassword({
      onSuccess: () => {
        alert('success')
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
)


export const submitNewPassword = createAsyncThunk<void, void, ThunkAPI>(
  'auth/submitNewPasswordThunk',
  async (_, thunkAPI) => {
    const { email, newPassword, verificationCode } = thunkAPI.getState().authForm.forgotPasswordForm
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: cognitoUserPool
    })
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        alert('success')
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
)
