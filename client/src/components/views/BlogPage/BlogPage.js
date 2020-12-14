import React, { useEffect, useState } from 'react'
import { Card, Icon, Avatar, Col, Row, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_BLOG_POSTS_REQUEST } from '../../../_sagas/types'

const { Title } = Typography;

function BlogPage() {

  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const { blogPosts, loadBlogPostsDone } = useSelector(state => state.blog)

  useEffect(() => {
    dispatch({
      type: LOAD_BLOG_POSTS_REQUEST
    })
  }, [])

  useEffect(() => {
    if (loadBlogPostsDone) {
      console.log(blogPosts)
    }
  }, [loadBlogPostsDone])

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2} >블로그 목록</Title>
      <Row gutter={[32, 16]}>

      </Row>
    </div>
  )
}

export default BlogPage
