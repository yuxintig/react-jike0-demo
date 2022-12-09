import {makeAutoObservable} from "mobx";
import {http, setToken, getToken} from "../utils";


export default class LoginStore {
  token = getToken() || ''

  constructor() {
    makeAutoObservable(this)
  }

  getToken = async ({mobile, code}) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile, code
    })
    this.token = res.data.token;

    console.log(this.token )
    setToken(this.token)
  }
}




