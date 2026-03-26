import React from 'react';
import { Row, Col, Input, Button, Typography, Space, Popconfirm, Card, Tag, Tooltip, Checkbox, Divider, List, Badge } from 'antd';
import { PlusOutlined, DeleteOutlined, PaperClipOutlined, ExportOutlined, CameraOutlined, GoogleOutlined, CheckCircleOutlined, HomeOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { InspeccionData, InspeccionAction, FotoEnlace, FotoCheck } from '../types';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Props {
  data: InspeccionData;
  dispatch: React.Dispatch<InspeccionAction>;
}

export function FormFotos({ data, dispatch }: Props) {
  const handleAdd = () => {
    dispatch({ type: 'ADD_FOTO_ENLACE' });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_FOTO_ENLACE', id });
  };

  const handleChange = (id: string, field: keyof FotoEnlace, value: string) => {
    dispatch({ type: 'UPDATE_FOTO_ENLACE', id, field, value });
  };

  const handleCheckChange = (id: string, field: keyof FotoCheck, value: any) => {
    dispatch({ type: 'UPDATE_FOTO_CHECK', id, field, value });
  };

  const isDriveLink = (url: string) => url.includes('drive.google.com') || url.includes('docs.google.com');

  // Separar checks globales de los checks por nivel
  const globalChecks = data.fotosChecklist?.filter(f => !f.key.startsWith('piso-')) || [];
  const levelChecks = data.fotosChecklist?.filter(f => f.key.startsWith('piso-')) || [];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ea7048]/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
      
      <Title level={4} className="mb-6 !text-[#ea7048] flex items-center gap-2">
        <span className="bg-[#ea7048]/10 px-3 py-1 rounded text-sm uppercase tracking-wider font-bold">5</span>
        Panel Fotográfico y Trazabilidad
      </Title>

      <Row gutter={[24, 24]}>
        {/* COLUMNA 1: REGISTRO EXTERIOR / GLOBAL */}
        <Col xs={24} lg={8}>
          <div className="h-full p-4 bg-gray-50/50 rounded-xl border border-gray-100 shadow-sm">
            <Title level={5} className="!text-[#2f4860] mb-4 flex items-center gap-2 text-sm uppercase tracking-tight">
              <EnvironmentOutlined className="text-[#ea7048]" /> Entorno y Exterior
            </Title>
            <Space direction="vertical" className="w-full" size="middle">
              {globalChecks.map((item) => (
                <Card size="small" key={item.id} className={`border-none shadow-sm ${item.checked ? 'bg-green-50' : 'bg-white'}`}>
                  <Checkbox 
                    checked={item.checked}
                    onChange={(e) => handleCheckChange(item.id, 'checked', e.target.checked)}
                    className="font-semibold text-xs mb-2"
                  >
                    {item.label}
                  </Checkbox>
                  {item.checked && (
                    <Input 
                      size="small"
                      placeholder="URL de Drive" 
                      value={item.url}
                      onChange={(e) => handleCheckChange(item.id, 'url', e.target.value)}
                      prefix={<PaperClipOutlined className="text-gray-400" />}
                      className="text-[10px]"
                    />
                  )}
                </Card>
              ))}
            </Space>
          </div>
        </Col>

        {/* COLUMNA 2: REGISTRO INTERIOR POR NIVELES (DINÁMICO) */}
        <Col xs={24} lg={16}>
          <div className="h-full p-4 bg-blue-50/20 rounded-xl border border-blue-50 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <Title level={5} className="!text-[#2f4860] !mb-0 flex items-center gap-2 text-sm uppercase tracking-tight">
                <HomeOutlined className="text-blue-500" /> Registro Interior por Niveles
              </Title>
              <Badge count={`${levelChecks.filter(f => f.checked).length} / ${data.numeroPisos}`} color="#52c41a" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {levelChecks.map((item) => (
                <Card 
                  size="small" 
                  key={item.id} 
                  className={`border-none shadow-sm transition-all ${item.checked ? 'bg-white ring-1 ring-green-400' : 'bg-white/60 hover:bg-white'}`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Checkbox 
                        checked={item.checked}
                        onChange={(e) => handleCheckChange(item.id, 'checked', e.target.checked)}
                        className="font-bold text-xs"
                      >
                        {item.label}
                      </Checkbox>
                      {item.checked && <CheckCircleOutlined className="text-green-500 text-xs" />}
                      {item.checked && item.url && (
                        <Tooltip title="Abrir enlace externo">
                          <Button 
                            icon={<ExportOutlined />} 
                            href={item.url} 
                            target="_blank" 
                            size="small"
                            className="bg-gray-50"
                          />
                        </Tooltip>
                      )}
                    </div>
                    {item.checked && (
                      <Input 
                        size="small"
                        placeholder="Link carpeta/fotos nivel" 
                        value={item.url}
                        onChange={(e) => handleCheckChange(item.id, 'url', e.target.value)}
                        prefix={<GoogleOutlined className="text-blue-400 text-[10px]" />}
                        className="text-[10px] bg-gray-50"
                      />
                    )}
                  </div>
                </Card>
              ))}
            </div>
            
            {levelChecks.length === 0 && (
              <div className="text-center py-6 text-gray-400 text-xs italic">
                Ajusta la cantidad de pisos en la sección superior para generar los registros.
              </div>
            )}
          </div>
        </Col>
      </Row>

      <Divider className="my-8">
        <Text type="secondary" className="text-[10px] uppercase tracking-[0.2em] font-bold">Evidencias Críticas y Detalles Técnicos</Text>
      </Divider>

      {/* SECCIÓN 3: REGISTRO LIBRE (HALLAZGOS) */}
      <div className="flex justify-between items-center mb-4 px-2">
        <Text strong className="text-gray-500 text-xs">Hallazgos Específicos (Fisuras, Humedad, Patologías)</Text>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAdd}
          size="small"
          className="bg-[#2f4860] hover:bg-[#3e5d7a] text-[10px] h-7"
        >
          Agregar Detalle
        </Button>
      </div>

      {data.fotosPanel?.length === 0 ? (
        <div className="text-center py-8 bg-gray-50/50 rounded-lg border border-dashed border-gray-200 mx-2">
          <CameraOutlined style={{ fontSize: 24, color: '#d9d9d9' }} />
          <p className="mt-2 text-[11px] text-gray-400 uppercase tracking-widest">Documentar puntos críticos específicos aquí</p>
        </div>
      ) : (
        <Row gutter={[16, 12]} className="px-2">
          {data.fotosPanel.map((foto, index) => (
            <Col xs={24} key={foto.id}>
              <Card 
                size="small" 
                className={`border-l-4 shadow-sm hover:shadow-md transition-shadow ${isDriveLink(foto.url) ? 'border-l-blue-400' : 'border-l-orange-300'}`}
                title={
                  <div className="flex items-center gap-2">
                    <Tag color="default" className="text-[10px] m-0 border-none font-bold">#{index + 1}</Tag>
                    <Input 
                      variant="borderless"
                      placeholder="Identificación del punto (ej: Fisura en Viga E-3)" 
                      value={foto.label}
                      onChange={(e) => handleChange(foto.id, 'label', e.target.value)}
                      className="font-bold text-[#2f4860] text-xs p-0"
                    />
                  </div>
                }
                extra={
                  <Popconfirm title="¿Eliminar?" onConfirm={() => handleRemove(foto.id)} okText="Sí" cancelText="No">
                    <Button type="text" danger icon={<DeleteOutlined />} size="small" className="hover:bg-red-50" />
                  </Popconfirm>
                }
              >
                <Row gutter={[12, 8]} align="middle">
                  <Col xs={24} md={9}>
                    <Space.Compact className="w-full">
                      <Input 
                        placeholder="Link Drive de la evidencia" 
                        value={foto.url}
                        onChange={(e) => handleChange(foto.id, 'url', e.target.value)}
                        className="text-[11px] bg-gray-50/30"
                        prefix={isDriveLink(foto.url) ? <GoogleOutlined className="text-blue-500" /> : <PaperClipOutlined />}
                      />
                      {foto.url && <Button icon={<ExportOutlined />} href={foto.url} target="_blank" size="small" />}
                    </Space.Compact>
                  </Col>
                  <Col xs={24} md={15}>
                    <Input.TextArea 
                      autoSize={{ minRows: 1, maxRows: 3 }}
                      placeholder="Descripción técnica del hallazgo observado..." 
                      value={foto.descripcion}
                      onChange={(e) => handleChange(foto.id, 'descripcion', e.target.value)}
                      className="text-[11px] bg-gray-50/30 border-none hover:bg-white focus:bg-white"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
