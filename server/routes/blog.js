const express = require('express');
const router = express.Router();
const { Blog } = require('../models/Blog')

const multer = require('multer')


// MULTER STORAGE CONFIGURATION
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpeg' || ext !== '.jpg' || ext !== '.png' || ext !== '.mp4') {
      return callback(res.status(400).end('jpeg, jpg, png, mp4 파일만 업로드 가능합니다.'), false);
    }
    callback(null, true)
  }
})

const upload = multer({ storage: storage }).single('file');

//=====================================
//                Blog
//=====================================


router.post('/createPost', (req, res) => {
  const blog = new Blog({ content: req.body.content, writer: req.body.userId });

  blog.save((error, postInfo) => {
    if (error) {
      console.error(error);
      return res.status(401).json({ code: 'DatabaseError', message: '블로그 글을 저장하는 과정에서 문제가 발생했습니다.', error });
    }
    return res.status(200).json({ success: true, postInfo })
  })
})

router.post('/uploadfiles', (req, res) => {
  upload(req, res, error => {
    if (error) {
      console.error(error);
      return res.status(401).json({ code: 'MulterError', message: '파일을 업로드하는 과정에서 문제가 발생했습니다.', error });
    }
    return res.status(200).json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
  })
})

router.get('/blogs', (req, res) => {
  Blog.find()
    .populate('writer')
    .exec((error, blogs) => {
      if (error) {
        console.error(error);
        return res.status(401).json({ code: 'DatabaseError', message: '블로그 글을 불러오는 과정에서 문제가 발생했습니다.', error });
      }
      return res.status(200).json({ success: true, blogs })
    })
})

router.get('/blog/:postId', (req, res) => {
  Blog.findOne({ '_id': req.params.postId })
    .populate('writer')
    .exec((error, blog) => {
      if (error) {
        console.error(error);
        return res.status(401).json({ code: 'DatabaseError', message: '블로그 글을 불러오는 과정에서 문제가 발생했습니다.', error });
      }
      return res.status(200).json({ success: true, blog })
    })
})

module.exports = router