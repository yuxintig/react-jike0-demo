import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './index.scss'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import {useEffect, useRef, useState} from "react";
import {http} from '../../utils'

const {Option} = Select

const Publish = () => {
  const [channels, setChannels] = useState([])
  const [fileList, setFileList] = useState([])
  const [imgCount, setImgCount] = useState(1)
  const fileListRef = useRef([])

  const onUploadChange = info => {
    const fileList = info.fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    setFileList(fileList)
    fileListRef.current = fileList
  }

  const changeType = e => {
    const count = e.target.value
    setImgCount(count)
    if (count === 1) {
      // 单图，只展示第一张
      const firstImg = fileListRef.current[0]
      setFileList(!firstImg ? [] : [firstImg])
    } else if (count === 3) {
      // 三图，展示所有图片
      setFileList(fileListRef.current)
    }
  }



  useEffect(() => {
    async function fetchChannels() {
      const res = await http.get('/channels')
      setChannels(res.data.channels)
    }

    fetchChannels().then(() => {
    })
  }, [])


  const  onFinish=async (values) => {
    console.log(fileList)
    const {channel_id, content, title, type} = values
    const params = {
      channel_id,
      content,
      title,
      type: type ? type : 1,
      cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }
    await http.post('/mp/articles?draft=false', params)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{span: 4}}
          wrapperCol={{span: 16}}
          initialValues={{content: ''}}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{required: true, message: '请输入文章标题'}]}
          >
            <Input placeholder="请输入文章标题" style={{width: 400}}/>
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{required: true, message: '请选择文章频道'}]}
          >
            <Select placeholder="请选择文章频道" style={{width: 200}}>
              {channels.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType} defaultValue={imgCount}>
                <Radio value={1} >单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                maxCount={ imgCount }
                multiple={ imgCount > 1 }
              >
                <div style={{marginTop: 8}}>
                  <PlusOutlined/>
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{required: true, message: '请输入文章内容'}]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{offset: 4}}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
