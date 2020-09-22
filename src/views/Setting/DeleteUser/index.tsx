import React from 'react'
import { DeleteUser } from 'views/Setting/DeleteUser/DeleteUser'

const UserSetting: React.FC = () => {
  return (
    <React.Fragment>
      <h2>アカウント削除</h2>
      <DeleteUser/>
    </React.Fragment>
  )
}

export default UserSetting
