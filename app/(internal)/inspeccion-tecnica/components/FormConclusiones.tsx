import React from 'react';
import { Row, Col, Input, Typography } from 'antd';
import { InspeccionData, InspeccionAction } from '../types';

const { Title } = Typography;
const { TextArea } = Input;

interface Props {
  data: InspeccionData;
  dispatch: React.Dispatch<InspeccionAction>;
}

export function FormConclusiones({ data, dispatch }: Props) {
  const handleChange = (field: keyof InspeccionData, value: any) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <Title level={4} className="mb-6 !text-[#ea7048] flex items-center gap-2">
        <span className="bg-[#ea7048]/10 px-3 py-1 rounded text-sm uppercase tracking-wider">5</span>
        Conclusiones y Siguientes Pasos
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2f4860]">Evaluación Preliminar (Diagnóstico en campo)</label>
            <TextArea 
              rows={4} 
              placeholder="Ej: La estructura principal aparentemente soporta 2 niveles más, pero falta plano estructural. Regularización posible por ley 27157..."
              value={data.evaluacionPreliminar}
              onChange={(e) => handleChange('evaluacionPreliminar', e.target.value)}
              className="bg-blue-50/50 border-blue-200"
            />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2f4860]">Documentos Faltantes (Para pedir al cliente)</label>
            <TextArea 
              rows={4} 
              placeholder="Ej: Copia literal actualizada, CRI, planos de arquitectura originales..."
              value={data.documentosFaltantes}
              onChange={(e) => handleChange('documentosFaltantes', e.target.value)}
              className="bg-orange-50/50 border-orange-200"
            />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2f4860]">Deseos y Notas del Propietario (Lo que el cliente busca)</label>
            <TextArea 
              rows={4} 
              placeholder="Ej: Desean un departamento independiente para cada hijo, terraza con zona BBQ en el último nivel, local comercial en el primer piso..."
              value={data.notasPropietario}
              onChange={(e) => handleChange('notasPropietario', e.target.value)}
              className="bg-purple-50/50 border-purple-200"
            />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2f4860]">Próximos Pasos Internos</label>
            <TextArea 
              rows={4} 
              placeholder="Ej: Preparar cotización por regularización y ampliación. Enviar levantamiento topográfico..."
              value={data.proximosPasos}
              onChange={(e) => handleChange('proximosPasos', e.target.value)}
              className="bg-green-50/50 border-green-200"
            />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2f4860]">Observaciones Finales (Privado / Interno)</label>
            <TextArea 
              rows={4} 
              placeholder="Notas de interés sobre el cliente, dificultad de acceso, conflictos con vecinos..."
              value={data.observacionesFinales}
              onChange={(e) => handleChange('observacionesFinales', e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
