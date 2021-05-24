import axios from 'axios'

const devURL = 'http://localhost:3000/'

const createUser = function(name, password, email) {
  try {
    axios.post(`${devURL}/api/user`, {
      name,
      password,
      email
    });
  } catch (error) {
    console.log(error);
  }
}

export { createUser }