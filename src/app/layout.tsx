"use client";
import './globals.css';
import { Layout, Menu } from "antd";
import React, { useEffect } from "react";
import { Inter } from "next/font/google"
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] })
const { Header, Content } = Layout;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      // Redirige al login si no hay token usando Router.push
      router.push('/login');
    }
  }, []);
  return (
    <html lang="es">
      <body className={inter.className}>
        <Layout style={{ minHeight: "98vh" }}>
          <Header
            style={{
              background: "#fff",
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                marginRight: "auto",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              <img
                src="/favicon.ico"
                style={{ height: "24px", marginRight: "8px", verticalAlign: "middle" }}
              />
            </div>
            <Menu mode="horizontal" theme="light" />
          </Header>
          <Content style={{ margin: "0px", padding: "24px", background: "#F3F4F8" }}>
            {children}
          </Content>
        </Layout>
      </body>
    </html>
  );
}
