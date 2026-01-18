export interface NewsArticle {
    slug: string;
    title: string;
    date: string;
    category: string; // Primary category for color
    tags: string[];   // Multiple tags for filtering and display
    tagColor: string;
    image: string;
    subtitle: string;
    content: string; // HTML string or plain text
    quote?: string;
    extraSectionTitle?: string;
    extraSectionContent?: string;
}

export const newsData: Record<string, NewsArticle> = {
    'arquitectos-uni-ganan-concurso-mundial': {
        slug: 'arquitectos-uni-ganan-concurso-mundial',
        title: 'Arquitectos de la UNI ganan concurso mundial con proyecto para reducir el tráfico en SJL',
        date: '13 de Enero, 2026',
        category: 'Arquitectura',
        tags: ['Arquitectura', 'Perú', 'Internacional'],
        tagColor: '#52aeb2',
        image: '/assets/img/news-uni-2026.png',
        // ... rest stays same
        subtitle: 'Un equipo de la Universidad Nacional de Ingeniería triunfa en el concurso de la AECID con una propuesta de urbanismo escalable para el distrito más poblado de Lima.',
        content: `
            <p>Un equipo de arquitectos egresados de la <strong>Universidad Nacional de Ingeniería (UNI)</strong> ha obtenido el primer lugar en un prestigioso concurso internacional organizado por la Agencia Española de Cooperación Internacional para el Desarrollo (AECID). Su propuesta busca transformar radicalmente la movilidad en <strong>San Juan de Lurigancho (SJL)</strong>, enfocándose en la reducción del tráfico mediante intervenciones urbanas inteligentes.</p>
            
            <h2>La Propuesta Técnica</h2>
            <p>El proyecto se basa en el concepto de "Conectividad Escalable". Propone la creación de nodos de transporte multimodal que integran puentes peatonales tecnológicos, ciclovías protegidas y espacios públicos verdes que actúan como pulmones urbanos en las zonas de mayor congestión.</p>
            <p>A diferencia de las soluciones tradicionales que priorizan el concreto y los pasos a desnivel para autos, este diseño utiliza <strong>infraestructura verde</strong> y sistemas de gestión de tráfico basados en sensores que optimizan el flujo vehicular en tiempo real.</p>
            
            <h2>Impacto en el Sector AEC</h2>
            <p>Este logro no solo pone en alto el nombre de la ingeniería y arquitectura peruana, sino que establece un nuevo estándar para el desarrollo de proyectos públicos. La metodología utilizada combina el diseño paramétrico con el análisis de datos masivos (Big Data), permitiendo que la solución sea replicable en otros distritos con problemáticas similares.</p>
            
            <h2>Conclusión</h2>
            <p>La victoria del equipo de la UNI subraya la importancia de integrar la academia con los desafíos reales de la infraestructura urbana. El proyecto entrará en una fase de estudio de viabilidad con la Municipalidad de Lima a partir de febrero de 2026, con miras a iniciar un piloto en las avenidas Próceres y Wiesse.</p>
        `,
        quote: "El urbanismo del futuro debe ser humano, sostenible y, sobre todo, inteligente para adaptarse a la complejidad de nuestras ciudades.",
        extraSectionTitle: "Reconocimiento Internacional",
        extraSectionContent: "El jurado internacional destacó la 'audacia técnica y la viabilidad económica' de la propuesta peruana, superando a más de 200 proyectos de Europa y Latinoamérica."
    },
    'bono-proteccion-vivienda-2026': {
        slug: 'bono-proteccion-vivienda-2026',
        title: 'Primera convocatoria del Bono de Protección de Viviendas Vulnerables en 2026',
        date: '12 de Enero, 2026',
        category: 'Ingeniería',
        tags: ['Ingeniería', 'Estructura', 'Perú'],
        tagColor: '#3b82f6',
        image: '/assets/img/news-vivienda-2026.png',
        subtitle: 'El MVCS anuncia fondos destinados al reforzamiento antisísmico de viviendas en Ate, San Juan de Lurigancho y Villa El Salvador.',
        content: `
            <p>El Ministerio de Vivienda, Construcción y Saneamiento (MVCS) ha lanzado oficialmente la <strong>primera convocatoria del 2026</strong> para el Bono de Protección de Viviendas Vulnerables a los Riesgos Sísmicos (BPVVRS). Este programa es vital para reducir la vulnerabilidad estructural en los distritos periféricos de la capital peruana.</p>
            
            <h2>Aspectos Técnicos del Reforzamiento</h2>
            <p>El bono permite financiar el reforzamiento de muros de albañilería mediante el uso de mallas electrosoldadas y capas de concreto (encamisado), mejorando significativamente la rigidez y ductilidad de las viviendas autoconstruidas. Los ingenieros supervisores utilizarán aplicaciones móviles para monitorear el avance y asegurar la calidad de los materiales en tiempo real.</p>
            
            <h2>Relevancia Sectorial</h2>
            <p>Para los profesionales de la ingeniería civil, estas convocatorias representan un desafío logístico y técnico, ya que requieren la adaptación de soluciones estructurales profesionales a viviendas con cimentaciones inciertas. La formalización de estas intervenciones es un paso clave hacia una ciudad más resiliente.</p>
        `,
        quote: "Nuestra meta es asegurar que ninguna familia en zonas de riesgo pierda su hogar ante un sismo de gran magnitud.",
        extraSectionTitle: "Meta de Atención",
        extraSectionContent: "Para este primer trimestre se espera atender a más de 320 viviendas debidamente calificadas, priorizando hogares liderados por adultos mayores y personas con discapacidad."
    },
    'proyectos-infraestructura-peru-2026-2031': {
        slug: 'proyectos-infraestructura-peru-2026-2031',
        title: 'MEF impulsa Plan Nacional de Infraestructura 2026-2031 con S/ 144 mil millones',
        date: '10 de Enero, 2026',
        category: 'Infraestructura',
        tags: ['Ingeniería', 'Perú', 'Tecnología'],
        tagColor: '#ec4899',
        image: '/assets/img/news-mef-2026.png',
        subtitle: 'El gobierno presenta 72 proyectos estratégicos destinados a cerrar brechas de conectividad y potenciar la competitividad regional.',
        content: `
            <p>El Ministerio de Economía y Finanzas (MEF) ha delineado la hoja de ruta para la infraestructura nacional del próximo quinquenio. El <strong>Plan Nacional de Infraestructura (PNI) 2026-2031</strong> contempla una inversión histórica de más de 144 mil millones de soles repartidos en diversos sectores productivos.</p>
            
            <h2>Ejes Estratégicos</h2>
            <p>El plan se centra en cuatro pilares fundamentales:</p>
            <ul>
                <li><strong>Transporte Logístico:</strong> Mejora de puertos y corredores viales para facilitar las exportaciones.</li>
                <li><strong>Saneamiento Universal:</strong> Proyectos de agua y alcantarillado en zonas rurales de la sierra y selva.</li>
                <li><strong>Infraestructura Digital:</strong> Expansión de la red de fibra óptica a nivel nacional.</li>
                <li><strong>Salud y Educación:</strong> Construcción de hospitales de alta complejidad bajo la modalidad de Obras por Impuestos.</li>
            </ul>
            
            <h2>El Rol de la Inversión Privada</h2>
            <p>Más del 40% del financiamiento se espera a través de Asociaciones Público-Privadas (APP). Esto exige que las empresas del sector construcción eleven sus estándares de transparencia y eficiencia, adoptando tecnologías como BIM desde la fase de preinversión.</p>
        `,
        quote: "No se trata de construir por construir, sino de crear infraestructura que genere verdadera competitividad.",
        extraSectionTitle: "Impacto en el PBI",
        extraSectionContent: "Se estima que la ejecución eficiente de este plan aportará hasta 2 puntos porcentuales adicionales al crecimiento del PBI peruano de forma anual."
    },
    'ia-aec-tendencias-2026': {
        slug: 'ia-aec-tendencias-2026',
        title: 'IA Generativa y Gemelos Digitales: Las 6 tendencias del sector AEC para 2026',
        date: '08 de Enero, 2026',
        category: 'Tecnología',
        tags: ['Tecnología', 'IA', 'BIM'],
        tagColor: '#ea7048',
        image: '/assets/img/news-ia-aec-2026.png',
        subtitle: 'Expertos identifican las herramientas tecnológicas que están transformando el diseño y la construcción este año.',
        content: `
            <p>El 2026 ha consolidado la transición de la industria AEC hacia una <strong>"Construcción Inteligente"</strong>. La adopción masiva de la Inteligencia Artificial (IA) Generativa ya no es una opción, sino una necesidad competitiva para estudios de arquitectura y constructoras.</p>
            
            <h2>Tendencias Clave</h2>
            <ol>
                <li><strong>IA Generativa para Diseño Estructural:</strong> Algoritmos que proponen miles de iteraciones estructurales optimizando el uso de acero y concreto.</li>
                <li><strong>Gemelos Digitales (Digital Twins):</strong> Réplicas virtuales que permiten el mantenimiento predictivo de grandes infraestructuras.</li>
                <li><strong>Robótica de Obra:</strong> Uso de drones y equipos semiautónomos para el seguimiento real del avance de obra vs el modelo BIM.</li>
                <li><strong>Sostenibilidad Predictiva:</strong> Análisis de la huella de carbono antes de colocar el primer ladrillo.</li>
                <li><strong>Realidad Extendida (XR):</strong> Inspecciones inmersivas donde el cliente puede "vivir" el proyecto antes de su ejecución.</li>
                <li><strong>Automatización de Reportes:</strong> Herramientas que procesan incidencias en obra automáticamente mediante lenguaje natural.</li>
            </ol>
            
            <h2>Desafío Profesional</h2>
            <p>El principal reto para los profesionales hoy no es la falta de herramientas, sino la <strong>curva de aprendizaje</strong>. La capacidad de integrar estos flujos de trabajo determinará el éxito en los próximos años.</p>
        `,
        quote: "La IA no reemplazará al ingeniero, pero el ingeniero que use IA reemplazará al que no la use.",
        extraSectionTitle: "Adopción Local",
        extraSectionContent: "En Perú, el uso de BIM 2.0 y Gemelos Digitales ha crecido un 45% en el último año, impulsado principalmente por los proyectos de infraestructura minera y aeroportuaria."
    },
    'stantec-diseno-electrico-mineria-bim': {
        slug: 'stantec-diseno-electrico-mineria-bim',
        title: 'Stantec consolida el uso de BIM y IA en proyectos mineros hacia el 2026',
        date: '07 de Enero, 2026',
        category: 'Tecnología',
        tags: ['Tecnología', 'Eléctricas', 'BIM'],
        tagColor: '#ea7048',
        image: '/assets/img/news-stantec-2026.png',
        subtitle: 'Liderazgo en diseño eléctrico optimizado mediante herramientas digitales avanzadas y metodologías de colaboración global.',
        content: `
            <p>La consultora global <strong>Stantec</strong> ha reportado resultados excepcionales en la implementación de flujos de trabajo digitales para la minería de gran escala. Su enfoque hacia el 2026 se centra en la integración total del <strong>BIM 7D</strong> y la Inteligencia Artificial en el diseño de infraestructura eléctrica crítica.</p>
            
            <h2>Innovación en el Diseño Eléctrico</h2>
            <p>El uso de herramientas de diseño automatizado permite a Stantec reducir los tiempos de ingeniería en un 25%. Mediante la IA, pueden simular escenarios complejos de carga y estabilidad de red, garantizando que las minas operen de manera ininterrumpida y con el menor consumo energético posible.</p>
            
            <h2>Metodología de Colaboración</h2>
            <p>La clave del éxito reside en la nube. Equipos en Perú, Canadá y Australia colaboran en un único modelo centralizado, evitando interferencias (clash detection) en fases tempranas, lo que ahorra millones en costos de retrabajo en obra.</p>
        `,
        quote: "La minería del mañana requiere una infraestructura eléctrica que sea tan inteligente como eficiente.",
        extraSectionTitle: "Proyectos en Perú",
        extraSectionContent: "Stantec está aplicando actualmente estos estándares en la expansión de dos de las minas de cobre más importantes del sur del Perú, consolidando su posición como referente técnico en la región."
    },
    'aeropuerto': {
        slug: 'aeropuerto',
        title: 'Nuevo Aeropuerto Jorge Chávez: Avance del 80%',
        date: '08 de Enero, 2026',
        category: 'Infraestructura',
        tags: ['Ingeniería', 'Perú', 'Internacional'],
        tagColor: '#ec4899',
        image: '/assets/img/news-airport-2026.png',
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
        tags: ['Perú', 'Internacional', 'Tecnología'],
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
    'metro-lima': {
        slug: 'metro-lima',
        title: 'Cómo la Línea 2 del Metro de Lima utiliza tecnología avanzada para construir bajo la ciudad',
        date: 'Enero 2026',
        category: 'Ingeniería',
        tags: ['Ingeniería', 'Infraestructura', 'Tecnología', 'Perú'],
        tagColor: '#3b82f6',
        image: '/assets/img/noticias/metro-lima-tbm.png',
        subtitle: 'Redefiniendo la infraestructura subterránea en Lima: una mirada técnica a los desafíos de construir bajo una ciudad que nunca se detiene.',
        content: `
            <p>Construir una línea de metro en una ciudad como Lima no es solo un desafío de concreto y acero; es, ante todo, un rompecabezas de ingeniería urbana. Quienes hemos estado cerca de proyectos de gran escala sabemos que el verdadero trabajo ocurre mucho antes de que la maquinaria toque el suelo. En el caso de la Línea 2, el reto comienza con una superficie saturada de tráfico, edificaciones históricas y una red de servicios básicos que no puede interrumpirse.</p>

            <h2 className="text-2xl font-bold text-[#2f4860] mt-10 mb-4">El desafío de una superficie que no puede fallar</h2>
            <p>Trabajar bajo Lima implica enfrentarse a una geología variable: desde las gravas densas del centro hasta los suelos arcillosos y el nivel freático alto del Callao. Aquí es donde la tecnología deja de ser un accesorio para convertirse en el único medio viable de ejecución. El temor principal en cualquier excavación urbana es el asentamiento: esos milímetros de movimiento que podrían comprometer la estructura de una vivienda o un monumento histórico.</p>

            <h2 className="text-2xl font-bold text-[#2f4860] mt-10 mb-4">La Tuneladora (TBM): Estabilidad y control bajo nuestros pies</h2>
            <p>Para enfrentar este riesgo, el proyecto utiliza tuneladoras (TBM) de última generación. Pero no debemos verlas simplemente como "taladros gigantes". Para un ingeniero, la TBM es un sistema de soporte activo: mientras su cabeza de corte avanza, la máquina mantiene una presión constante sobre el frente de excavación, evitando que el suelo sobre ella se relaje o colapse. Simultáneamente, instala con precisión milimétrica los anillos de dovelas que formarán el túnel definitivo, garantizando una estructura estanca y segura de forma inmediata.</p>

            <h2 className="text-2xl font-bold text-[#2f4860] mt-10 mb-4">Construir dos veces: El rol del modelado digital y BIM</h2>
            <p>Sin embargo, la mejor maquinaria del mundo es inútil sin una planificación quirúrgica. El uso de la metodología <strong>BIM (Building Information Modeling)</strong> ha permitido "construir el proyecto digitalmente" antes de mover un solo gramo de tierra. Esto es crucial cuando tienes que pasar una estación de metro por debajo de redes de agua centenarias o cimentaciones de edificios del siglo XIX. Detectar una interferencia en el modelo digital ahorra semanas de retraso y millones en sobrecostos, permitiendo que la obra avance con una hoja de ruta clara.</p>

            <h2 className="text-2xl font-bold text-[#2f4860] mt-10 mb-4">Ojos digitales: Monitoreo y datos en tiempo real</h2>
            <p>Quizás el aspecto menos visible, pero más tecnológico, es el monitoreo geotécnico. Cientos de sensores están instalados en la superficie y en las edificaciones a lo largo del trazo. Estos "ojos digitales" envían datos constantes sobre vibraciones y niveles. Si un sensor detecta un movimiento fuera de los parámetros permitidos, el equipo de ingeniería puede ajustar los parámetros de excavación de la TBM en tiempo real. Esta integración de datos es lo que diferencia a la ingeniería moderna de la tradicional: hoy tomamos decisiones basadas en evidencia analítica instantánea.</p>

            <h2 className="text-2xl font-bold text-[#2f4860] mt-10 mb-4">Una mirada profesional hacia el futuro</h2>
            <p>El resultado final será una infraestructura inteligente (Smart Infrastructure), donde la ventilación, la gestión de energía y la seguridad operarán de forma automatizada. Para los profesionales y estudiantes del sector AEC, la Línea 2 es un caso de estudio vivo. Nos enseña que el futuro de nuestra profesión no está solo en el diseño estructural, sino en la capacidad de integrar maquinaria avanzada, software de coordinación y análisis de datos masivos para resolver los problemas de las ciudades modernas.</p>
        `,
        quote: "La ingeniería moderna no se mide por el tamaño de sus máquinas, sino por la precisión de sus datos y la seguridad de sus decisiones.",
        extraSectionTitle: "Reflexión AEC",
        extraSectionContent: "Este proyecto marca un antes y un después en la forma en que el Perú aborda la infraestructura urbana, consolidando el uso de TBM y BIM como estándares indispensables para el desarrollo nacional."
    },
    'micron-ny': {
        slug: 'micron-ny',
        title: 'Micron inicia construcción de fábrica de chips de $100B en Nueva York',
        date: '07 de Enero, 2026',
        category: 'Tecnología',
        tags: ['Tecnología', 'Internacional'],
        tagColor: '#ea7048',
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
