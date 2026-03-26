import { useReducer, useEffect, useRef, useState } from 'react';
import { InspeccionData, InspeccionAction, PisoData } from '../types';
import { saveToDB, getFromDB, deleteFromDB } from '../../../../lib/db';

const especialidadVacia = {
  observado: '',
  declarado: '',
  pendienteVerificar: ''
};

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
  limitaciones: {
    acceso: '',
    visibilidad: '',
    documentales: '',
  },
  riesgos: {
    estructurales: '',
    uso: '',
    legales: '',
  },
  patologias: {
    tipoUbicacion: '',
    gravedad: '',
  },

  fotosChecklist: [
    { id: 'fc-1', key: 'fachada', label: 'Foto Fachada (Puntos de Acceso)', checked: false },
    { id: 'fc-2', key: 'calle', label: 'Foto Vía / Calle (Puntos de Redes)', checked: false },
    { id: 'fc-3', key: 'piso-1', label: 'Fotos Nivel 1', checked: false },
  ],
  fotosPanel: [],
  observacionesFinales: '',
  proximosPasos: '',
};

function reducer(state: InspeccionData, action: InspeccionAction): InspeccionData {
  switch (action.type) {
    case 'UPDATE_ROOT_FIELD':
      return { ...state, [action.field]: action.value };
      
    case 'UPDATE_DOCS_ENTREGADOS':
      return { ...state, docsEntregados: { ...state.docsEntregados, [action.field]: action.value } };
      
    case 'UPDATE_REQUERIMIENTOS':
      return { ...state, requerimientos: { ...state.requerimientos, [action.field]: action.value } };
      
    case 'UPDATE_LIMITACIONES':
      return { ...state, limitaciones: { ...state.limitaciones, [action.field]: action.value } };
      
    case 'UPDATE_RIESGOS':
      return { ...state, riesgos: { ...state.riesgos, [action.field]: action.value } };
      
    case 'UPDATE_PATOLOGIAS':
      return { ...state, patologias: { ...state.patologias, [action.field]: action.value } };

    case 'UPDATE_NUMERO_PISOS': {
      const { count } = action;
      const currentCount = state.pisos.length;
      let newPisos = [...state.pisos];
      let newFotosChecklist = [...state.fotosChecklist];

      if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
          const num = i + 1;
          newPisos.push({
            id: `piso-${num}`,
            numero: num,
            arquitectura: { ...especialidadVacia },
            estructuras: { ...especialidadVacia },
            sanitarias: { ...especialidadVacia },
            electricas: { ...especialidadVacia },
            gas: { ...especialidadVacia },
            intervencionPropuesta: '',
            incidencias: '',
            observacionesAdicionales: '',
          });
        }
      } else if (count < currentCount) {
        newPisos = newPisos.slice(0, count);
      }

      // REGENERAR fotosChecklist para asegurar concordancia total
      const globalFotos = newFotosChecklist.filter(f => !f.key.startsWith('piso-'));
      const levelFotos = [];
      for(let i=1; i<=count; i++) {
        const existing = newFotosChecklist.find(f => f.key === `piso-${i}`);
        levelFotos.push(existing || {
           id: `fc-p-${i}-${Date.now()}`,
           key: `piso-${i}`,
           label: `Fotos Nivel ${i}`,
           checked: false
        });
      }

      return { ...state, numeroPisos: count, pisos: newPisos, fotosChecklist: [...globalFotos, ...levelFotos] };
    }

    case 'UPDATE_PISO_FIELD': {
      const newPisos = state.pisos.map((piso) =>
        piso.id === action.pisoId ? { ...piso, [action.field]: action.value } : piso
      );
      return { ...state, pisos: newPisos };
    }

    case 'UPDATE_PISO_ESPECIALIDAD': {
      const newPisos = state.pisos.map((piso) => {
        if (piso.id === action.pisoId) {
          // Aseguramos que el campo base sea un objeto válido antes del spread
          const baseEsp = cleanEspecialidad(piso[action.especialidad]);
          return {
            ...piso,
            [action.especialidad]: {
              ...baseEsp,
              [action.subField]: action.value
            }
          };
        }
        return piso;
      });
      return { ...state, pisos: newPisos };
    }

    case 'ADD_FAMILIAR': {
      const newFamiliar = {
        id: `familiar-${Date.now()}`,
        nombre: '',
        relacion: '',
        telefono: '',
      };
      return { ...state, familiares: [...state.familiares, newFamiliar] };
    }

    case 'REMOVE_FAMILIAR': {
      return {
        ...state,
        familiares: state.familiares.filter((f) => f.id !== action.id),
      };
    }

    case 'UPDATE_FAMILIAR': {
      const newFamiliares = state.familiares.map((f) =>
        f.id === action.id ? { ...f, [action.field]: action.value } : f
      );
      return { ...state, familiares: newFamiliares };
    }

    case 'UPDATE_FOTO_CHECK': {
      const newChecklist = state.fotosChecklist.map((f) =>
        f.id === action.id ? { ...f, [action.field]: action.value } : f
      );
      return { ...state, fotosChecklist: newChecklist };
    }

    case 'ADD_FOTO_ENLACE': {
      const newFoto = {
        id: `foto-${Date.now()}`,
        label: '',
        url: '',
        descripcion: '',
      };
      return { ...state, fotosPanel: [...state.fotosPanel, newFoto] };
    }

    case 'REMOVE_FOTO_ENLACE': {
      return {
        ...state,
        fotosPanel: state.fotosPanel.filter((f) => f.id !== action.id),
      };
    }

    case 'UPDATE_FOTO_ENLACE': {
      const newFotos = state.fotosPanel.map((f) =>
        f.id === action.id ? { ...f, [action.field]: action.value } : f
      );
      return { ...state, fotosPanel: newFotos };
    }

    case 'RESET_FORM': {
      return {
        ...initialState,
        codigoInspeccion: `INSP-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
        fecha: new Date().toISOString().split('T')[0],
      };
    }

    case 'LOAD_DRAFT':
      // Asegurarse de mantener la estructura anidada si el JSON guardado es viejo
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

    default:
      return state;
  }
}

export function useInspeccionForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const isInitialMount = useRef(true);

  // Cargar desde IndexedDB al iniciar
  useEffect(() => {
    async function loadData() {
      try {
        const stored = await getFromDB('inspeccion_draft');
        if (stored) {
          dispatch({ type: 'LOAD_DRAFT', data: stored as InspeccionData });
        }
      } catch (error) {
        console.error("Error al leer el borrador de IndexedDB", error);
        // Fallback a localStorage por si acaso
        const ls = localStorage.getItem('inspeccion_draft');
        if (ls) dispatch({ type: 'LOAD_DRAFT', data: JSON.parse(ls) });
      }
    }
    loadData();
  }, []);

  // Auto-guardado con debounce
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      saveDraft();
    }, 2000);

    return () => clearTimeout(timer);
  }, [state]);

  const saveDraft = async () => {
    try {
      await saveToDB('inspeccion_draft', state);
      setLastSaved(new Date());
      localStorage.setItem('inspeccion_draft_meta', new Date().toISOString());
    } catch (error) {
      console.error("Error al guardar borrador", error);
    }
  };

  const clearForm = async () => {
    try {
      await deleteFromDB('inspeccion_draft');
      localStorage.removeItem('inspeccion_draft_meta');
    } catch {}
    dispatch({ type: 'RESET_FORM' });
  };

  return { state, dispatch, saveDraft, clearForm, lastSaved };
}
