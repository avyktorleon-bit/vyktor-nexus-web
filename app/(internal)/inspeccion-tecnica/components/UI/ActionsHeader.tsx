import React from 'react';
import { Button, message, Popconfirm, Typography, Modal, Input, Tag } from 'antd';
import { SaveOutlined, CopyOutlined, DeleteOutlined, FileSearchOutlined, CloudDownloadOutlined, CheckCircleOutlined, FileWordOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Sparkles, ArrowLeft } from 'lucide-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { InspeccionData } from '../../types';
import { exportToWord } from '../../utils/exportWord';

const { Title, Text } = Typography;

interface Props {
  data: InspeccionData;
  onSaveDraft: () => void;
  onClear?: () => void;
  onImport: (data: InspeccionData) => void;
  onImproveAI: () => Promise<void>;
  lastSaved: Date | null;
  isImproving: boolean;
  backUrl?: string; // Nuevo prop opcional
}

export function ActionsHeader({ data, onSaveDraft, onClear, onImport, onImproveAI, lastSaved, isImproving, backUrl }: Props) {
  const [isCloudModalOpen, setIsCloudModalOpen] = React.useState(false);
  const [cloudInput, setCloudInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleManualSave = async () => {
    try {
      await onSaveDraft();
    } catch (error) {
      console.error("Error en Guardar:", error);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `Inspeccion_${data.codigoInspeccion || 'NUEVA'}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    message.success('Archivo JSON descargado con éxito');
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
    e.target.value = '';
  };
  
  const handleCloudImport = async () => {
    if (!cloudInput) return;
    setLoading(true);
    try {
      let url = cloudInput;
      if (cloudInput.length > 20 && !cloudInput.startsWith('http')) {
        url = `https://docs.google.com/uc?export=download&id=${cloudInput}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('No se pudo acceder al archivo');
      const json = await response.json();
      onImport(json);
      message.success('Importado desde la nube con éxito');
      setIsCloudModalOpen(false);
      setCloudInput('');
    } catch (error) {
      console.error(error);
      message.error('Error al importar: Verifica que el enlace sea correcto y público');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-[#060a11]/95 backdrop-blur-md text-white border-b border-white/5 shadow-2xl mb-8 transition-all w-full">
      <div className="px-6 md:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full max-w-7xl mx-auto">
        
        {/* Sección Logo y Atrás */}
        <div className="flex items-center gap-6">
          {backUrl && (
            <Link href={backUrl} className="group">
              <div className="flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group-hover:border-[#52aeb2]/50">
                <ArrowLeft size={20} className="text-gray-400 group-hover:text-[#52aeb2] transition-colors" />
              </div>
            </Link>
          )}

          <div>
            <Title level={4} className="!text-white !mb-1 tracking-widest flex items-center gap-2 whitespace-nowrap">
              <span className="text-[#52aeb2] font-black">NEXUS</span>
              <span className="text-gray-500 font-light">|</span>
              <span className="font-semibold text-gray-200">EVALUADOR TÉCNICO</span>
            </Title>
            <div className="flex items-center gap-3">
              <Text className="text-gray-400 text-xs uppercase tracking-wider">
                Inspección <span className="text-[#ea7048] font-bold px-1">{data.codigoInspeccion || 'NUEVA'}</span>
              </Text>
              
              {/* Indicador de Auto-guardado integrado al lado del título */}
              {lastSaved ? (
                <Tag color="success" icon={<CheckCircleOutlined />} className="animate-pulse bg-[#14231b] border-[#1f4a33] text-green-400 m-0 text-[10px] leading-none py-1">
                  Guardado {dayjs(lastSaved).format('HH:mm')}
                </Tag>
              ) : (
                <span className="text-gray-600 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span> Guardando auto...
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Acciones */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
          {onClear && (
            <Popconfirm
              title="¿Limpiar formulario?"
              description="Se perderán los datos actuales no guardados externamente."
              onConfirm={onClear}
              okText="Sí, limpiar"
              cancelText="Cancelar"
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<DeleteOutlined />} type="text" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                Limpiar
              </Button>
            </Popconfirm>
          )}

          {/* Opciones Avanzadas: JSON & Cloud en un grupo */}
          <div className="hidden lg:flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
            <Button 
               type="text"
              icon={<CopyOutlined />} 
              onClick={handleExportJSON}
              className="text-[#52aeb2] hover:bg-[#52aeb2]/10 hover:text-[#52aeb2] text-sm"
              title="Exportar como JSON"
            >
              JSON
            </Button>
            
            <div className="relative flex items-center">
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                title="Importar archivo .json local"
              />
              <Button 
                 type="text"
                icon={<FileSearchOutlined />} 
                className="text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Cargar
              </Button>
            </div>
            
            <Button 
              type="text"
              icon={<CloudDownloadOutlined />} 
              onClick={() => setIsCloudModalOpen(true)}
              className="text-gray-300 hover:bg-gray-800 hover:text-white"
              title="Importar de Google Drive"
            >
              Nube
            </Button>
          </div>
          
          <Button 
            icon={<FileWordOutlined />} 
            onClick={() => exportToWord(data)}
            className="border-[#1d6f42] text-[#1d6f42] hover:bg-[#1d6f42]/10 hover:border-[#1d6f42] bg-transparent font-medium group transition-colors"
          >
            Word
          </Button>

          <Button 
            icon={<Sparkles size={16} className="text-[#ea7048] group-hover:animate-pulse" />} 
            onClick={onImproveAI}
            loading={isImproving}
            className="border-[#ea7048]/30 bg-[#ea7048]/5 text-gray-200 hover:bg-[#ea7048]/10 hover:border-[#ea7048] flex items-center gap-2 font-medium"
          >
            Pulir <span className="hidden sm:inline">IA</span>
          </Button>
          
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            onClick={handleManualSave}
            loading={isImproving}
            className="!bg-[#ea7048] hover:!bg-[#d65f37] text-white font-semibold border-0 px-6 shadow-lg shadow-[#ea7048]/20"
          >
            Guardar
          </Button>
        </div>

        <Modal
          title={<div className="font-semibold text-gray-800 flex items-center gap-2"><CloudDownloadOutlined className="text-[#52aeb2]"/> Importar desde la Nube</div>}
          open={isCloudModalOpen}
          onOk={handleCloudImport}
          onCancel={() => setIsCloudModalOpen(false)}
          confirmLoading={loading}
          okText="Importar Datos"
          cancelText="Cancelar"
          centered
          className="rounded-xl overflow-hidden"
          okButtonProps={{ className: "bg-[#52aeb2] hover:bg-[#419498]" }}
        >
          <div className="py-4">
            <Typography.Text className="block mb-3 text-gray-600">
              Ingresa el <strong className="text-gray-800">ID del archivo</strong> de Drive o una <strong className="text-gray-800">URL pública</strong> a un JSON:
            </Typography.Text>
            <Input 
              placeholder="Ej: 1a2b3c4d5e6f7g8h9i0j..." 
              value={cloudInput}
              onChange={(e) => setCloudInput(e.target.value)}
              size="large"
              className="rounded-lg border-gray-300 focus:border-[#52aeb2] focus:ring-[#52aeb2]/20"
            />
            <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
              <Typography.Text className="text-xs text-blue-600/80">
                💡 Asegúrate de que el archivo tenga acceso <strong>"Cualquier persona con el enlace"</strong> como lector.
              </Typography.Text>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

