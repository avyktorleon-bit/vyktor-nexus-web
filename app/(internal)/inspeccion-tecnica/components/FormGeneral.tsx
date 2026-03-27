import { Row, Col, Input, DatePicker, Typography, Space, Select, Divider, Button } from 'antd';
import { InspeccionData, InspeccionAction, FamiliarData } from '../types';
import dayjs from 'dayjs';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Props {
  data: InspeccionData;
  dispatch: React.Dispatch<InspeccionAction>;
}

export function FormGeneral({ data, dispatch }: Props) {
   const handleChange = (field: keyof InspeccionData, value: any) => {
    dispatch({ type: 'UPDATE_ROOT_FIELD', field, value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <Title level={4} className="mb-6 !text-[#ea7048] flex items-center gap-2">
        <span className="bg-[#ea7048]/10 px-3 py-1 rounded text-sm uppercase tracking-wider">1</span>
        Datos Generales
      </Title>

      <Space direction="vertical" size="large" className="w-full">
        {/* 1.1. Información de la Inspección */}
        <section>
          <Divider orientation="left" className="!mt-0 !mb-4 border-[#ea7048]/20">
            <span className="text-[#ea7048] font-semibold">1.1. Información de la Inspección</span>
          </Divider>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12} lg={6}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Fecha de Inspección</label>
                <DatePicker 
                  className="w-full" 
                  size="large"
                  value={data.fecha ? dayjs(data.fecha) : null}
                  onChange={(date, dateString) => handleChange('fecha', dateString)}
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Código Inspección</label>
                <Input 
                  size="large" 
                  value={data.codigoInspeccion}
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Persona de Contacto (Atiende la Visita)</label>
                <Input 
                  size="large" 
                  placeholder="Nombre de quien recibe"
                  value={data.personaContacto}
                  onChange={(e) => handleChange('personaContacto', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Teléfono del Contacto</label>
                <Input 
                  size="large" 
                  placeholder="+51..."
                  value={data.telefonoContacto}
                  onChange={(e) => handleChange('telefonoContacto', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Inspector Responsable</label>
                <Input 
                  size="large" 
                  placeholder="Nombre del técnico/arquitecto"
                  value={data.inspector}
                  onChange={(e) => handleChange('inspector', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Estado Inspección</label>
                <Select 
                  size="large" 
                  className="w-full"
                  value={data.estado}
                  onChange={(val) => handleChange('estado', val)}
                  options={[
                    { value: 'Borrador', label: 'Borrador / En Campo' },
                    { value: 'Pendiente', label: 'Pendiente de Validar' },
                    { value: 'Completa', label: 'Completada' },
                  ]}
                />
              </div>
            </Col>
          </Row>
        </section>

        {/* 1.2. Ubicación del Predio */}
        <section>
          <Divider orientation="left" className="!mb-4 border-[#ea7048]/20">
            <span className="text-[#ea7048] font-semibold">1.2. Ubicación del Predio</span>
          </Divider>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24} lg={12}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Dirección del Predio</label>
                <Input 
                  size="large" 
                  placeholder="Av. Principal 123..."
                  value={data.direccion}
                  onChange={(e) => handleChange('direccion', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Distrito / Provincia</label>
                <Input 
                  size="large" 
                  placeholder="Ej: SJL / Lima"
                  value={data.distritoProvincia}
                  onChange={(e) => handleChange('distritoProvincia', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Urb. / Sector / Etapa</label>
                <Input 
                  size="large" 
                  placeholder="Canto Grande / Etapa 1"
                  value={data.urbanizacionSector}
                  onChange={(e) => handleChange('urbanizacionSector', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={16} lg={16}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Referencia de Ubicación</label>
                <Input 
                  size="large" 
                  placeholder="Frente a parque / Altura cuadra 10..."
                  value={data.referencia}
                  onChange={(e) => handleChange('referencia', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={8} lg={8}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Coordenadas (Lat, Lng) - [Opcional]</label>
                <Input 
                  size="large" 
                  placeholder="-12.04318, -77.02824"
                  value={data.coordenadas}
                  onChange={(e) => handleChange('coordenadas', e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </section>

        {/* 1.3. Propietarios y Familiares */}
        <section>
          <Divider orientation="left" className="!mb-4 border-[#ea7048]/20">
            <span className="text-[#ea7048] font-semibold">1.3. Propietarios y Familiares</span>
          </Divider>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={14}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Propietario Legal</label>
                <Input 
                  size="large" 
                  placeholder="Nombre registral completo"
                  value={data.propietarioLegal}
                  onChange={(e) => handleChange('propietarioLegal', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={10}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">DNI / RUC Propietario</label>
                <Input 
                  size="large" 
                  placeholder="Documento de identidad"
                  value={data.dniPropietario}
                  onChange={(e) => handleChange('dniPropietario', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Poseedor Actual (Si no es el propietario)</label>
                <Input 
                  size="large" 
                  placeholder="Nombre de quien ocupa el predio"
                  value={data.poseedorActual}
                  onChange={(e) => handleChange('poseedorActual', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Representante / Apoderado</label>
                <Input 
                  size="large" 
                  placeholder="Representante legal / Promotor"
                  value={data.representante}
                  onChange={(e) => handleChange('representante', e.target.value)}
                />
              </div>
            </Col>
          </Row>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                Familiares / Otros Contactos
              </span>
              <Button 
                type="dashed" 
                icon={<PlusOutlined />} 
                onClick={() => dispatch({ type: 'ADD_FAMILIAR' })}
                className="border-[#ea7048] text-[#ea7048] hover:text-[#ea7048] hover:border-[#ea7048]"
              >
                Agregar Familiar
              </Button>
            </div>

            {data.familiares?.map((familiar) => (
              <div key={familiar.id} className="bg-gray-50/50 p-4 rounded-lg border border-dashed border-gray-200 mb-3 relative group">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={10}>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">Nombre Completo</label>
                      <Input 
                        placeholder="Ej: Juan Pérez"
                        value={familiar.nombre}
                        onChange={(e) => dispatch({ type: 'UPDATE_FAMILIAR', id: familiar.id, field: 'nombre', value: e.target.value })}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={6}>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">Relación / Vínculo</label>
                      <Input 
                        placeholder="Ej: Hijo / Apoderado"
                        value={familiar.relacion}
                        onChange={(e) => dispatch({ type: 'UPDATE_FAMILIAR', id: familiar.id, field: 'relacion', value: e.target.value })}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={5}>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight">Teléfono (Opcional)</label>
                      <Input 
                        placeholder="Ej: 999..."
                        value={familiar.telefono}
                        onChange={(e) => dispatch({ type: 'UPDATE_FAMILIAR', id: familiar.id, field: 'telefono', value: e.target.value })}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={3} className="flex items-end justify-end">
                    <Button 
                      danger 
                      type="text"
                      icon={<DeleteOutlined />} 
                      onClick={() => dispatch({ type: 'REMOVE_FAMILIAR', id: familiar.id })}
                      className="hover:bg-red-50"
                    />
                  </Col>
                </Row>
              </div>
            ))}

            {(data.familiares?.length || 0) === 0 && (
              <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-xl text-gray-400 text-sm italic">
                No hay familiares registrados. Haz clic en "Agregar Familiar" para apuntar detalles de quienes te presentaron.
              </div>
            )}
          </div>
        </section>
      </Space>
    </div>
  );
}
