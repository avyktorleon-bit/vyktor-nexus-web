"use client";

import React from 'react';
import { Card, Table, Button, Space, Tag, Typography } from 'antd';
import Link from 'next/link';
import { RefreshCcw, FileText, Plus, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

interface Inspeccion {
  id: string;
  numero_inspeccion: string;
  propietaria: string;
  direccion: string;
  fecha: string;
  estado: string;
  observaciones: string;
  mejoras_pendientes: string;
  created_at: string;
}

interface Props {
  data: Inspeccion[];
}

export default function InspeccionesClient({ data }: Props) {
  const router = useRouter();

  const columns = [
    {
      title: 'N° Inspección',
      dataIndex: 'numero_inspeccion',
      key: 'numero_inspeccion',
      render: (text: string) => <Text strong className="text-blue-600">{text}</Text>,
    },
    {
      title: 'Propietaria',
      dataIndex: 'propietaria',
      key: 'propietaria',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado: string) => {
        let color = 'gold';
        if (estado === 'Completado') color = 'green';
        if (estado === 'Pendiente') color = 'blue';
        return <Tag color={color}>{estado.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (fecha: string) => new Date(fecha).toLocaleDateString(),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_: any, record: any) => (
        <Link href={`/inspecciones/${record.id}`}>
          <Button type="primary" size="small" icon={<FileText size={14} className="mr-1" />}>
            Abrir
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <Title level={2} className="!mb-1">Gestión de Inspecciones</Title>
            <Text type="secondary">Listado de inspecciones técnicas registradas en el sistema.</Text>
          </div>
          <Space>
            <Link href="/panel-personal">
              <Button icon={<ArrowLeft size={16} />} className="flex items-center gap-2">
                Volver al panel
              </Button>
            </Link>
            <Button 
                onClick={() => router.refresh()} 
                icon={<RefreshCcw size={16} />} 
                className="flex items-center gap-2"
            >
              Actualizar
            </Button>
            <Link href="/inspeccion-tecnica?new=true">
              <Button type="primary" icon={<Plus size={16} />} className="flex items-center gap-2 bg-[#ea7048]">
                Nueva Inspección
              </Button>
            </Link>
          </Space>
        </header>

        <Card variant="borderless" className="shadow-sm overflow-hidden border-none rounded-xl">
          <Table 
            dataSource={data} 
            columns={columns} 
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="nexus-excel-table"
          />
        </Card>
      </div>
    </div>
  );
}
