import http from './base-api-service';

const socialLoginUrl = `${process.env.REACT_APP_API_BASE_URL}/authenticate/google`

const login = (email, password) => http.post('/login', { email, password })

const list = (search) => http.get('/userList', { params: { search } })

const get = (id) => http.get(`/users/${id}`)

const profile = () => http.get('/users/me')

const register = (user) => http.post('/users', user)

const logout = () => http.post('/logout')

const service = {
    socialLoginUrl,
    login,
    list,
    get,
    profile,
    register,
    logout
}
  
export default service;