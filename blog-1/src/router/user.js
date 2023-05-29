const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')




const handleUserRouter = (req, res) => {

  const method = req.method


  // 登录
  if(method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    
    const result = login(username, password)

    return result.then(data => {
      if(data.username) {

        // 操作 cookie
        // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)


        // 设置 session
        req.session.username = data.username
        req.session.realname = data.realname
        // console.log('req.session is ', req.session)

        // 同步到 redis
        set(req.sessionId, req.session)
        return new SuccessModel(data)
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }

  // if(method === 'GET' && req.path === '/api/user/login-test') {
  //   if(req.session.username) {
  //     return Promise.resolve(new SuccessModel(req.session))
  //   } else {
  //     return Promise.resolve(new ErrorModel('尚未登录'))
  //   }
  // }

  
}

module.exports = handleUserRouter