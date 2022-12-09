import {Button, Card, Checkbox, Form, Input, message} from "antd";
import logo from '../../img/logo.png'
import './index.scss'
import {useStore} from "../../store";
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const {loginStore} = useStore();
  const navigate = useNavigate()
  const onFinish = (values) => {
    try {
      loginStore.getToken({
        mobile: values.mobile,
        code: values.password
      }).then(()=>{
        navigate('/', {replace: false})
        message.success('登录成功')
      })
    }catch (e){
      message.error('登录失败')
    }

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt=""/>
        {/* 登录表单 */}
        <Form
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{remember: true}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: '请输入手机号!',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur'
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入验证码!',
              },
              {len: 6, message: '验证码6个字符', validateTrigger: 'onBlur'},
            ]}
          >
            <Input size="large" placeholder="请输入验证码"/>
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
