const Redis = require('ioredis')
const { REDIS_CONF } = require('../conf/db')

// 创建 Redis 客户端实例
const redis = new Redis({
  ...REDIS_CONF
});

// 错误监听
redis.on('error', err => {
  console.error('Error:', err);
})


function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  console.log('set key', key, val, redis.print);
  redis.set(key, val)
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redis.get(key, (err, val) => {
      if (err) {
        reject(err)
      }

      if (val == null) {
        resolve(null)
      }

      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })

  return promise
}

module.exports = {
  set,
  get
}


