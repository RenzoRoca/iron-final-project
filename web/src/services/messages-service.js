import http from './base-api-service';

const list = (search) => http.get('/messages', { 
  params: { search } })

const get = (id) => http.get(`/messages/${id}`)

const create = (message) => {

  const data = new FormData()

  Object.keys(message).forEach(key => {
    if (Array.isArray(message[key])) {
      message[key].forEach(value => data.append(`${key}[]`, value))
    } else data.append(key, message[key])
  })

  return http.post(`/messages`, data)
}

const remove = (id) => http.delete(`/messages/${id}`)

const update = (message) => http.put(`/messages/${message.id}`, message)

const service = {
  create,
  update,
  remove,
  list,
  get
}

export default service;
