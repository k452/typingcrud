import React, { useCallback, useEffect } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


const SignUp: React.FC = () => {
  const { isSignUpForm, ...signUpForm } = useAppSelector(state => state.form.signUpForm)

  const dispatch = useAppDispatch()
  const handleSetIsSignUpForm = useCallback(
    () => dispatch(actions.form.setIsSignUpForm(!isSignUpForm)),
    [dispatch, isSignUpForm]
  )
  const handleSetSignUpForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.form.setSignUpForm({
        ...signUpForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch, signUpForm]
  )
  const handleSignUpThunk = useCallback(
    () => dispatch(thunkActions.auth.signUpThunk()), [dispatch]
  )
  const handleSignUpVerifyThunk = useCallback(
    () => dispatch(thunkActions.auth.signUpVerifyThunk()), [dispatch]
  )
  const handleSignUpResendCodeThunk = useCallback(
    () => dispatch(thunkActions.auth.signUpResendCodeThunk()), [dispatch]
  )

  useEffect(() => {
    return () => {
      dispatch(actions.form.setSignUpForm({ email: '', password: '', verificationCode: ''}))
      dispatch(actions.form.setIsSignUpForm(true))
    }
  }, [dispatch])


  return (
    <React.Fragment>
      <div>
        <h1>{ isSignUpForm ? "Sign Up" : "Verify" }</h1>
        <input
          type="text"
          id="email"
          placeholder="email"
          value={signUpForm.email}
          onChange={handleSetSignUpForm}
        />
        <input
          type="text"
          id={ isSignUpForm ? "password" : "verificationCode" }
          placeholder={ isSignUpForm ? "password" : "verification code" }
          value={ isSignUpForm ? signUpForm.password : signUpForm.verificationCode}
          onChange={handleSetSignUpForm}
        />
        <button onClick={ isSignUpForm ? handleSignUpThunk : handleSignUpVerifyThunk }>
          { isSignUpForm ? "signu up" : "verify" }
        </button>
      </div>
      <div>
        <button onClick={handleSetIsSignUpForm}>
          { isSignUpForm ?  "go to verify form" : "go to sign up form" }
        </button>
        { !isSignUpForm &&
          <button onClick={handleSignUpResendCodeThunk}>resend verification code</button>
        }
      </div>
    </React.Fragment>
  )
}

export default SignUp
