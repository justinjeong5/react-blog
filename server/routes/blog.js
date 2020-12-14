const express = require('express');
const router = express.Router();
const { Blog } = require('../models/Blog')

//=====================================
//                Blog
//=====================================


router.post('/createPost', (req, res) => {
  const blog = new Blog(req.body);

  blog.save((error, postInfo) => {
    if (error) {
      return res.status(401).json({ code: 'DatabaseError', message: '블로그 글을 저장하는 과정에서 문제가 발생했습니다.', error });
    }
    return res.status(200).json({ success: true, postInfo })
  })

})

module.exports = router