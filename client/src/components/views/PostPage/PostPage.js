import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { PageHeader, Descriptions } from 'antd'
import moment from 'moment'
import 'moment/locale/ko'
import { LOAD_BLOG_POST_REQUEST } from '../../../_sagas/types';
import LoadingPage from '../LoadingPage/LoadingPage';

function PostPage(props) {

  const dispatch = useDispatch();
  const { currentBlogPost, loadBlogPostLoading, loadBlogPostDone } = useSelector(state => state.blog)

  useEffect(() => {
    dispatch({
      type: LOAD_BLOG_POST_REQUEST,
      payload: props.match.params.postId,
    })
  }, [])

  return (
    <>
      {loadBlogPostLoading && <LoadingPage />}
      {loadBlogPostDone && <>
        <div style={{ width: '80%', backgroundColor: '#f5f5f5', padding: 24, margin: '3rem auto' }}>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={currentBlogPost.title}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="작성자">{currentBlogPost.writer.name}</Descriptions.Item>
              <Descriptions.Item label='작성일'>{moment(currentBlogPost.createdAt).format('a h:mm:ss, YYYY년 MMMM Do')}</Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <div style={{ backgroundColor: '#f5f5f5', margin: '3rem auto', height: '100%' }}>
            <div dangerouslySetInnerHTML={{ __html: currentBlogPost.content }} />
          </div>
        </div>
      </>}
    </>
  )
}

export default withRouter(PostPage)
