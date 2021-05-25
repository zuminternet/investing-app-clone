import axios from 'axios'

const devURL = 'http://localhost:3000/'


export interface createUserInfo {
  name: string,
  email: string,
  password:string
}

export interface loginUserByEmailInfo {
  email:string,
  password: string
}


const createUser = async function({name, email, password}: createUserInfo) {
  try {
    const result = await axios.post(`${devURL}/api/user`, {
      name,
      email,
      password
    });

    if (result) {
      return result
    }
    
  } catch (error) {
    console.log(error);
  }
}

const getUser = async function () {
  try {
    const result = await axios.get(`${devURL}/api/user`, {withCredentials:true})

    if (result) {
      return result
    }

  } catch (error) {
    console.log(error)
  }  
}

const loginUserByEmail = async function({email, password}: loginUserByEmailInfo) {
  try {
    const result = await axios.post(`${devURL}/api/auth/email`, {
      email,
      password
    })

    if (result) {
      return result
    }
  } catch (error) {
    console.log(error)
    
  }
}



export { createUser, loginUserByEmail, getUser }