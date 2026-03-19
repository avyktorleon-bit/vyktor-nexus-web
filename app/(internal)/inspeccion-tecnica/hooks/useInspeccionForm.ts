import { useReducer, useEffect } from 'react';
import { InspeccionData, InspeccionAction, PisoData } from '../types';

const initialState: InspeccionData = {
  fecha: new Date().toISOString().split('T')[0],
  codigoInspeccion: `INSP-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
  personaContacto: '',
  telefono: '',
  
  direccion: '',
  distritoProvincia: '',
  urbanizacionSector: '',
  referencia: '',
  
  propietarioLegal: '',
  dniPropietario: '',
  familiares: [],

  partidaRegistral: false,
  numeroPartida: '',
  copiaLiteral: false,
  constanciaPosesion: false,
  planosArquitectura: false,
  planosEstructuras: false,
  planosSanitarias: false,
  planosElectricas: false,
  formatoPlanos: '',
  observacionesDoc: '',

  reqConstruir: false,
  reqAmpliar: false,
  reqModificar: false,
  reqRemodelar: false,
  reqRegularizar: false,
  reqDemoler: false,
  reqIndependizar: false,
  reqSubdividir: false,
  reqConsultaTecnica: false,
  resumenCliente: '',

  numeroPisos: 1,
  pisos: [
    {
      id: 'piso-1',
      numero: 1,
      arquitectura: '',
      estructuras: '',
      sanitarias: '',
      electricas: '',
      gas: '',
      otraEspecialidad: '',
      intervencion: '',
      observaciones: '',
    },
  ],

  evaluacionPreliminar: '',
  documentosFaltantes: '',
  proximosPasos: '',
  observacionesFinales: '',
  notasPropietario: '',
};

function reducer(state: InspeccionData, action: InspeccionAction): InspeccionData {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
      
    case 'UPDATE_NUMERO_PISOS': {
      const { count } = action;
      // Ajustar cantidad de pisos manteniendo la info previa si se reduce
      const currentCount = state.pisos.length;
      let newPisos = [...state.pisos];

      if (count > currentCount) {
        for (let i = currentCount; i < count; i++) {
          newPisos.push({
            id: `piso-${i + 1}`,
            numero: i + 1,
            arquitectura: '',
            estructuras: '',
            sanitarias: '',
            electricas: '',
            gas: '',
            otraEspecialidad: '',
            intervencion: '',
            observaciones: '',
          });
        }
      } else if (count < currentCount) {
        newPisos = newPisos.slice(0, count);
      }

      return { ...state, numeroPisos: count, pisos: newPisos };
    }

    case 'UPDATE_PISO_FIELD': {
      const newPisos = state.pisos.map((piso) =>
        piso.id === action.pisoId ? { ...piso, [action.field]: action.value } : piso
      );
      return { ...state, pisos: newPisos };
    }

    case 'ADD_FAMILIAR': {
      const newFamiliar = {
        id: `familiar-${Date.now()}`,
        nombre: '',
        relacion: '',
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

    case 'RESET_FORM': {
      return {
        ...initialState,
        codigoInspeccion: `INSP-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
        fecha: new Date().toISOString().split('T')[0],
      };
    }

    case 'LOAD_DRAFT':
      return { ...initialState, ...action.data };

    default:
      return state;
  }
}

export function useInspeccionForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Intentar leer el borrador
    try {
      const stored = localStorage.getItem('inspeccion_draft');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed) {
          dispatch({ type: 'LOAD_DRAFT', data: parsed });
        }
      }
    } catch (error) {
      console.error("Error al leer el borrador local", error);
    }
  }, []);

  const saveDraft = () => {
    try {
      localStorage.setItem('inspeccion_draft', JSON.stringify(state));
    } catch (error) {
      console.error("Error al guardar borrador", error);
    }
  };

  const clearForm = () => {
    try {
      localStorage.removeItem('inspeccion_draft');
    } catch {}
    dispatch({ type: 'RESET_FORM' });
  };

  return { state, dispatch, saveDraft, clearForm };
}
