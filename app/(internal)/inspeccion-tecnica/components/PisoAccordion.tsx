import React from 'react';
import { Row, Col, Input, Typography, Divider } from 'antd';
import { PisoData, InspeccionAction } from '../types';

const { TextArea } = Input;

interface Props {
  piso: PisoData;
  dispatch: React.Dispatch<InspeccionAction>;
}

export function PisoAccordion({ piso, dispatch }: Props) {
  const handleChange = (field: keyof PisoData, value: string) => {
    dispatch({ type: 'UPDATE_PISO_FIELD', pisoId: piso.id, field, value });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#2f4860]">A. Arquitectura</label>
            <TextArea 
              rows={3} 
              placeholder="Distribución actual, estado de acabados, tabiquería..."
              value={piso.arquitectura}
              onChange={(e) => handleChange('arquitectura', e.target.value)}
              className="border-blue-100 focus:border-[#52aeb2]"
            />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#2f4860]">B. Estructuras</label>
            <TextArea 
              rows={3} 
              placeholder="Estado de vigas, columnas, losas, fisuras, humedad..."
              value={piso.estructuras}
              onChange={(e) => handleChange('estructuras', e.target.value)}
              className="border-gray-300"
            />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#2f4860]">C. Sanitarias</label>
            <TextArea 
              rows={2} 
              placeholder="Montantes, puntos de agua/desagüe, filtraciones..."
              value={piso.sanitarias}
              onChange={(e) => handleChange('sanitarias', e.target.value)}
            />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#2f4860]">D. Eléctricas</label>
            <TextArea 
              rows={2} 
              placeholder="Tableros, cableado, estado general, pozo a tierra..."
              value={piso.electricas}
              onChange={(e) => handleChange('electricas', e.target.value)}
            />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#2f4860]">E. Instalaciones de Gas</label>
            <TextArea 
              rows={2} 
              placeholder="Puntos de gas, ventilación, rejillas, medidor..."
              value={piso.gas}
              onChange={(e) => handleChange('gas', e.target.value)}
            />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#2f4860]">F. Otra Especialidad / Detalles</label>
            <TextArea 
              rows={2} 
              placeholder="Ascensores, aire acondicionado, telecomunicaciones, etc."
              value={piso.otraEspecialidad}
              onChange={(e) => handleChange('otraEspecialidad', e.target.value)}
            />
          </div>
        </Col>

        <Divider className="my-2" />

        <Col xs={24} md={12}>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-orange-600">G. Intervención Deseada</label>
            <TextArea 
              rows={3} 
              placeholder="Qué quiere hacer específicamente en este piso..."
              value={piso.intervencion}
              onChange={(e) => handleChange('intervencion', e.target.value)}
              className="border-orange-200"
            />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-red-600">H. Observaciones / Alertas</label>
            <TextArea 
              rows={3} 
              placeholder="Cosas críticas a considerar en este nivel (riesgos, vicios ocultos)..."
              value={piso.observaciones}
              onChange={(e) => handleChange('observaciones', e.target.value)}
              className="border-red-200"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
