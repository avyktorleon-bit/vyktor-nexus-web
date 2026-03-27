import React from 'react';
import { Row, Col, Input, Typography, Tabs, Tag } from 'antd';
import { PisoData, InspeccionAction, EspecialidadData } from '../types';

const { TextArea } = Input;
const { Title } = Typography;

interface Props {
  piso: PisoData;
  dispatch: React.Dispatch<InspeccionAction>;
}

export function PisoAccordion({ piso, dispatch }: Props) {
  const handlePisoChange = (field: keyof PisoData, value: string) => {
    dispatch({ type: 'UPDATE_PISO_FIELD', pisoId: piso.id, field, value });
  };

  const handleEspecialidadChange = (
    especialidad: keyof Pick<PisoData, 'arquitectura' | 'estructuras' | 'sanitarias' | 'electricas' | 'gas'>,
    subField: keyof EspecialidadData,
    value: string
  ) => {
    dispatch({ type: 'UPDATE_PISO_ESPECIALIDAD', pisoId: piso.id, especialidad, subField, value });
  };

  const renderEspecialidadTab = (
    especialidad: keyof Pick<PisoData, 'arquitectura' | 'estructuras' | 'sanitarias' | 'electricas' | 'gas'>,
    colorCode: string,
    label: string
  ) => {
    const data = piso[especialidad] as EspecialidadData;
    return (
      <div className="py-4">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight flex items-center justify-between">
                <span>Observado Técnicamente</span>
                <Tag color="green">Certero</Tag>
              </label>
              <TextArea
                rows={4}
                placeholder={`Lo que se verificó en campo sobre ${label.toLowerCase()}...`}
                value={data?.observado}
                onChange={(e) => handleEspecialidadChange(especialidad, 'observado', e.target.value)}
                className={`border-${colorCode}-200 focus:border-${colorCode}-400`}
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight flex items-center justify-between">
                <span>Declarado / Inferido por Planos</span>
                <Tag color="cyan">Referencial</Tag>
              </label>
              <TextArea
                rows={4}
                placeholder={`Lo que el cliente afirma o muestran los planos sobre ${label.toLowerCase()}...`}
                value={data?.declarado}
                onChange={(e) => handleEspecialidadChange(especialidad, 'declarado', e.target.value)}
              />
            </div>
          </Col>
          <Col xs={24}>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-tight flex items-center justify-between">
                <span>Pendiente de Verificar</span>
                <Tag color="orange">Duda</Tag>
              </label>
              <TextArea
                rows={2}
                placeholder={`Lo que no se pudo constatar de ${label.toLowerCase()} y requiere mayor revisión...`}
                value={data?.pendienteVerificar}
                onChange={(e) => handleEspecialidadChange(especialidad, 'pendienteVerificar', e.target.value)}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  const items = [
    {
      key: '1',
      label: <span className="font-semibold px-2">Arquitectura</span>,
      children: renderEspecialidadTab('arquitectura', 'blue', 'Arquitectura')
    },
    {
      key: '2',
      label: <span className="font-semibold px-2">Estructuras</span>,
      children: renderEspecialidadTab('estructuras', 'gray', 'Estructuras')
    },
    {
      key: '3',
      label: <span className="font-semibold px-2">Sanitarias</span>,
      children: renderEspecialidadTab('sanitarias', 'cyan', 'Sanitarias')
    },
    {
      key: '4',
      label: <span className="font-semibold px-2">Eléctricas</span>,
      children: renderEspecialidadTab('electricas', 'yellow', 'Inst. Eléctricas')
    },
    {
      key: '5',
      label: <span className="font-semibold px-2">Gas</span>,
      children: renderEspecialidadTab('gas', 'orange', 'Inst. de Gas')
    },
    {
      key: '6',
      label: <span className="font-semibold px-2 text-[#ea7048]">Intervención / Alertas</span>,
      children: (
        <div className="py-4">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-orange-600">Intervención Propuesta</label>
                <TextArea 
                  rows={4} 
                  placeholder="Qué quiere hacer específicamente el cliente en este piso..."
                  value={piso.intervencionPropuesta}
                  onChange={(e) => handlePisoChange('intervencionPropuesta', e.target.value)}
                  className="border-orange-200"
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-red-600">Incidencias Críticas</label>
                <TextArea 
                  rows={4} 
                  placeholder="Problemas graves o vicios ocultos detectados en este nivel que afectarían la intervención..."
                  value={piso.incidencias}
                  onChange={(e) => handlePisoChange('incidencias', e.target.value)}
                  className="border-red-200 bg-red-50/10"
                />
              </div>
            </Col>
            <Col xs={24}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Observaciones Adicionales</label>
                <TextArea 
                  rows={2} 
                  placeholder="Notas adicionales relevantes para este nivel..."
                  value={piso.observacionesAdicionales}
                  onChange={(e) => handlePisoChange('observacionesAdicionales', e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </div>
      )
    }
  ];

  return (
    <div className="p-2 sm:p-4 bg-white border border-gray-100 shadow-sm rounded-lg">
      <Tabs 
        defaultActiveKey="1" 
        items={items} 
        type="card"
        size="small"
        className="form-pisos-tabs"
      />
    </div>
  );
}
