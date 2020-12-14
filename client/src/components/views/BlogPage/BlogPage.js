import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Avatar, Col, Row, Typography } from 'antd'
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'
import { LOAD_BLOG_POSTS_REQUEST } from '../../../_sagas/types'
import LoadingPage from '../LoadingPage/LoadingPage'

const { Title } = Typography;

function BlogPage() {

  const dispatch = useDispatch();
  const { blogPosts, loadBlogPostsDone, loadBlogPostsLoading } = useSelector(state => state.blog)

  useEffect(() => {
    dispatch({
      type: LOAD_BLOG_POSTS_REQUEST
    })
  }, [])

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2} >블로그 목록</Title>
      {loadBlogPostsLoading && <LoadingPage />}
      {!loadBlogPostsDone && blogPosts &&
        <Row gutter={[32, 16]}>
          {/* {renderCards} */}
        </Row>
      }
    </div>
  )
}

export default BlogPage
