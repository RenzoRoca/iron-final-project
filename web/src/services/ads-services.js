import http from './base-api-service';

const list = (search) => http.get('/ads', { params: { search } })

const get = (id) => http.get(`/ads/${id}`)

const create = (ad) => {
  console.log(ad);
  const data = new FormData()

  Object.keys(ad).forEach(key => {
    if (Array.isArray(ad[key])) {
      ad[key].forEach(value => data.append(`${key}[]`, value))
    } else data.append(key, ad[key])
  })

  return http.post(`/ads`, data)
}

const remove = (id) => http.delete(`/ads/${id}`)

const update = (ad) => http.put(`/ads/${ad.id}`, ad)

const service = {
  create,
  update,
  remove,
  list,
  get
}

export default service;
