import { useEffect, useState } from 'react'

const useUser = (email) => {
  const [isUser, setIsUser] = useState(false)
  const [isUserLoading, setIsUserLoading] = useState(true)
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3000/api/v1/users?searchTerm=${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log('em', data.data)
          setIsUser(data.data)
          setIsUserLoading(false)
        })
    }
  }, [email])
  return [isUser, isUserLoading]
}

export default useUser
