import React from 'react';
import { Row, Col, Input, Typography, Divider } from 'antd';
import { InspeccionData, InspeccionAction } from '../types';

const { Title } = Typography;
const { TextArea } = Input;

interface Props {
  data: InspeccionData;
  dispatch: React.Dispatch<InspeccionAction>;
}

export function FormConclusiones({ data, dispatch }: Props) {
  const handleRootChange = (field: 'evaluacionPreliminar' | 'observacionesFinales' | 'proximosPasos', value: any) => {
    dispatch({ type: 'UPDATE_ROOT_FIELD', field, value });
  };

  const handleLimitaciones = (field: keyof InspeccionData['limitaciones'], value: any) => {
    dispatch({ type: 'UPDATE_LIMITACIONES', field, value });
  };

  const handleRiesgos = (field: keyof InspeccionData['riesgos'], value: any) => {
    dispatch({ type: 'UPDATE_RIESGOS', field, value });
  };

  const handlePatologias = (field: keyof InspeccionData['patologias'], value: any) => {
    dispatch({ type: 'UPDATE_PATOLOGIAS', field, value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <Title level={4} className="mb-6 !text-[#ea7048] flex items-center gap-2">
        <span className="bg-[#ea7048]/10 px-3 py-1 rounded text-sm uppercase tracking-wider">6</span>
        Evaluación, Riesgos y Conclusiones
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2f4860]">Evaluación Preliminar (Diagnóstico General en Campo)</label>
            <TextArea 
              rows={4} 
              placeholder="Describa el estado general del predio, su viabilidad para los requerimientos del cliente..."
              value={data.evaluacionPreliminar}
              onChange={(e) => handleRootChange('evaluacionPreliminar', e.target.value)}
              className="bg-blue-50/50 border-blue-200"
            />
          </div>
        </Col>

        {/* LIMITACIONES */}
        <Col xs={24}>
          <Divider orientation="left" className="!mt-2 !mb-2 border-gray-200">
            <span className="text-gray-500 font-semibold text-sm">Limitaciones durante la inspección</span>
          </Divider>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">De Acceso</label>
                <TextArea 
                  rows={2} 
                  placeholder="Ej: Ambientes cerrados con llave, azotea intransitable..."
                  value={data.limitaciones?.acceso}
                  onChange={(e) => handleLimitaciones('acceso', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">De Visibilidad</label>
                <TextArea 
                  rows={2} 
                  placeholder="Ej: Falso cielo, muros forrados, estructuras ocultas..."
                  value={data.limitaciones?.visibilidad}
                  onChange={(e) => handleLimitaciones('visibilidad', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Documentales</label>
                <TextArea 
                  rows={2} 
                  placeholder="Ej: Planos ilegibles, falta de firmas en expedientes..."
                  value={data.limitaciones?.documentales}
                  onChange={(e) => handleLimitaciones('documentales', e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </Col>

        {/* RIESGOS */}
        <Col xs={24}>
          <Divider orientation="left" className="!mt-2 !mb-2 border-gray-200">
            <span className="text-red-500 font-semibold text-sm">Riesgos Detectados</span>
          </Divider>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Estructurales</label>
                <TextArea 
                  rows={3} 
                  placeholder="Ej: Volados mayores a lo permitido, muros portantes demolidos..."
                  value={data.riesgos?.estructurales}
                  onChange={(e) => handleRiesgos('estructurales', e.target.value)}
                  className="bg-red-50/20 border-red-100"
                />
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Uso / Habitabilidad</label>
                <TextArea 
                  rows={3} 
                  placeholder="Ej: Uso comercial en zona residencial, falta de ventilación..."
                  value={data.riesgos?.uso}
                  onChange={(e) => handleRiesgos('uso', e.target.value)}
                  className="bg-orange-50/20 border-orange-100"
                />
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Legales / Normativos</label>
                <TextArea 
                  rows={3} 
                  placeholder="Ej: Invasión de retiro, conflicto con colindantes..."
                  value={data.riesgos?.legales}
                  onChange={(e) => handleRiesgos('legales', e.target.value)}
                  className="bg-yellow-50/20 border-yellow-100"
                />
              </div>
            </Col>
          </Row>
        </Col>

        {/* PATOLOGIAS */}
        <Col xs={24}>
          <Divider orientation="left" className="!mt-2 !mb-2 border-gray-200">
            <span className="text-purple-500 font-semibold text-sm">Patologías / Lesiones Constructivas</span>
          </Divider>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={16}>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Tipo y Ubicación</label>
                <TextArea 
                  rows={2} 
                  placeholder="Ej: Eflorescencia en muro perimétrico, fisuras diagonales en sala 1er piso..."
                  value={data.patologias?.tipoUbicacion}
                  onChange={(e) => handlePatologias('tipoUbicacion', e.target.value)}
                />
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Gravedad Estimada</label>
                <Input 
                  placeholder="Ej: Leve / Moderada / Grave"
                  value={data.patologias?.gravedad}
                  onChange={(e) => handlePatologias('gravedad', e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={12}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2f4860]">Próximos Pasos</label>
            <TextArea 
              rows={4} 
              placeholder="Ej: Preparar cotización por regularización, programar levantamiento topográfico..."
              value={data.proximosPasos}
              onChange={(e) => handleRootChange('proximosPasos', e.target.value)}
              className="bg-green-50/50 border-green-200"
            />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2f4860]">Observaciones Finales (Internas)</label>
            <TextArea 
              rows={4} 
              placeholder="Notas de interés sobre el cliente, peculiaridades del trato..."
              value={data.observacionesFinales}
              onChange={(e) => handleRootChange('observacionesFinales', e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
