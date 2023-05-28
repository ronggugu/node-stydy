
const { exec } = require('../db/mysql')


const getList = (author, keyword) => {

  let sql = `select * from blogs where 1=1 `
  if(author) {
    sql += `and author='${author}' `
  }

  if(keyword) {
    sql += `and title like '%${keyword}%' `
  }

  sql += `order by createtime desc;`
  
  return exec(sql)
  
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(row => row[0])
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content 属性
  // console.log('newBlog blogData...', blogData)
  // return {
  //   id: 3 // 表示新建博客，插入到数据表里面的 id
  // }

  const { title, content, author } = blogData
  const createTime = Date.now()

  // const sql = `
  //   insert into blogs (title, content, createtime, author)
  //   values ('${title}', '${content}', ${createTime}, '${author}');
  // `
  const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createTime}, '${author}');`
  return exec(sql).then(insertData => {
    console.log('insertData is...', insertData)
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象，包含 title content 属性
  // console.log('updateBlog...', id, blogData)
  // return true

  const { title, content } = blogData
  const sql = `update blogs set title='${title}', content='${content}' where id=${id};`
  return exec(sql).then(updateData => {
    console.log('updateData is...', updateData)
    if(updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}
const delBlog = (id, author) => {
  // id 就是要删除博客的 id

  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then(delData => {
    console.log('delData is...', delData)
    if(delData.affectedRows > 0) {
      return true
    }
    return false
  })
} 
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}