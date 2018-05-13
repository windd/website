import axios from 'axios'

export default {
  ajaxGet (api, cb) {
    axios.get(api)
      .then(cb)
      .catch(err => {
        console.log(api)
        console.log(err)
      })
  },
  ajaxPost (api, post, cb) {
    console.log(api)
    axios.post(api, post)
      .then(cb)
      .catch(err => {
        console.log(api, post)
        console.log(err)
      })
  }
}
