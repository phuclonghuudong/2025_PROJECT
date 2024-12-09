import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import IMG from "../../assets/image51.png";
import handleAPI from "../../apis/handleAPI";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    console.log(values, isRemember);
    const api = "/auth/login";
    setIsLoading(true);
    try {
      const res = await handleAPI(api, "POST", values);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Card style={{ width: "80%" }}>
        <div className="text-center">
          <img src={IMG} style={{ height: 50, width: 50 }} />
          <Title level={2}>Log in to your account</Title>
          <Paragraph type="secondary">
            Welcome back! Please enter your details.
          </Paragraph>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              allowClear
              maxLength={100}
              type="email"
            />
          </Form.Item>

          <Form.Item
            name={"password"}
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              allowClear
              maxLength={100}
            />
          </Form.Item>
        </Form>

        <div className="row">
          <div className="col">
            <Checkbox
              checked={isRemember}
              onChange={(val) => setIsRemember(val.target.checked)}
            >
              Remember
            </Checkbox>
          </div>

          <div className="col text-end">
            <Text>
              <Link to={"/"}>Forgot Password</Link>
            </Text>
          </div>
        </div>

        <div className="mt-4 mb-3">
          <Button
            onClick={() => form.submit()}
            type="primary"
            style={{ width: "100%" }}
            size="large"
          >
            Login
          </Button>
        </div>
        <SocialLogin />

        <div className="mt-4 text-center">
          <Space>
            <Text type="secondary">Don't have an account?</Text>
            <Text>
              <Link to={"/dang-ky"}>Sign-up</Link>
            </Text>
          </Space>
        </div>
      </Card>
    </>
  );
};

export default Login;
