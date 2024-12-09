import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  notification,
  Space,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import IMG from "../../assets/image51.png";
import handleAPI from "../../apis/handleAPI";
import { localDataNames } from "../../constants/appInfo";

const { Title, Paragraph, Text } = Typography;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const handleRegister = async (values) => {
    const api = "/auth/register";

    setIsLoading(true);
    try {
      const res = await handleAPI(api, "POST", values);
      console.log("check", res);

      if (res) {
        localStorage.setItem(localDataNames.authData, JSON.stringify(res.data));
      }
      notification.success({ message: res.message });
    } catch (error) {
      notification.error({ message: "Lỗi", description: error });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Card style={{ width: "80%" }}>
        <div className="text-center">
          <img src={IMG} style={{ height: 50, width: 50 }} />
          <Title level={2}>Create an account</Title>
          <Paragraph type="secondary">Start your 30-day free frial.</Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleRegister}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name={"name"}
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input
              placeholder="Enter your name"
              allowClear
              maxLength={100}
              type="email"
            />
          </Form.Item>

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
              () => ({
                validator(_, value) {
                  if (value.length < 8) {
                    return Promise.reject(
                      new Error("Mật khẩu phải chứa ít nhất 8 kí tự")
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
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
          <Text type="secondary">Must be at least 8 characters.</Text>
        </div>

        <div className="mt-4 mb-3">
          <Button
            onClick={() => form.submit()}
            type="primary"
            style={{ width: "100%" }}
            size="large"
          >
            Get started
          </Button>
        </div>
        <SocialLogin />

        <div className="mt-4 text-center">
          <Space>
            <Text type="secondary">Already have an account?</Text>
            <Text>
              <Link to={"/"}>Log in</Link>
            </Text>
          </Space>
        </div>
      </Card>
    </>
  );
};

export default Register;
