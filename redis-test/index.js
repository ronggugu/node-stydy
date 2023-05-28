const Redis = require('ioredis');

// 创建 Redis 客户端实例
const redis = new Redis({
  host: 'localhost', // Redis 服务器地址
  port: 6379, // Redis 服务器端口
});

// 连接到 Redis 服务器
redis.connect(() => {
  console.log('Connected to Redis server');

  // 执行一些 Redis 操作
  redis.set('key', 'value', (err, result) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Result:', result);
    }

    // 关闭 Redis 连接
    redis.disconnect();
  });
});

redis.set('name', 'redis', redis.print)
