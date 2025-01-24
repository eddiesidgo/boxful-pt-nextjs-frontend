'use client';

import React, { useState } from 'react';
import axiosClient from '@/lib/axiosClient';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Divider, Typography, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title } = Typography;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/auth/login', { email, password });
      const { access_token } = response.data;

      // Guardar el token en localStorage
      localStorage.setItem('access_token', access_token);

      // Redirigir al usuario
      router.push('/');
    } catch (error: any) {
      console.error('Error iniciando sesión:', error.response?.data || error.message);
    }
  };

  return (
    <Row justify="center" style={{ minHeight: '0vh', alignItems: 'center' }}>
      <Col xs={20} sm={18} md={12} lg={8} xl={6}>
        <div style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <Title level={2} style={{ textAlign: 'center' }}>Iniciar sesión</Title>

          <Form onSubmitCapture={handleLogin} layout="vertical">
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor ingresa tu email!' }]}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                prefix={<UserOutlined />}
                placeholder="Ingresa tu email"
              />
            </Form.Item>

            <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined />}
                placeholder="Ingresa tu contraseña"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Iniciar sesión
              </Button>
            </Form.Item>

            <Divider />

            <Row justify="center">
              <Col>
                <Link href="/register">Registrate</Link>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
