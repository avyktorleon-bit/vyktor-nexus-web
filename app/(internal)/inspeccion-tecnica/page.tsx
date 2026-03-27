"use client";

import React, { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useInspeccionForm } from './hooks/useInspeccionForm';
import { ActionsHeader } from './components/UI/ActionsHeader';
import { supabase } from '@/lib/supabase';
import { FormGeneral } from './components/FormGeneral';
import { FormDocumentacion } from './components/FormDocumentacion';
import { FormRequerimiento } from './components/FormRequerimiento';
import { FormPisos } from './components/FormPisos';
import { FormFotos } from './components/FormFotos';
import { FormConclusiones } from './components/FormConclusiones';
import { Alert, Spin, message } from 'antd';

function InspeccionTecnicaContent() {
  const { state, dispatch, saveDraft, clearForm, lastSaved } = useInspeccionForm();
  const [isImproving, setIsImproving] = React.useState(false);
  const [isPublishing, setIsPublishing] = React.useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
    
    // Si viene del botón 'Nueva Inspección', limpiamos el formulario para fresh start
    if (searchParams.get('new') === 'true') {
      clearForm();
      // Limpiar la URL para evitar reinicios accidentales
      window.history.replaceState({}, '', '/inspeccion-tecnica');
    }
  }, [searchParams]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spin size="large" />
          <div className="text-[#ea7048] font-bold tracking-widest text-sm uppercase">Cargando Evaluador Técnico...</div>
        </div>
      </div>
    );
  }

  const handleImproveAI = async () => {
    setIsImproving(true);
    try {
      // Gather relevant text fields for AI to improve (only text fields with content are usually worth improving contextually)
      const fieldsToImprove = {
        resumenCliente: state.resumenCliente,
        evaluacionPreliminar: state.evaluacionPreliminar,
        docsFaltantes: state.docsFaltantes,
        observacionesFinales: state.observacionesFinales,
        proximosPasos: state.proximosPasos,
        limitaciones: {
          acceso: state.limitaciones?.acceso,
          visibilidad: state.limitaciones?.visibilidad,
          documentales: state.limitaciones?.documentales,
        },
        riesgos: {
          estructurales: state.riesgos?.estructurales,
          uso: state.riesgos?.uso,
          legales: state.riesgos?.legales,
        },
        pisos: state.pisos.map((p) => ({
          id: p.id,
          intervencionPropuesta: p.intervencionPropuesta,
          incidencias: p.incidencias,
          observacionesAdicionales: p.observacionesAdicionales,
          arquitectura: p.arquitectura.observado,
          estructuras: p.estructuras.observado,
        })),
      };

      const response = await fetch('/api/ia/mejorar-texto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fieldsToImprove),
      });

      if (!response.ok) throw new Error('Error al conectar con la IA');

      const refinedData = await response.json();

      // Root Fields
      ['resumenCliente', 'evaluacionPreliminar', 'docsFaltantes', 'observacionesFinales', 'proximosPasos'].forEach((key) => {
        if (refinedData[key]) {
          dispatch({ type: 'UPDATE_ROOT_FIELD', field: key as any, value: refinedData[key] });
        }
      });

      // Nested Fields
      if (refinedData.limitaciones) {
        ['acceso', 'visibilidad', 'documentales'].forEach(subkey => {
          if (refinedData.limitaciones[subkey]) {
               dispatch({ type: 'UPDATE_LIMITACIONES', field: subkey as any, value: refinedData.limitaciones[subkey] });
          }
        });
      }

      if (refinedData.riesgos) {
        ['estructurales', 'uso', 'legales'].forEach(subkey => {
          if (refinedData.riesgos[subkey]) {
               dispatch({ type: 'UPDATE_RIESGOS', field: subkey as any, value: refinedData.riesgos[subkey] });
          }
        });
      }

      // Pisos
      if (refinedData.pisos) {
        refinedData.pisos.forEach((pisoRefinado: any) => {
          ['intervencionPropuesta', 'incidencias', 'observacionesAdicionales'].forEach((field) => {
             if (pisoRefinado[field]) {
               dispatch({
                 type: 'UPDATE_PISO_FIELD',
                 pisoId: pisoRefinado.id,
                 field: field as any,
                 value: pisoRefinado[field],
               });
             }
          });
          
          ['arquitectura', 'estructuras'].forEach((esp) => {
             if (pisoRefinado[esp]) {
                dispatch({
                  type: 'UPDATE_PISO_ESPECIALIDAD',
                  pisoId: pisoRefinado.id,
                  especialidad: esp as any,
                  subField: 'observado',
                  value: pisoRefinado[esp]
                });
             }
          });
        });
      }

      message.success('Textos mejorados por la IA con éxito.');
    } catch (error) {
      console.error(error);
      message.error('No se pudo mejorar el texto. Revisa la consola.');
    } finally {
      setIsImproving(false);
    }
  };

  const handlePublish = async () => {
    // Validamos campos mínimos requeridos
    if (!state.propietarioLegal || !state.direccion) {
      message.warning('Por favor completa al menos el Propietario y la Dirección antes de guardar en la nube.');
      return;
    }

    if (!supabase) {
      message.error('Supabase no esta configurado en este entorno. La publicacion en la nube no esta disponible.');
      return;
    }

    setIsPublishing(true);
    try {
      // Intentamos insertar la nueva inspección en Supabase
      const { data, error } = await supabase
        .from('inspecciones')
        .insert({
          numero_inspeccion: state.codigoInspeccion,
          propietaria: state.propietarioLegal,
          direccion: state.direccion,
          fecha: state.fecha,
          estado: 'Borrador',
          observaciones: state.resumenCliente,
          mejoras_pendientes: state.proximosPasos,
          data: state // Objeto completo JSONB
        })
        .select()
        .single();

      if (error) throw error;

      message.success('¡Inspección guardada y sincronizada en el sistema!');
      
      // Limpiamos el borrador local ya que ahora está en la nube
      await clearForm();
      
      // Redirigimos a la página de detalle/edición de la inspección creada
      if (data?.id) {
        router.push(`/inspecciones/${data.id}`);
      } else {
        router.push('/inspecciones');
      }
    } catch (error: any) {
      console.error(error);
      message.error('Error al guardar en la nube: ' + (error.message || 'Error desconocido'));
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      <ActionsHeader
        data={state}
        onSaveDraft={handlePublish} // Mapeamos el botón Guardar a Publicar en Supabase
        onClear={clearForm}
        onImport={(data) => dispatch({ type: 'LOAD_DRAFT', data })}
        onImproveAI={handleImproveAI}
        isImproving={isImproving || isPublishing}
        lastSaved={lastSaved}
        backUrl="/inspecciones"
      />

      <main className="container mx-auto px-4 max-w-5xl">
        <Alert
          message="Modo Desarrollo (MVP)"
          description="Los datos se guardan temporalmente en tu navegador. Exporta para no perderlos."
          type="info"
          showIcon
          className="mb-8"
          closable
        />

        <FormGeneral data={state} dispatch={dispatch} />
        <FormDocumentacion data={state} dispatch={dispatch} />
        <FormRequerimiento data={state} dispatch={dispatch} />
        <FormPisos data={state} dispatch={dispatch} />
        <FormFotos data={state} dispatch={dispatch} />
        <FormConclusiones data={state} dispatch={dispatch} />
      </main>
    </div>
  );
}

export default function InspeccionTecnicaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Spin size="large" />
            <div className="text-[#ea7048] font-bold tracking-widest text-sm uppercase">Cargando Evaluador Tecnico...</div>
          </div>
        </div>
      }
    >
      <InspeccionTecnicaContent />
    </Suspense>
  );
}
