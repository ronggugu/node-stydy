const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'l846515032',
    port: '3306',
    database: 'myblog'
  }

  REDIS_CONF = {
    port: 6379,
    host: 'localhost'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'l846515032',
    port: '3306',
    database: 'myblog'
  }


  REDIS_CONF = {
    port: 6379,
    host: 'localhost'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}