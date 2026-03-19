import React from 'react';
import { Row, Col, Input, Checkbox, Typography, Divider } from 'antd';
import { InspeccionData, InspeccionAction } from '../types';

const { Title } = Typography;
const { TextArea } = Input;

interface Props {
  data: InspeccionData;
  dispatch: React.Dispatch<InspeccionAction>;
}

export function FormDocumentacion({ data, dispatch }: Props) {
  const handleChange = (field: keyof InspeccionData, value: any) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <Title level={4} className="mb-6 !text-[#ea7048] flex items-center gap-2">
        <span className="bg-[#ea7048]/10 px-3 py-1 rounded text-sm uppercase tracking-wider">2</span>
        Situación Documental
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Title level={5} className="!text-[#2f4860] mb-4">Documentos Legales</Title>
            <div className="space-y-4">
              <Checkbox 
                checked={data.partidaRegistral}
                onChange={(e) => handleChange('partidaRegistral', e.target.checked)}
              >
                Cuenta con Partida Registral
              </Checkbox>
              {data.partidaRegistral && (
                <Input 
                  placeholder="Número de Partida" 
                  value={data.numeroPartida}
                  onChange={(e) => handleChange('numeroPartida', e.target.value)}
                  className="ml-6 w-[80%]"
                />
              )}
              <Checkbox 
                checked={data.copiaLiteral}
                onChange={(e) => handleChange('copiaLiteral', e.target.checked)}
              >
                Copia Literal Actualizada
              </Checkbox>
              <Checkbox 
                checked={data.constanciaPosesion}
                onChange={(e) => handleChange('constanciaPosesion', e.target.checked)}
              >
                Constancia de Posesión (sin título)
              </Checkbox>
            </div>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="p-4 bg-gray-50 rounded-lg h-full">
            <Title level={5} className="!text-[#2f4860] mb-4">Planos Previos (Existentes)</Title>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Checkbox 
                checked={data.planosArquitectura}
                onChange={(e) => handleChange('planosArquitectura', e.target.checked)}
              >Arquitectura</Checkbox>
              <Checkbox 
                checked={data.planosEstructuras}
                onChange={(e) => handleChange('planosEstructuras', e.target.checked)}
              >Estructuras</Checkbox>
              <Checkbox 
                checked={data.planosSanitarias}
                onChange={(e) => handleChange('planosSanitarias', e.target.checked)}
              >Sanitarias</Checkbox>
              <Checkbox 
                checked={data.planosElectricas}
                onChange={(e) => handleChange('planosElectricas', e.target.checked)}
              >Eléctricas</Checkbox>
            </div>
            
            <div className="space-y-1 mt-4 border-t pt-4">
              <label className="text-sm font-semibold text-gray-600">Formato / Estado</label>
              <Input 
                placeholder="Ej. Planos en DWG versión 2018, físicos manchados..." 
                value={data.formatoPlanos}
                onChange={(e) => handleChange('formatoPlanos', e.target.value)}
              />
            </div>
          </div>
        </Col>

        <Col xs={24}>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600">Observaciones Generales Documentación</label>
            <TextArea 
              rows={3} 
              placeholder="Anotar detalles como gravámenes, cruce de áreas, etc."
              value={data.observacionesDoc}
              onChange={(e) => handleChange('observacionesDoc', e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
