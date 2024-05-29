import axiosInstance from './axiosInstance'

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async arg => {
    const isString = typeof arg === 'string'
    const { url, method, params, data, body } = isString
      ? { url: arg, method: 'GET' }
      : arg

    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        body
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      }
    }
  }

export default axiosBaseQuery
