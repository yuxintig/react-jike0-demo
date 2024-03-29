import {getToken} from "../utils";
import {Navigate} from "react-router-dom";

function AuthRoute({children}) {
  const isToken = getToken()
  console.log("token", isToken)

  if (isToken) {
    return <>{children}</>
  } else {
    return <Navigate to='/login' replace/>
  }
}

export {
  AuthRoute
}
