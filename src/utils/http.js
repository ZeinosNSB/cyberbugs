import axios from 'axios'

import { DOMAIN_API } from './settingSystems'

const http = axios.create({
  baseURL: DOMAIN_API,
  timeout: 10000
})

export default http
