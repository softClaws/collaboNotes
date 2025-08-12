import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isCreator = false
    let isContributor = false
    let status = "Reader"

    if(token){
        const decode = jwtDecode(token)
        const {username, roles} = decode.UserInfo
    isContributor = roles.includes('Contributor')
    isCreator = roles.includes('Creator')
    if(isCreator) status = "Creator"
    if(isContributor) status = "Contributor"
    return {username, roles, isCreator, isContributor, status}
    }
  return {username: '', roles:[], isCreator, isContributor, status}
}
