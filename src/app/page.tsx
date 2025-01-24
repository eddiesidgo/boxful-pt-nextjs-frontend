"use client";

import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row } from "antd";
import axios from "axios";
import { useState } from "react";
import moment from "moment";


export default function Home() {
  const [packages, setPackages] = useState([{ length: "", height: "", width: "", content: "" }]);

  const addPackage = () => {
    setPackages([...packages, { length: "", height: "", width: "", content: "" }]);
  };

  const removePackage = (index: number) => {
    const newPackages = packages.filter((_, i) => i !== index);
    setPackages(newPackages);
  };

  const onFinish = async (values: unknown) => {
    // Incluir los paquetes en los datos a enviar
    const orderData = {
      ...values,
      packages: packages.map((pkg) => ({
        length: pkg.length,
        height: pkg.height,
        width: pkg.width,
        content: pkg.content,
      })),
      date: values.date.format(), // Convertir la fecha al formato ISO 8601
    };

    try {
      // Enviar la solicitud a la API de NestJS
      const response = await axios.post("http://localhost:4000/api/order", orderData);
      console.log("Orden creada con éxito:", response.data);
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Error al enviar el formulario:", errorInfo);
  };


  return (
    <div className="App">
      <h1 className="flex items-center justify-center font-sans text-2xl">Crea una orden</h1>
      <h3 className="flex items-center justify-center font-sans ">
        Dale una ventaja competitiva a tu negocio con entregas el mismo día (Área Metropolitana) y el día siguiente a nivel nacional.
      </h3>
      <br />
      <div className="flex items-center justify-center ">
        <Col span={12}>
          <Card bordered={false}>
          <Form
              name="orderForm"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              {/* Campos de entrada del formulario */}
              <Form.Item
                label="Nombre"
                name="firstName"
                rules={[{ required: true, message: "Por favor, ingresa el nombre" }]}
              >
                <Input placeholder="Escribe el nombre" />
              </Form.Item>

              <Form.Item
                label="Apellido"
                name="lastName"
                rules={[{ required: true, message: "Por favor, ingresa el apellido" }]}
              >
                <Input placeholder="Escribe el apellido" />
              </Form.Item>

              <Form.Item
                label="Correo Electrónico"
                name="email"
                rules={[{ required: true, message: "Por favor, ingresa el correo electrónico" }]}
              >
                <Input placeholder="Escribe el correo electrónico" />
              </Form.Item>

              <Form.Item
                label="Teléfono"
                name="phone"
                rules={[{ required: true, message: "Por favor, ingresa el teléfono" }]}
              >
                <Input placeholder="Escribe el teléfono" />
              </Form.Item>

              <Form.Item
                label="Dirección de Envío"
                name="collectionAddress"
                rules={[{ required: true, message: "Por favor, ingresa la dirección de envío" }]}
              >
                <Input placeholder="Escribe la dirección de envío" />
              </Form.Item>

              <Form.Item
                label="Dirección del Destinatario"
                name="recipientAddress"
                rules={[{ required: true, message: "Por favor, ingresa la dirección del destinatario" }]}
              >
                <Input placeholder="Escribe la dirección del destinatario" />
              </Form.Item>

              <Form.Item
                label="Departamento"
                name="department"
                rules={[{ required: true, message: "Por favor, ingresa el departamento" }]}
              >
                <Input placeholder="Escribe el departamento" />
              </Form.Item>

              <Form.Item
                label="Municipio"
                name="municipality"
                rules={[{ required: true, message: "Por favor, ingresa el municipio" }]}
              >
                <Input placeholder="Escribe el municipio" />
              </Form.Item>

              <Form.Item
                label="Punto de Referencia"
                name="referencePoint"
                rules={[{ required: true, message: "Por favor, ingresa el punto de referencia" }]}
              >
                <Input placeholder="Escribe el punto de referencia" />
              </Form.Item>

              <Form.Item
                label="Instrucciones"
                name="instructions"
                rules={[{ required: true, message: "Por favor, ingresa las instrucciones" }]}
              >
                <Input.TextArea placeholder="Escribe las instrucciones" />
              </Form.Item>

              <Form.Item
                label="Fecha de Envío"
                name="date"
                rules={[{ required: true, message: "Por favor, ingresa la fecha de envío" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  defaultValue={moment("2025-01-23", "YYYY-MM-DD")}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              {/* Aquí agregamos los paquetes dinámicos */}
              <Form.Item label="Paquetes">
                {packages.map((pkg, index) => (
                  <div key={index} style={{ marginBottom: "16px" }}>
                    <Row gutter={16}>
                      <Col span={5}>
                        <Form.Item
                          label="Largo"
                          name={["packages", index, "length"]}
                          rules={[{ required: true, message: "Por favor, ingresa el largo del paquete" }]}
                        >
                          <InputNumber
                            value={pkg.length}
                            onChange={(value) => {
                              const updatedPackages = [...packages];
                              updatedPackages[index].length = value;
                              setPackages(updatedPackages);
                            }}
                            min={1}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label="Alto"
                          name={["packages", index, "height"]}
                          rules={[{ required: true, message: "Por favor, ingresa el alto del paquete" }]}
                        >
                          <InputNumber
                            value={pkg.height}
                            onChange={(value) => {
                              const updatedPackages = [...packages];
                              updatedPackages[index].height = value;
                              setPackages(updatedPackages);
                            }}
                            min={1}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label="Ancho"
                          name={["packages", index, "width"]}
                          rules={[{ required: true, message: "Por favor, ingresa el ancho del paquete" }]}
                        >
                          <InputNumber
                            value={pkg.width}
                            onChange={(value) => {
                              const updatedPackages = [...packages];
                              updatedPackages[index].width = value;
                              setPackages(updatedPackages);
                            }}
                            min={1}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={9}>
                        <Form.Item
                          label="Contenido"
                          name={["packages", index, "content"]}
                          rules={[{ required: true, message: "Por favor, ingresa el contenido del paquete" }]}
                        >
                          <Input
                            value={pkg.content}
                            onChange={(e) => {
                              const updatedPackages = [...packages];
                              updatedPackages[index].content = e.target.value;
                              setPackages(updatedPackages);
                            }}
                            placeholder="Contenido"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Button danger onClick={() => removePackage(index)} style={{ marginTop: "8px" }}>
                      Eliminar Paquete
                    </Button>
                  </div>
                ))}
                <Button type="dashed" onClick={addPackage} style={{ width: "100%" }}>
                  Añadir Paquete
                </Button>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  Crear Orden
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </div>
    </div>
  );
}
