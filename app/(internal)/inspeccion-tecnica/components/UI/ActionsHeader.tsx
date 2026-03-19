import React from 'react';
import { Button, message, Popconfirm, Layout, Typography } from 'antd';
import { SaveOutlined, CopyOutlined, DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import { InspeccionData, InspeccionAction } from '../../types';

const { Header } = Layout;
const { Title, Text } = Typography;

interface Props {
  data: InspeccionData;
  onSaveDraft: () => void;
  onClear: () => void;
  onImport: (data: InspeccionData) => void;
}

export function ActionsHeader({ data, onSaveDraft, onClear, onImport }: Props) {

  const handleManualSave = () => {
    onSaveDraft();
    message.success('Borrador guardado localmente (LocalStorage)');
  };

  const handleExportJSON = () => {
    // Para MVP sin BD, permitimos descargar un JSON o copiarlo
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", `Inspeccion_${data.codigoInspeccion}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    message.success('Archivo descargado con éxito');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        onImport(json);
        message.success('Inspección importada correctamente');
      } catch (error) {
        message.error('Error al leer el archivo JSON');
      }
    };
    reader.readAsText(file);
    // Limpiar el input para permitir importar el mismo archivo si es necesario
    e.target.value = '';
  };

  return (
    <div className="sticky top-0 z-50 bg-[#0a0f18] text-white py-4 px-6 md:px-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      <div>
        <Title level={3} className="!text-white !mb-0 tracking-widest flex items-center gap-3">
          <span className="text-[#52aeb2]">NEXUS</span> | EVALUADOR TÉCNICO
        </Title>
        <Text className="text-gray-400 text-sm">
          Inspección N° <span className="text-[#ea7048] font-bold">{data.codigoInspeccion}</span>
        </Text>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Popconfirm
          title="¿Limpiar formulario?"
          description="Se perderán los datos actuales no guardados externamente."
          onConfirm={onClear}
          okText="Sí, limpiar"
          cancelText="Cancelar"
          okButtonProps={{ danger: true }}
        >
          <Button danger icon={<DeleteOutlined />} size="large">
            Limpiar
          </Button>
        </Popconfirm>
        
        <Button 
          icon={<CopyOutlined />} 
          size="large" 
          onClick={handleExportJSON}
          className="border-[#52aeb2] text-[#52aeb2] hover:text-[#52aeb2] hover:border-[#52aeb2] bg-transparent"
        >
          Exportar
        </Button>

        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            title="Importar archivo .json"
          />
          <Button 
            icon={<FileSearchOutlined />} 
            size="large" 
            className="border-[#52aeb2] text-[#52aeb2] hover:bg-white hover:text-[#52aeb2] hover:border-white bg-transparent"
          >
            Importar
          </Button>
        </div>
        
        <Button 
          type="primary" 
          icon={<SaveOutlined />} 
          size="large" 
          onClick={handleManualSave}
          className="bg-[#ea7048] hover:bg-[#ea7048]/80 font-bold border-0"
        >
          Guardar Borrador
        </Button>
      </div>
    </div>
  );
}
