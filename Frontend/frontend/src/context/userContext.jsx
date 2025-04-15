import React, { createContext } from 'react'
export  const userDataContext=createContext();

const userContext = ({children}) => {
  const [user, setuser] = useState({
    email:'',
    fullName:{
      firstName:' ',
      lastName:' '
    }
  })
  return (
    <div>
      <userDataContext.Provider value={[user,setuser]}>
      {children}
      </userDataContext.Provider></div>

  )
}

export default userContext