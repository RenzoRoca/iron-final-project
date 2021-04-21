import { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { AuthContext } from "../contexts/AuthStore"
import userService from "../services/users-service"

function AuthCallback() {
  const { onUserChange, user } = useContext(AuthContext)
  const { replace } = useHistory()

  useEffect(() => {
    async function fetch() {
      const user = await userService.profile()

      onUserChange(user)
    }

    fetch()
  }, [onUserChange])

  useEffect(() => {
    if (user) {
      replace('/')
    }
  }, [user, replace])

  return null
}

export default AuthCallback
