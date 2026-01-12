export interface NewsArticle {
    slug: string;
    title: string;
    date: string;
    category: string;
    tagColor: string;
    image: string;
    subtitle: string;
    content: string; // HTML string or plain text
    quote?: string;
    extraSectionTitle?: string;
    extraSectionContent?: string;
}

export const newsData: Record<string, NewsArticle> = {
    'aeropuerto': {
        slug: 'aeropuerto',
        title: 'Nuevo Aeropuerto Jorge Chávez: Avance del 80%',
        date: '08 de Enero, 2026',
        category: 'Infraestructura',
        tagColor: '#ec4899',
        image: '/assets/img/noticias/aeropuerto-jorge-chavez.jpg', // Ensure this image exists or use placeholder
        subtitle: 'La nueva terminal de pasajeros transformará la conectividad aérea de Lima y Sudamérica.',
        content: `
            <p>El proyecto de ampliación del <strong>Aeropuerto Internacional Jorge Chávez</strong> ha alcanzado un hito crucial con un avance físico que supera el <strong>80%</strong>. La nueva terminal de pasajeros, diseñada para ser una verdadera ciudad aeroportuaria, se prepara para su inauguración oficial prevista para el 2025 (y operaciones plenas en 2026).</p>
            
            <h2>Dimensiones del Proyecto</h2>
            <p>Con una inversión multimillonaria, la nueva infraestructura incluye una segunda pista de aterrizaje (ya operativa), una nueva torre de control y un terminal de pasajeros que duplicará la capacidad actual, permitiendo atender a más de <strong>30 millones de pasajeros</strong> al año.</p>
        `,
        quote: "Este aeropuerto no solo es una obra de ingeniería, es el nuevo rostro de bienvenida del Perú al mundo.",
        extraSectionTitle: "Tecnología y Sostenibilidad",
        extraSectionContent: "El diseño incorpora sistemas antisísmicos de última generación y una arquitectura que prioriza la luz natural y la eficiencia energética. Además, se implementarán sistemas biométricos para agilizar el flujo de pasajeros, posicionándolo como uno de los aeropuertos más modernos de la región."
    },
    'chancay': {
        slug: 'chancay',
        title: 'Puerto de Chancay: Segundo puerto más activo del Perú',
        date: '08 de Enero, 2026',
        category: 'Comercio',
        tagColor: '#64748b',
        image: '/assets/img/noticias/chancay.jpg',
        subtitle: 'Inaugurado en noviembre de 2024, el megapuerto ha reducido los tiempos de envío a Asia en más de 10 días.',
        content: `
            <p>A poco más de un año de su inauguración oficial el <strong>14 de noviembre de 2024</strong>, el Terminal Portuario Multipropósito de Chancay se ha consolidado como un eje logístico fundamental para la región. Datos recientes de finales de 2025 indican que ya es el segundo puerto con mayor movimiento de contenedores (TEU) en el país, solo superado por el Callao.</p>

            <h2>Impacto Económico</h2>
            <p>La operación comercial plena, que inició en el primer trimestre de 2025, ha permitido:</p>
            <ul>
                <li>Reducción de costos logísticos para agroexportadores.</li>
                <li>Conexión directa Shanghai-Chancay sin escalas.</li>
                <li>Dinamización de la economía local del norte chico.</li>
            </ul>
        `,
        quote: "Chancay no compite con el Callao, lo complementa. Juntos forman el hub logístico más importante de la costa oeste de Sudamérica.",
        extraSectionTitle: "Expansión Futura",
        extraSectionContent: "Con la primera etapa operativa (4 muelles), los operadores ya evalúan la demanda para futuras expansiones. La tecnología implementada, incluyendo grúas pórtico automatizadas y vehículos eléctricos, ha puesto la valla alta en términos de eficiencia portuaria y sostenibilidad ambiental."
    },
    'estadio-denver': {
        slug: 'estadio-denver',
        title: 'Mortenson construirá estadio femenino de $225M en Denver',
        date: '09 de Enero, 2026',
        category: 'Internacional',
        tagColor: '#f59e0b',
        image: '/assets/img/noticias/estadio-denver.jpg',
        subtitle: 'Un hito para el deporte femenino y la arquitectura deportiva sostenible.',
        content: `
            <p>La constructora <strong>Mortenson</strong> ha sido seleccionada para liderar el proyecto del nuevo estadio de fútbol femenino en Denver, Colorado. Con una inversión estimada de <strong>$225 millones</strong>, este recinto promete ser un referente en diseño sostenible y experiencia para el aficionado.</p>

            <h2>Características del Proyecto</h2>
            <p>El diseño contempla una capacidad para 10,000 espectadores, ampliable en el futuro. Se priorizará el uso de materiales locales y energías renovables, buscando certificaciones LEED desde la fase de diseño.</p>
        `,
        quote: "Este estadio no es solo un lugar para jugar fútbol; es una declaración sobre el crecimiento y la importancia del deporte femenino profesional.",
        extraSectionTitle: "Tendencia Global",
        extraSectionContent: "Este proyecto se suma a una ola global de infraestructura dedicada exclusivamente a equipos femeninos, una tendencia que los arquitectos e ingenieros deben observar de cerca. La personalización de espacios para estas ligas está abriendo un nuevo nicho de mercado en la construcción deportiva."
    },
    'metro-lima': {
        slug: 'metro-lima',
        title: 'Línea 2 del Metro de Lima: Avances decisivos en el tramo central',
        date: '03 de Enero, 2026',
        category: 'Transporte',
        tagColor: '#f59e0b',
        image: '/assets/img/noticias/metro-lima.jpg',
        subtitle: 'La tuneladora "Delia" completa fase clave y se aceleran las obras en estaciones del Callao.',
        content: `
            <p>El 2026 inicia con buenas noticias para el transporte limeño. La Línea 2 del Metro de Lima ha reportado avances significativos en la construcción de su tramo central y el ramal hacia el Aeropuerto Jorge Chávez. Se espera que este año se inauguren tres nuevas estaciones en la Provincia Constitucional del Callao.</p>

            <h2>Desafíos de Ingeniería</h2>
            <p>La excavación en suelo chalaco, caracterizado por su nivel freático alto, ha requerido el uso de tecnología de punta en impermeabilización y dovelas de concreto armado de alta resistencia.</p>
        `,
        quote: "La Línea 2 no es solo un túnel; es la obra de ingeniería subterránea más compleja en la historia del Perú.",
        extraSectionTitle: "Impacto Ciudadano",
        extraSectionContent: "Con la etapa 1A y 1B ya en operación parcial, los usuarios han reducido sus tiempos de viaje de 40 a 5 minutos en los tramos activos. La culminación del proyecto promete conectar Ate con el Callao en tan solo 45 minutos."
    },
    'micron-ny': {
        slug: 'micron-ny',
        title: 'Micron inicia construcción de fábrica de chips de $100B en Nueva York',
        date: '07 de Enero, 2026',
        category: 'Tecnología',
        tagColor: '#3b82f6', // Adjusted color for Tech
        image: '/assets/img/noticias/micron-factory.jpg',
        subtitle: 'La inversión más grande en la historia de la manufactura de semiconductores en Estados Unidos.',
        content: `
            <p><strong>Micron Technology</strong> ha dado la palada inicial para su megacomplejo de fabricación de semiconductores en Nueva York. Con una inversión proyectada de <strong>$100,000 millones</strong> durante las próximas dos décadas, este proyecto transformará la industria tecnológica global.</p>

            <h2>Ingeniería de Ultra-Precisión</h2>
            <p>La construcción de "fabs" (fábricas de chips) requiere niveles de precisión y limpieza muy superiores a los estándares habituales de la construcción industrial. Sistemas HVAC avanzados, cimentaciones antivibración y salas limpias ISO 1 son solo algunos de los retos para los ingenieros civiles y arquitectos involucrados.</p>
        `,
        quote: "Estamos construyendo la catedral de la tecnología moderna.",
        extraSectionTitle: "Oportunidades Laborales",
        extraSectionContent: "Se espera la creación de miles de empleos directos en construcción durante la primera fase. El proyecto demandará especialistas en estructuras complejas, gestión BIM 7D y sostenibilidad industrial."
    }
};
