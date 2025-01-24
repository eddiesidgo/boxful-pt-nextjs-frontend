"use client";
import './globals.css';
import { Layout, Menu } from "antd";
import React from "react";
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const { Header, Content } = Layout;

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
            <Menu mode="horizontal" theme="light" items={[{ key: "1", label: "Shop 1" }]} />
          </Header>
          <Content style={{ margin: "0px", padding: "24px", background: "#F3F4F8" }}>
            {children}
          </Content>
        </Layout>
      </body>
    </html>
  );
}
