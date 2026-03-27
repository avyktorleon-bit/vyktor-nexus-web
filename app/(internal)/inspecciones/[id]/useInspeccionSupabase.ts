import { useReducer, useEffect, useRef, useState, useCallback } from 'react';
import { InspeccionData, InspeccionAction, PisoData } from '../../inspeccion-tecnica/types';
import { supabase } from '@/lib/supabase';

const especialidadVacia = { observado: '', declarado: '', pendienteVerificar: '' };

const pisoInicial: PisoData = {
  id: 'piso-1',
  numero: 1,
  arquitectura: { ...especialidadVacia },
  estructuras: { ...especialidadVacia },
  sanitarias: { ...especialidadVacia },
  electricas: { ...especialidadVacia },
  gas: { ...especialidadVacia },
  intervencionPropuesta: '',
  incidencias: '',
  observacionesAdicionales: '',
};

const initialState: InspeccionData = {
  fecha: new Date().toISOString().split('T')[0],
  codigoInspeccion: `INSP-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
  inspector: '',
  estado: 'Borrador',
  direccion: '',
  distritoProvincia: '',
  urbanizacionSector: '',
  referencia: '',
  coordenadas: '',
  propietarioLegal: '',
  dniPropietario: '',
  poseedorActual: '',
  representante: '',
  personaContacto: '',
  telefonoContacto: '',
  familiares: [],
  docsEntregados: {
    partidaRegistral: false,
    numeroPartida: '',
    copiaLiteral: false,
    constanciaPosesion: false,
    planosArquitectura: false,
    planosEstructuras: false,
    planosSanitarias: false,
    planosElectricas: false,
    formatoPlanos: '',
  },
  docsFaltantes: '',
  observacionesDoc: '',
  requerimientos: {
    reqConstruir: false,
    reqAmpliar: false,
    reqModificar: false,
    reqRemodelar: false,
    reqRegularizar: false,
    reqDemoler: false,
    reqIndependizar: false,
    reqSubdividir: false,
    reqConsultaTecnica: false,
  },
  resumenCliente: '',
  numeroPisos: 1,
  pisos: [{ ...pisoInicial }],
  evaluacionPreliminar: '',
  limitaciones: { acceso: '', visibilidad: '', documentales: '' },
  riesgos: { estructurales: '', uso: '', legales: '' },
  patologias: { tipoUbicacion: '', gravedad: '' },
  fotosChecklist: [
    { id: 'fc-1', key: 'fachada', label: 'Foto Fachada (Puntos de Acceso)', checked: false },
    { id: 'fc-2', key: 'calle', label: 'Foto Vía / Calle (Puntos de Redes)', checked: false },
    { id: 'fc-3', key: 'piso-1', label: 'Fotos Nivel 1', checked: false },
  ],
  fotosPanel: [],
  observacionesFinales: '',
  proximosPasos: '',
};

// Función para detectar y reparar strings rotos como {"0":"E", "1":"s", "2":" "}
function cleanEspecialidad(especialidad: any) {
  if (!especialidad) return { observado: '', declarado: '', pendienteVerificar: '' };
  
  if (typeof especialidad === 'string') {
    return { observado: especialidad, declarado: '', pendienteVerificar: '' };
  }
  
  if (typeof especialidad === 'object' && !Array.isArray(especialidad)) {
    const result = { ...especialidad };

    // Detectar si el objeto tiene claves numéricas (corrupción de spread string)
    const hasIndexedKeys = '0' in result && typeof result['0'] === 'string';

    if (hasIndexedKeys) {
      // Reconstruir el string desde las claves numéricas
      let reconstructed = '';
      let i = 0;
      while (String(i) in result) {
        reconstructed += result[String(i)];
        i++;
      }

      // Si ya hay un "observado" válido, lo preferimos, sino usamos el reconstruido
      const finalObservado = (typeof result.observado === 'string' && result.observado.length > 0)
        ? result.observado
        : reconstructed;

      return {
        observado: finalObservado,
        declarado: typeof result.declarado === 'string' ? result.declarado : '',
        pendienteVerificar: typeof result.pendienteVerificar === 'string' ? result.pendienteVerificar : ''
      };
    }

    // Caso: Subcampos individuales rotos
    ['observado', 'declarado', 'pendienteVerificar'].forEach(key => {
      if (result[key] && typeof result[key] === 'object' && '0' in result[key]) {
        let reconstructed = '';
        let i = 0;
        while(String(i) in result[key]) {
          reconstructed += result[key][String(i)];
          i++;
        }
        result[key] = reconstructed;
      }
    });

    return {
      observado: result.observado || '',
      declarado: result.declarado || '',
      pendienteVerificar: result.pendienteVerificar || ''
    };
  }
  
  return especialidad;
}

function normalizePisos(pisos: any[]) {
   if (!Array.isArray(pisos)) return pisos;
   return pisos.map(piso => ({
      ...piso,
      arquitectura: cleanEspecialidad(piso.arquitectura),
      estructuras: cleanEspecialidad(piso.estructuras),
      sanitarias: cleanEspecialidad(piso.sanitarias),
      electricas: cleanEspecialidad(piso.electricas),
      gas: cleanEspecialidad(piso.gas),
   }));
}

// Reutilizamos el reducer (simplificado para brevedad pero completo)
function reducer(state: InspeccionData, action: InspeccionAction): InspeccionData {
  switch (action.type) {
    case 'UPDATE_ROOT_FIELD': return { ...state, [action.field]: action.value };
    case 'LOAD_DRAFT': {
      const loaded = action.data;
      return { 
        ...initialState, 
        ...loaded,
        pisos: loaded.pisos ? normalizePisos(loaded.pisos) : initialState.pisos,
        docsEntregados: { ...initialState.docsEntregados, ...loaded.docsEntregados },
        requerimientos: { ...initialState.requerimientos, ...loaded.requerimientos },
        limitaciones: { ...initialState.limitaciones, ...loaded.limitaciones },
        riesgos: { ...initialState.riesgos, ...loaded.riesgos },
        patologias: { ...initialState.patologias, ...loaded.patologias },
        fotosChecklist: loaded.fotosChecklist || initialState.fotosChecklist,
        fotosPanel: loaded.fotosPanel || initialState.fotosPanel,
      };
    }
    case 'UPDATE_DOCS_ENTREGADOS': return { ...state, docsEntregados: { ...state.docsEntregados, [action.field]: action.value } };
    case 'UPDATE_REQUERIMIENTOS': return { ...state, requerimientos: { ...state.requerimientos, [action.field]: action.value } };
    case 'UPDATE_LIMITACIONES': return { ...state, limitaciones: { ...state.limitaciones, [action.field]: action.value } };
    case 'UPDATE_RIESGOS': return { ...state, riesgos: { ...state.riesgos, [action.field]: action.value } };
    case 'UPDATE_NUMERO_PISOS': {
        const { count } = action;
        const currentCount = state.pisos.length;
        let newPisos = [...state.pisos];
        if (count > currentCount) {
          for (let i = currentCount; i < count; i++) {
            newPisos.push({ ...pisoInicial, id: `piso-${i+1}`, numero: i+1 });
          }
        } else {
          newPisos = newPisos.slice(0, count);
        }
        return { ...state, numeroPisos: count, pisos: newPisos };
    }
    case 'UPDATE_PISO_FIELD': {
      const newPisos = state.pisos.map((p) => p.id === action.pisoId ? { ...p, [action.field]: action.value } : p);
      return { ...state, pisos: newPisos };
    }
    case 'UPDATE_PISO_ESPECIALIDAD': {
      const newPisos = state.pisos.map((p) => {
        if (p.id === action.pisoId) {
          // Aseguramos que el campo base sea un objeto válido antes del spread
          const baseEsp = cleanEspecialidad(p[action.especialidad]);
          return { 
            ...p, 
            [action.especialidad]: { 
              ...baseEsp, 
              [action.subField]: action.value 
            } 
          };
        }
        return p;
      });
      return { ...state, pisos: newPisos };
    }
    // ... otros casos si son necesarios
    default: return state;
  }
}

export function useInspeccionSupabase(inspeccionId: string, initialData: any) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...initialData });
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const isInitialMount = useRef(true);

  // Guardar en Supabase
  const saveToSupabase = useCallback(async (data: InspeccionData) => {
    if (!supabase) {
      return;
    }

    const client = supabase;

    try {
      const { error } = await client
        .from('inspecciones')
        .upsert({
          id: inspeccionId,
          numero_inspeccion: data.codigoInspeccion,
          propietaria: data.propietarioLegal,
          direccion: data.direccion,
          fecha: data.fecha,
          estado: data.estado,
          observaciones: data.resumenCliente,
          mejoras_pendientes: data.proximosPasos,
          data: data // Guardamos el objeto completo en la columna JSONB
        });

      if (error) throw error;
      setLastSaved(new Date());
    } catch (err) {
      console.error("Error guardando en Supabase:", err);
    }
  }, [inspeccionId]);

  // Auto-guardado
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const timer = setTimeout(() => saveToSupabase(state), 3000);
    return () => clearTimeout(timer);
  }, [state, saveToSupabase]);

  return { state, dispatch, saveToSupabase, lastSaved };
}
