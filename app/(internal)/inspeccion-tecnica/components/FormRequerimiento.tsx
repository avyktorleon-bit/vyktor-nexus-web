import React from 'react';
import { Row, Col, Input, Checkbox, Typography } from 'antd';
import { InspeccionData, InspeccionAction } from '../types';

const { Title } = Typography;
const { TextArea } = Input;

interface Props {
  data: InspeccionData;
  dispatch: React.Dispatch<InspeccionAction>;
}

export function FormRequerimiento({ data, dispatch }: Props) {
  const handleReqChange = (field: keyof InspeccionData['requerimientos'], value: any) => {
    dispatch({ type: 'UPDATE_REQUERIMIENTOS', field, value });
  };

  const handleRootChange = (field: 'resumenCliente', value: any) => {
    dispatch({ type: 'UPDATE_ROOT_FIELD', field, value });
  };

  const reqOptions: { label: string; field: keyof InspeccionData['requerimientos'] }[] = [
    { label: 'Construir / Obra Nueva', field: 'reqConstruir' },
    { label: 'Ampliar', field: 'reqAmpliar' },
    { label: 'Modificar', field: 'reqModificar' },
    { label: 'Remodelar', field: 'reqRemodelar' },
    { label: 'Regularizar', field: 'reqRegularizar' },
    { label: 'Demoler', field: 'reqDemoler' },
    { label: 'Independizar', field: 'reqIndependizar' },
    { label: 'Subdividir lote', field: 'reqSubdividir' },
    { label: 'Consulta / Evaluación Técnica', field: 'reqConsultaTecnica' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <Title level={4} className="mb-6 !text-[#ea7048] flex items-center gap-2">
        <span className="bg-[#ea7048]/10 px-3 py-1 rounded text-sm uppercase tracking-wider">3</span>
        Requerimiento del Cliente
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={10}>
          <div className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] h-full">
            <label className="text-sm font-semibold text-gray-700 block mb-4">¿Qué desea hacer el cliente?</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
              {reqOptions.map((opt) => (
                <Checkbox 
                  key={opt.field}
                  checked={data.requerimientos?.[opt.field]}
                  onChange={(e) => handleReqChange(opt.field, e.target.checked)}
                  className="!text-gray-700 hover:text-[#52aeb2] transition-colors"
                >
                  {opt.label}
                </Checkbox>
              ))}
            </div>
          </div>
        </Col>

        <Col xs={24} lg={14}>
          <div className="space-y-2 h-full flex flex-col">
            <label className="text-sm font-semibold text-gray-600">Descripción Detallada del Requerimiento</label>
            <TextArea 
              className="flex-grow w-full h-full min-h-[250px] p-4 text-base"
              placeholder="Ej. Desea construir 3 pisos más azotea, con 2 departamentos por piso. Quieren dejar la placa lista para independizar a futuro..."
              value={data.resumenCliente}
              onChange={(e) => handleRootChange('resumenCliente', e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
