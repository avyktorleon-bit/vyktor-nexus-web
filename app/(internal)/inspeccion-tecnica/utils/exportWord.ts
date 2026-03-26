import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { InspeccionData } from '../types';

export async function exportToWord(data: InspeccionData) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // CABECERA CORPORATIVA
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "NEXUS | EVALUACIÓN TÉCNICA E INSPECCIÓN",
                bold: true,
                size: 28,
                color: "2f4860",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: `CÓDIGO: ${data.codigoInspeccion}`,
                bold: true,
                size: 20,
              }),
            ],
          }),

          // 1. DATOS GENERALES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun("1. INFORMACIÓN GENERAL")],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Fecha:")] }),
                  new TableCell({ children: [new Paragraph(data.fecha)] }),
                  new TableCell({ children: [new Paragraph("Estado:")] }),
                  new TableCell({ children: [new Paragraph(data.estado)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Dirección:")] }),
                  new TableCell({ children: [new Paragraph(data.direccion)], columnSpan: 3 }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Propietario Legal:")] }),
                  new TableCell({ children: [new Paragraph(data.propietarioLegal)], columnSpan: 3 }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Representante:")] }),
                  new TableCell({ children: [new Paragraph(data.representante)], columnSpan: 3 }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Inspector:")] }),
                  new TableCell({ children: [new Paragraph(data.inspector)], columnSpan: 3 }),
                ],
              }),
            ],
          }),

          // 2. SITUACIÓN DOCUMENTAL
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400 },
            children: [new TextRun("2. SITUACIÓN DOCUMENTAL")],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Documentos Legales:",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun(`Partida Registral: ${data.docsEntregados.partidaRegistral ? `SÍ (N° ${data.docsEntregados.numeroPartida})` : "NO"}`)],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun(`Copia Literal: ${data.docsEntregados.copiaLiteral ? "SÍ" : "NO"}`)],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun(`Planos Existentes: ${[
              data.docsEntregados.planosArquitectura ? "Arquitectura" : null,
              data.docsEntregados.planosEstructuras ? "Estructuras" : null,
              data.docsEntregados.planosSanitarias ? "Sanitarias" : null,
              data.docsEntregados.planosElectricas ? "Eléctricas" : null,
            ].filter(Boolean).join(", ") || "Ninguno"}`)],
          }),

          // 3. INSPECCIÓN POR NIVELES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400 },
            children: [new TextRun("3. INSPECCIÓN TÉCNICA POR NIVELES")],
          }),
          ...data.pisos.flatMap((piso) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [new TextRun(`Nivel / Piso ${piso.numero}`)],
            }),
            new Paragraph({
              children: [new TextRun({ text: "Arquitectura (Observado):", bold: true })]
            }),
            new Paragraph({ text: piso.arquitectura.observado || "Sin observaciones." }),
            new Paragraph({
              spacing: { before: 200 },
              children: [new TextRun({ text: "Estructuras (Observado):", bold: true })]
            }),
            new Paragraph({ text: piso.estructuras.observado || "Sin observaciones." }),
            new Paragraph({
              spacing: { before: 200 },
              children: [new TextRun({ text: "Intervención Propuesta:", bold: true, color: "ea7048" })]
            }),
            new Paragraph({ text: piso.intervencionPropuesta || "No especificada." }),
          ]),

          // 4. ANÁLISIS DE RIESGOS Y PATOLOGÍAS
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400 },
            children: [new TextRun("4. ANÁLISIS DE RIESGOS Y PATOLOGÍAS")],
          }),
          new Paragraph({
            children: [new TextRun({ text: "Riesgos Estructurales:", bold: true })]
          }),
          new Paragraph({ text: data.riesgos.estructurales || "Ninguno detectado." }),
          new Paragraph({
            spacing: { before: 400 },
            children: [new TextRun({ text: "Patologías Constructivas:", bold: true })]
          }),
          new Paragraph({ text: data.patologias.tipoUbicacion || "No se registran patologías críticas." }),

          // 5. PANEL FOTOGRÁFICO (ENLACES)
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400 },
            children: [new TextRun("5. PANEL FOTOGRÁFICO (TRAZABILIDAD)")],
          }),
          new Paragraph({ 
            children: [
              new TextRun({ 
                text: "Los siguientes enlaces redirigen al registro fotográfico oficial en la nube:", 
                color: "555555", 
                italics: true 
              })
            ] 
          }),
          ...data.fotosChecklist.filter(f => f.checked).map(f => 
            new Paragraph({
              bullet: { level: 0 },
              children: [
                new TextRun({ text: `${f.label}: `, bold: true }),
                new TextRun({ text: f.url || "Pendiente subir a Drive", color: f.url ? "0000FF" : "FF0000" }),
              ]
            })
          ),
          ...data.fotosPanel.map(f => 
            new Paragraph({
              bullet: { level: 0 },
              children: [
                new TextRun({ text: `${f.label}: `, bold: true }),
                new TextRun({ text: f.descripcion ? `(${f.descripcion}) ` : "" }),
                new TextRun({ text: f.url || "Sin link", color: "0000FF" }),
              ]
            })
          ),

          // 6. CONCLUSIONES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400 },
            children: [new TextRun("6. CONCLUSIONES Y RECOMENDACIONES")],
          }),
          new Paragraph({ text: data.proximosPasos || "Preparar informe técnico detallado para el cliente." }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Informe_Inspeccion_${data.codigoInspeccion}_${data.fecha}.docx`);
}
