export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  intro: string;
  sections: { heading: string; body: string }[];
  conclusion: string;
  relatedSlugs: string[];
}

export const ARTICLES: BlogArticle[] = [
  {
    slug: "que-es-un-nodo-cronologico",
    title: "¿Qué es un nodo cronológico?",
    description: "Los nodos cronológicos son los puntos exactos en tu línea temporal donde se abren ventanas de expansión o contracción. Aprende a identificarlos con el Método MECF.",
    date: "2025-11-10",
    readTime: 6,
    category: "Conceptos clave",
    intro: "Dentro del Método MECF, un nodo cronológico no es una fecha cualquiera. Es un punto en tu línea temporal donde la estructura de tu código biográfico genera una apertura o un cierre de ciclo. Entender qué son y cómo funcionan es el primer paso para dejar de vivir de forma reactiva.",
    sections: [
      {
        heading: "La diferencia entre un evento y un nodo",
        body: "Un evento es algo que te ocurre. Un nodo es la estructura que hace posible que ese evento ocurra. La mayoría de personas vive pendiente de los eventos — el despido, la ruptura, el ascenso — sin entender que existe un patrón cronológico subyacente que los genera con una lógica precisa.\n\nEl Método MECF identifica cinco nodos cronológicos de expansión activa en el período 2026–2032 para cada código individual. Estos nodos no predicen el futuro: mapean las ventanas en las que tu sistema está estructuralmente abierto al cambio.",
      },
      {
        heading: "Cómo se calcula un nodo",
        body: "Los nodos se derivan del análisis de tu fecha de nacimiento a través del protocolo de Fractal Nodos. Este protocolo identifica los intervalos en los que tu código biográfico entra en resonancia con ciclos de mayor frecuencia. No es numerología convencional — es una lectura de la estructura fractal de tu trayectoria.\n\nCada nodo tiene una polaridad: expansivo o contractivo. Los nodos expansivos abren posibilidades nuevas. Los contractivos consolidan lo que ya existe o eliminan lo que no sostiene el siguiente ciclo.",
      },
      {
        heading: "¿Para qué sirve conocer tus nodos?",
        body: "La utilidad práctica es concreta: si sabes que un nodo expansivo se activa en marzo de 2027, puedes orientar tus decisiones — laborales, relacionales, de inversión — para alinearte con esa ventana en lugar de trabajar contra ella.\n\nIgualmente importante: si un nodo contractivo está activo, intentar expandirse en esa fase produce el doble de desgaste por la mitad de resultado. El Método MECF no te dice qué hacer — te dice cuándo el sistema está alineado para cada tipo de movimiento.",
      },
    ],
    conclusion: "Los nodos cronológicos son la columna vertebral del análisis MECF Individual. Si quieres identificar los tuyos — con fechas exactas para el período 2026–2032 — el informe Individual incluye los cinco nodos con su polaridad y ventana de activación.",
    relatedSlugs: ["que-son-los-ciclos-biograficos", "ventanas-de-intervencion-activa", "como-leer-tu-codigo-de-origen"],
  },
  {
    slug: "que-son-los-ciclos-biograficos",
    title: "¿Qué son los ciclos biográficos?",
    description: "Los ciclos biográficos son la estructura temporal de tu trayectoria vital. El Método MECF los analiza para identificar patrones de expansión, crisis y consolidación.",
    date: "2025-11-18",
    readTime: 7,
    category: "Conceptos clave",
    intro: "Tu vida no avanza en línea recta. Avanza en ciclos. El Método MECF parte de esta premisa técnica: la trayectoria biográfica de cualquier persona sigue una estructura cíclica precisa, derivada de su código de origen. Entender esa estructura es lo que diferencia operar con información de operar a ciegas.",
    sections: [
      {
        heading: "Ciclos menores, ciclos mayores",
        body: "El análisis MECF distingue dos niveles de ciclo. Los ciclos menores tienen una duración de entre tres y cinco años y representan fases de un proceso más amplio: acumulación, expansión, integración, crisis y reconversión. Los ciclos mayores articulan secuencias de tres a cuatro ciclos menores y definen el arco biográfico de una década completa.\n\nLa mayoría de personas experimenta las transiciones entre ciclos como crisis inesperadas — el burnout, la separación, el cambio de rumbo profesional. El Método MECF permite anticipar esas transiciones porque su estructura es calculable.",
      },
      {
        heading: "Por qué los ciclos no son iguales para todos",
        body: "Dos personas nacidas el mismo año pueden tener estructuras cíclicas completamente distintas. La fecha exacta de nacimiento — día, mes y año — determina la fase del ciclo en la que cada persona entra en cada momento de su vida. Esto explica por qué hay personas que atraviesan los cuarenta con una crisis profunda y otras que lo viven como la mejor etapa de su vida.\n\nNo es suerte. Es estructura.",
      },
      {
        heading: "Ciclos biográficos y toma de decisiones",
        body: "El conocimiento de los ciclos biográficos tiene una aplicación directa en la gestión de decisiones. Lanzar un proyecto en fase de acumulación, cuando el ciclo pide consolidación interna, produce un patrón de inicio-colapso repetido que muchas personas interpretan erróneamente como falta de capacidad.\n\nEl Método MECF te da el mapa de tus ciclos activos y los que se activarán en los próximos siete años. Con ese mapa, las decisiones cambian de naturaleza.",
      },
    ],
    conclusion: "El análisis de ciclos biográficos es el núcleo del informe MECF Individual. Si quieres ver el mapa de tus ciclos activos para 2026–2032, el informe te lo entrega en formato PDF con las fechas exactas y la caracterización de cada fase.",
    relatedSlugs: ["que-es-un-nodo-cronologico", "patrones-de-sabotaje-recurrente", "ventanas-de-intervencion-activa"],
  },
  {
    slug: "lealtades-invisibles-arbol-genealogico",
    title: "Lealtades invisibles en el árbol genealógico",
    description: "Las lealtades invisibles son programas heredados del sistema familiar que operan en ti sin que lo sepas. El Método MECF las identifica en el análisis transgeneracional.",
    date: "2025-11-26",
    readTime: 8,
    category: "Transgeneracional",
    intro: "Hay decisiones que crees tuyas y no lo son. Hay patrones que repites sin entender por qué. Las lealtades invisibles son el mecanismo por el que el sistema familiar transmite sus programas de una generación a la siguiente — no a través de genes, sino a través de la estructura de los códigos biográficos heredados.",
    sections: [
      {
        heading: "Qué es una lealtad invisible",
        body: "Una lealtad invisible es una fidelidad inconsciente al sistema familiar que se expresa en forma de repetición. Puedes ser leal al fracaso económico de tu padre sin saberlo. Puedes ser leal a la soledad de tu abuela sin haberla conocido. Estas lealtades no son sentimentales — son estructurales. El código biográfico porta la información del sistema del que proviene.\n\nEn el Método MECF, el análisis del Árbol Genealógico identifica estas lealtades leyendo la estructura de los códigos de al menos tres generaciones.",
      },
      {
        heading: "Cómo se transmiten los programas familiares",
        body: "La transmisión no es genética en el sentido convencional. Los programas familiares se transmiten a través de la resonancia entre los códigos biográficos de padres e hijos. Cuando un padre porta un patrón de abandono en su ciclo, ese patrón tiende a reaparecer en el código de sus hijos bajo una forma diferente — puede ser abandono laboral, ruptura de vínculos, o una tendencia al aislamiento que no tiene explicación aparente.\n\nEl análisis transgeneracional del Método MECF mapea estas resonancias con precisión.",
      },
      {
        heading: "Identificar la lealtad no es suficiente",
        body: "Muchas personas trabajan en terapia durante años para identificar los patrones familiares que les afectan. El problema es que la identificación sin mapa estructural produce comprensión intelectual pero no cambio en el patrón. Saber que repites el patrón de tu madre no te dice en qué fase de tu ciclo ese patrón se activa, ni cuándo tienes una ventana real de intervención.\n\nEl informe de Árbol Genealógico del Método MECF combina la identificación con el mapa temporal. No solo te dice qué programa heredaste — te dice cuándo puedes intervenir en él.",
      },
    ],
    conclusion: "El módulo Árbol Genealógico analiza tres generaciones de tu sistema familiar, identifica las lealtades invisibles activas y mapea las ventanas de intervención. Si reconoces en tu vida patrones que no son del todo tuyos, ese informe es el punto de partida.",
    relatedSlugs: ["que-son-los-ciclos-biograficos", "patrones-de-sabotaje-recurrente", "como-leer-tu-codigo-de-origen"],
  },
  {
    slug: "como-leer-tu-codigo-de-origen",
    title: "Cómo leer tu código de origen",
    description: "El código de origen es la estructura base de tu sistema biográfico. Aprende qué información contiene y cómo el Método MECF lo utiliza para decodificar tu trayectoria vital.",
    date: "2025-12-04",
    readTime: 6,
    category: "Conceptos clave",
    intro: "Todo análisis MECF comienza en el mismo punto: el código de origen. Este código es la representación estructural de tu fecha de nacimiento en el sistema del Método MECF. No es un número de suerte ni un arquetipo de personalidad — es la huella de entrada de tu sistema biográfico en el tiempo.",
    sections: [
      {
        heading: "Qué contiene el código de origen",
        body: "El código de origen porta tres tipos de información. Primero, la frecuencia base del sistema — lo que podríamos llamar el 'tono' estructural de tu código. Segundo, la fase del ciclo mayor en la que entraste al nacer. Tercero, los patrones de resonancia con el sistema familiar de origen.\n\nEsta combinación de tres elementos define no solo quién eres en términos de estructura, sino qué tipo de ciclos atraviesas, con qué frecuencia y bajo qué lógica.",
      },
      {
        heading: "Por qué la fecha exacta importa",
        body: "Un día de diferencia en la fecha de nacimiento puede cambiar significativamente el código de origen y, con él, la estructura de ciclos de toda una vida. Por eso el Método MECF trabaja siempre con fecha completa — día, mes y año — y nunca con aproximaciones o fechas aproximadas.\n\nEsta precisión es lo que permite que el análisis sea técnicamente fiable. Un sistema que trabaja con datos imprecisos produce interpretaciones imprecisas.",
      },
      {
        heading: "Leer el código no es interpretarlo",
        body: "Hay una diferencia fundamental entre leer un código y interpretarlo. Leer es extraer la estructura. Interpretar es proyectar significados sobre ella. El Método MECF se basa en la lectura estructural, no en la interpretación. Por eso el informe no te dice 'eres una persona creativa y sensible' — te dice 'en el ciclo activo entre 2024 y 2026 tu sistema está en fase de acumulación con tendencia a la saturación si no hay descarga productiva'.\n\nLa diferencia entre las dos afirmaciones es la diferencia entre poesía y cartografía.",
      },
    ],
    conclusion: "El código de origen es el punto de partida de todo informe MECF. Para verlo decodificado en tu caso concreto — con tus ciclos, tus nodos y tus patrones de sabotaje — el informe Individual es el acceso más directo.",
    relatedSlugs: ["que-es-un-nodo-cronologico", "que-son-los-ciclos-biograficos", "que-es-la-ingenieria-almica"],
  },
  {
    slug: "que-es-la-ingenieria-almica",
    title: "¿Qué es la ingeniería álmica?",
    description: "La ingeniería álmica es el marco técnico del Método MECF. Descubre qué la distingue de otras herramientas de autoconocimiento y por qué trabaja con precisión estructural.",
    date: "2025-12-12",
    readTime: 7,
    category: "El método",
    intro: "El término ingeniería álmica puede sonar extraño la primera vez que lo escuchas. No es un concepto de la psicología convencional ni de la espiritualidad popular. Es el nombre que El Bachir Chekhad da al marco técnico a través del cual el Método MECF lee y analiza las estructuras biográficas. Entender qué significa este término es entender la base epistemológica del método.",
    sections: [
      {
        heading: "Álmica, no alquímica",
        body: "La confusión más habitual es leer 'álmica' como 'alquímica'. Son términos distintos con raíces distintas. El prefijo 'álm' en el contexto del Método MECF hace referencia a la dimensión biográfica profunda de un sistema — lo que el método llama la 'estructura de ánima' de una trayectoria vital. No es misticismo. Es una convención terminológica para nombrar un nivel de análisis que no tiene equivalente en la psicología estándar.\n\nIngeniería álmica, entonces, significa: la aplicación de una metodología técnica y sistemática al análisis de las estructuras biográficas profundas.",
      },
      {
        heading: "Por qué 'ingeniería' y no 'interpretación'",
        body: "La elección de la palabra ingeniería es deliberada. La ingeniería trabaja con sistemas, estructuras y parámetros calculables. No trabaja con impresiones, intuiciones o proyecciones. Cuando el Método MECF dice que tu sistema entra en un nodo de contracción en el tercer trimestre de 2027, esa afirmación es el resultado de un protocolo calculable, no de una lectura intuitiva.\n\nEsta diferencia metodológica es lo que hace que el informe MECF sea repetible, verificable y útil para tomar decisiones concretas.",
      },
      {
        heading: "Lo que la ingeniería álmica no es",
        body: "La ingeniería álmica no es numerología convencional, aunque comparte con ella el uso de fechas de nacimiento como dato de entrada. No es astrología, aunque trabaja con ciclos temporales. No es psicología transpersonal, aunque se ocupa de capas biográficas que la psicología convencional no mapea.\n\nEs un método propio, con protocolo propio y terminología propia, desarrollado por El Bachir Chekhad a través de años de investigación y aplicación. Su validez no se mide por su encaje en categorías previas, sino por la precisión de sus resultados.",
      },
    ],
    conclusion: "La ingeniería álmica es el marco. El Método MECF es la aplicación. Si quieres ver cómo se aplica a tu código biográfico concreto, el informe Individual es el punto de entrada.",
    relatedSlugs: ["como-leer-tu-codigo-de-origen", "mecf-vs-otras-herramientas", "patrones-de-sabotaje-recurrente"],
  },
  {
    slug: "patrones-de-sabotaje-recurrente",
    title: "Patrones de sabotaje recurrente: cómo identificarlos",
    description: "Los patrones de sabotaje recurrente son comportamientos sistémicos que anulan tus avances en el momento en que más cerca estás del objetivo. El Método MECF los identifica en tu código biográfico.",
    date: "2025-12-20",
    readTime: 7,
    category: "Conceptos clave",
    intro: "Hay personas que llegan sistemáticamente al 80% de sus objetivos y luego algo ocurre — un conflicto, una crisis de salud, una decisión extraña — que anula el progreso. No es mala suerte. No es falta de disciplina. Es un patrón de sabotaje inscrito en la estructura del código biográfico, y el Método MECF puede leerlo con precisión.",
    sections: [
      {
        heading: "Por qué no es falta de voluntad",
        body: "La explicación más dañina para los patrones de sabotaje es la moral: 'no tienes suficiente fuerza de voluntad', 'no te lo crees lo suficiente', 'tienes miedo al éxito'. Estas explicaciones son circulares y no producen cambio.\n\nEl Método MECF parte de una premisa distinta: los patrones de sabotaje son estructurales. Emergen porque el código biográfico entra en contradicción interna en ciertos puntos de la trayectoria. La contradicción no es psicológica — es sistémica. Y como es sistémica, puede mapearse.",
      },
      {
        heading: "Tipos de patrones de sabotaje en el sistema MECF",
        body: "El Método MECF identifica varios tipos de patrón de sabotaje. El más común es el patrón de activación prematura: el sistema lanza recursos antes de que el ciclo esté en fase expansiva, lo que produce un desgaste sin resultados proporcionales. Otro patrón frecuente es el de inversión de energía: el sistema pone su mayor esfuerzo en exactamente la dirección que el ciclo actual no puede sostener.\n\nCada patrón tiene una lógica estructural, y esa lógica es identificable en el código de origen.",
      },
      {
        heading: "Identificar el patrón no lo elimina — lo hace navegable",
        body: "Una de las confusiones más habituales es pensar que identificar un patrón de sabotaje lo hace desaparecer. No funciona así. Lo que cambia cuando conoces el patrón es tu capacidad de anticiparlo y de no actuar desde él de forma automática.\n\nSi sabes que tu sistema tiende a generar una crisis relacional justo antes de los nodos expansivos — y el informe MECF puede decirte exactamente eso — puedes estar alerta cuando esa dinámica empiece a activarse, en lugar de dejarte arrastrar por ella.",
      },
    ],
    conclusion: "El informe MECF Individual incluye la identificación de tus patrones de sabotaje recurrente y su relación con los ciclos activos. Si reconoces en tu vida el patrón de llegar al 80% y retroceder, ese análisis te dará la primera lectura técnica de por qué ocurre.",
    relatedSlugs: ["que-son-los-ciclos-biograficos", "ventanas-de-intervencion-activa", "lealtades-invisibles-arbol-genealogico"],
  },
  {
    slug: "ventanas-de-intervencion-activa",
    title: "Ventanas de intervención activa en tu línea temporal",
    description: "Las ventanas de intervención activa son los períodos en los que tu sistema biográfico está estructuralmente abierto al cambio. Aprende a identificarlas y usarlas.",
    date: "2025-12-28",
    readTime: 6,
    category: "Conceptos clave",
    intro: "No todos los momentos son iguales para cambiar. Hay períodos en los que el sistema biográfico está estructuralmente rígido — intentar cambiar en esos momentos produce desgaste y frustración. Y hay ventanas en las que el sistema está abierto — intervenir en esas ventanas produce cambios que en otro momento serían imposibles. El Método MECF mapea estas ventanas con precisión.",
    sections: [
      {
        heading: "Qué hace que una ventana esté 'abierta'",
        body: "Una ventana de intervención activa se abre cuando coinciden dos condiciones en el código biográfico. Primera: el ciclo mayor está en transición — en el punto de cierre de una fase y apertura de la siguiente. Segunda: el nodo cronológico del período tiene polaridad expansiva. Cuando estas dos condiciones se dan simultáneamente, el sistema está en su estado de máxima plasticidad.\n\nLas decisiones tomadas en estas ventanas tienen un impacto estructural que puede durar años. Las tomadas fuera de ellas tienden a ser reversibles o a quedar sin efecto.",
      },
      {
        heading: "La diferencia entre actuar en ventana y actuar fuera de ella",
        body: "La diferencia no siempre es visible en el momento. Puedes lanzar un proyecto fuera de una ventana de intervención y tener resultados iniciales positivos. El problema aparece seis o doce meses después, cuando el ciclo cambia de fase y el proyecto pierde tracción de forma aparentemente inexplicable.\n\nActuar en ventana no garantiza el éxito — la ejecución sigue siendo responsabilidad tuya. Pero alinear la decisión con la estructura del ciclo aumenta exponencialmente la probabilidad de que el movimiento se sostenga.",
      },
      {
        heading: "Cómo el Método MECF identifica tus ventanas",
        body: "El protocolo de Fractal Nodos calcula las ventanas de intervención activa para el período 2026–2032 en base a tu fecha de nacimiento. El resultado es una secuencia de cinco ventanas con sus fechas de apertura y cierre, su tipo de polaridad y la recomendación de qué tipo de movimiento es idóneo en cada una.\n\nEste mapa temporal es el núcleo operativo del informe MECF Individual.",
      },
    ],
    conclusion: "Conocer tus ventanas de intervención activa para los próximos siete años es el cambio más práctico que puedes hacer en tu forma de tomar decisiones. El informe Individual incluye el mapa completo con fechas y polaridades.",
    relatedSlugs: ["que-es-un-nodo-cronologico", "que-son-los-ciclos-biograficos", "patrones-de-sabotaje-recurrente"],
  },
  {
    slug: "mecf-vs-otras-herramientas",
    title: "MECF vs otras herramientas de autoconocimiento",
    description: "¿En qué se diferencia el Método MECF de la numerología, la astrología o la psicología transpersonal? Una comparación técnica sin eufemismos.",
    date: "2026-01-05",
    readTime: 8,
    category: "El método",
    intro: "Antes de comprar cualquier herramienta de autoconocimiento, la pregunta correcta es: ¿qué hace exactamente esto, y en qué se diferencia de lo que ya existe? Sobre el Método MECF es razonable hacerse esa pregunta. Aquí la respondemos sin eufemismos.",
    sections: [
      {
        heading: "MECF vs numerología convencional",
        body: "La numerología convencional extrae un número maestro de la fecha de nacimiento y lo asocia a un perfil de personalidad. El resultado es una descripción estática — 'eres un 7, eso significa que eres introspectivo y analítico' — que no aporta información temporal ni estructural sobre la trayectoria vital.\n\nEl Método MECF usa la fecha de nacimiento como dato de entrada para un protocolo de análisis dinámico. El resultado no es un perfil de personalidad — es un mapa de ciclos, nodos y ventanas con fechas concretas. La diferencia es la diferencia entre un retrato y un GPS.",
      },
      {
        heading: "MECF vs astrología",
        body: "La astrología trabaja con la posición de los planetas en el momento del nacimiento y su tránsito posterior. Es un sistema simbólico con una tradición de miles de años y una complejidad real. Sus resultados son interpretaciones — lecturas de un sistema simbólico hechas por un practicante.\n\nEl Método MECF no trabaja con planetas ni con símbolos. Trabaja con la estructura matemática de la fecha de nacimiento y su relación con los ciclos biográficos. El resultado es calculable, repetible y no depende de la habilidad interpretativa del practicante.",
      },
      {
        heading: "MECF vs psicología transpersonal",
        body: "La psicología transpersonal trabaja con la dimensión supra-personal de la experiencia humana — experiencias cumbre, estados alterados, el self más allá del ego. Es un campo terapéutico con su propia profundidad.\n\nEl Método MECF no es terapia y no trabaja con estados de consciencia. Trabaja con la estructura temporal de la trayectoria biográfica. No te ayuda a procesar experiencias — te da un mapa para navegar las que vienen. Son herramientas complementarias, no competidoras.",
      },
    ],
    conclusion: "El Método MECF no sustituye a la terapia, a la espiritualidad ni a ninguna otra herramienta de autoconocimiento. Lo que ofrece es lo que ninguna de ellas ofrece: un análisis técnico, calculable y temporal de tu estructura biográfica. Si eso es lo que buscas, el informe Individual es el punto de entrada.",
    relatedSlugs: ["que-es-la-ingenieria-almica", "como-leer-tu-codigo-de-origen", "que-son-los-ciclos-biograficos"],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slugs: string[]): BlogArticle[] {
  return slugs
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter((a): a is BlogArticle => a !== undefined);
}
