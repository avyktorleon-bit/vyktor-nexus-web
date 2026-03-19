import React from 'react';
import { Typography, InputNumber, Collapse, Row, Col } from 'antd';
import { InspeccionData, InspeccionAction } from '../types';
import { PisoAccordion } from './PisoAccordion';

const { Title, Text } = Typography;

interface Props {
  data: InspeccionData;
  dispatch: React.Dispatch<InspeccionAction>;
}

export function FormPisos({ data, dispatch }: Props) {
  const handlePisosChange = (value: number | null) => {
    if (value && value > 0 && value <= 20) {
      dispatch({ type: 'UPDATE_NUMERO_PISOS', count: value });
    }
  };

  const getItems = () => {
    return data.pisos.map((piso) => ({
      key: piso.id,
      label: (
        <span className="font-bold text-[#2f4860] text-base">
          Evaluación del Nivel / Piso {piso.numero}
        </span>
      ),
      children: <PisoAccordion piso={piso} dispatch={dispatch} />,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <Row justify="space-between" align="middle" className="mb-6">
        <Col>
          <Title level={4} className="!mb-0 !text-[#ea7048] flex items-center gap-2">
            <span className="bg-[#ea7048]/10 px-3 py-1 rounded text-sm uppercase tracking-wider">4</span>
            Inspección por Niveles
          </Title>
        </Col>
        <Col>
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
            <Text className="font-semibold text-gray-700">Cant. de Pisos a inspeccionar:</Text>
            <InputNumber 
              min={1} 
              max={20} 
              value={data.numeroPisos} 
              onChange={handlePisosChange}
              size="large"
              className="w-20"
            />
          </div>
        </Col>
      </Row>

      <Collapse 
        items={getItems()} 
        defaultActiveKey={['piso-1']}
        size="large"
        className="bg-white"
        expandIconPosition="end"
      />
    </div>
  );
}
