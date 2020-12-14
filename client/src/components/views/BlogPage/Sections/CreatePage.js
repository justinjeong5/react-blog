import React, { useEffect, useState } from 'react'
import { Typography, Form, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_BLOG_POST_REQUEST } from '../../../../_sagas/types'
import QuillEditor from '../../../editor/QuillEditor'
const { Title } = Typography;

function CreatePage() {

  const dispatch = useDispatch();
  const [content, setContent] = useState('')
  const [files, setFiles] = useState([]);

  const { currentUser } = useSelector(state => state.user)
  const { blogPostData } = useSelector(state => state.blog)

  useEffect(() => {
    if (blogPostData) {
      console.log(blogPostData, 'blogPostData')
    }
  }, [blogPostData])

  const onSubmit = () => {
    console.log(content, 'content')
    const variables = {
      content: content,
      userId: currentUser._id,
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

  return (
    <>
      <div style={{ maxWidth: 700, margin: "2rem auto" }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2} >블로그 글 작성</Title>
        </div>
        <QuillEditor
          placeholder={'블로그 글을 작성해주세요.'}
          onEditorChange={onEditorChange}
          onFilesChange={onFilesChange}
        />
        <Form onFinish={onSubmit}>
          <div style={{ textAlign: 'center', margin: '2rem' }}>
            <Button
              size='large'
              htmlType='submit'
              onSubmit={onSubmit}
            >
              글쓰기
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default CreatePage
