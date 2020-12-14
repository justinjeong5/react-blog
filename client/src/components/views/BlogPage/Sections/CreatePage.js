import React, { useEffect, useState } from 'react'
import { Typography, Form, Button, message, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CREATE_BLOG_POST_REQUEST, RESET_BLOG_POST } from '../../../../_sagas/types'
import QuillEditor from '../../../editor/QuillEditor'
const { Title } = Typography;

function CreatePage(props) {

  const dispatch = useDispatch();
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const { currentUser } = useSelector(state => state.user)
  const { createBlogPostLoading, createBlogPostDone } = useSelector(state => state.blog)

  let timer;

  useEffect(() => {
    if (createBlogPostDone) {
      setLoading(true)
      message.success('게시글이 등록되었습니다.')
      timer = setTimeout(() => {
        dispatch({
          type: RESET_BLOG_POST
        })
        props.history.push('/blog')
      }, 2000)
    }

  }, [createBlogPostDone])

  const onSubmit = () => {
    if (content === '' || title === '') return;

    const variables = {
      content: content,
      title: title,
      writer: currentUser._id,
    }
    dispatch({
      type: CREATE_BLOG_POST_REQUEST,
      payload: variables,
    })

    setContent('');
  }

  const onEditorChange = (value) => {
    setContent(value)
  }

  const onFilesChange = (files) => {
    setFiles(files)
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  return (
    <>
      <div style={{ maxWidth: 700, margin: "2rem auto" }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2} >블로그 글 작성</Title>
        </div>
        <Form onFinish={onSubmit}>
          <Input value={title} onChange={onChangeTitle} placeholder='제목을 입력하세요' />

          <QuillEditor
            placeholder={'블로그 글을 작성해주세요.'}
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
          />

          <div style={{ textAlign: 'center', margin: '2rem' }}>
            <Button
              size='large'
              htmlType='submit'
              onSubmit={onSubmit}
              disabled={loading}
              loading={createBlogPostLoading}
            >
              글쓰기
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default withRouter(CreatePage);
