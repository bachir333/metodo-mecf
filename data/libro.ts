export interface LibroBloque {
  num: string;
  slug: string;
  title: string;
  desc: string;
  intro: string;
  secciones: { titulo: string; texto: string }[];
  cierre: string;
}

export const libroBloques: LibroBloque[] = [
  {
    num: "01",
    slug: "despertar-del-administrador",
    title: "El Despertar del Administrador",
    desc: "Descubres que no eres el usuario de tu vida — eres el sistema operativo que la ejecuta. Primeros diagnósticos: voltaje, arquetipo y nodos de activación.",
    intro:
      "El primer bloque del libro es la ruptura con la narrativa de víctima. Durante años has operado creyendo que la vida te sucede a ti — que las circunstancias, las personas y el azar determinan tus resultados. El Despertar del Administrador te devuelve los permisos de root sobre tu propia existencia.",
    secciones: [
      {
        titulo: "De usuario a administrador",
        texto:
          "Un usuario puede interactuar con el sistema tal como está configurado. Un administrador puede modificar la configuración, instalar nuevos programas y eliminar los que ya no sirven. La mayoría de las personas viven como Usuarios Invitados de su propio sistema — ejecutan el software que otros instalaron sin cuestionarlo jamás. El primer capítulo del libro traza la línea entre ambos roles y te enseña a cruzarla.",
      },
      {
        titulo: "El diagnóstico inicial: voltaje y arquetipo",
        texto:
          "Antes de modificar cualquier sistema, necesitas saber con qué estás trabajando. El MECF utiliza la escala Tesla 3·6·9 aplicada a la fecha de nacimiento para calcular tu voltaje biológico — la frecuencia base desde la que operas. Junto al voltaje, el arquetipo define el rol que tu sistema está programado para cumplir. Sin este diagnóstico, cualquier intento de cambio es disparar a ciegas.",
      },
      {
        titulo: "Los nodos de activación",
        texto:
          "No todos los momentos son iguales. El tiempo tiene arquitectura — hay ventanas en las que el campo es más permeable al cambio y ventanas en las que la resistencia es máxima. Los nodos de activación son esas ventanas cronológicas calculadas a partir de tu voltaje y tu historia de vida. Identificarlos es el primer acto técnico del administrador: saber cuándo actuar.",
      },
    ],
    cierre:
      "Una vez tienes el diagnóstico y conoces tus nodos, el sistema está listo para la siguiente fase: comprender el hardware biológico sobre el que opera todo.",
  },
  {
    num: "02",
    slug: "hardware-y-software",
    title: "El Hardware y el Software",
    desc: "Tu biología es el hardware; tus creencias y emociones son el software. Aprendes a distinguir bugs de features y a leer los síntomas físicos como mensajes de código.",
    intro:
      "El segundo bloque introduce el modelo conceptual más importante del libro: el ser humano como sistema informático de precisión. No es una metáfora poética — es un mapa de trabajo. Cuando sabes qué es hardware y qué es software, puedes intervenir con precisión quirúrgica en lugar de atacar síntomas al azar.",
    secciones: [
      {
        titulo: "El cuerpo como hardware",
        texto:
          "Tu biología — el sistema nervioso, el campo electromagnético del corazón, los órganos y su lateralidad — es el hardware. No lo elegiste, pero sí puedes optimizarlo. Cada síntoma físico es un mensaje del hardware diciendo que el software que ejecuta está generando una carga que no puede sostener. La biodecodificación es el lenguaje que traduce esos mensajes en información accionable.",
      },
      {
        titulo: "Las creencias como software",
        texto:
          "El software son las creencias, los mandatos emocionales y los patrones de comportamiento que tu sistema ejecuta de forma automática. Fueron instalados en la infancia, reforzados por el linaje y actualizados por las experiencias traumáticas. El 95% de este software corre en segundo plano — lo que llamamos subconsciente. No lo ves pero determina absolutamente todo lo que manifiestas.",
      },
      {
        titulo: "Bugs vs. features",
        texto:
          "Un bug es un error no intencionado. Una feature es una función diseñada deliberadamente. En el sistema humano, lo que parecen bugs — la procrastinación, los sabotajes, las relaciones destructivas — en realidad son features de supervivencia instaladas en un momento de alta amenaza. El sistema los ejecuta porque en su momento salvaron al individuo o al clan. La clave no es eliminarlos por la fuerza, sino actualizar el contexto para que el sistema los marque como obsoletos.",
      },
    ],
    cierre:
      "Con el modelo hardware-software claro, el siguiente bloque lleva la mirada hacia atrás en el tiempo: el linaje como origen de la mayoría de los programas que ejecutas hoy.",
  },
  {
    num: "03",
    slug: "ingenieria-de-linajes",
    title: "Ingeniería de Linajes",
    desc: "El árbol genealógico como matriz de datos. Localizas los programas heredados — traumas, mandatos y lealtades invisibles — y aplicas ingeniería de reversa para desinstalarlos.",
    intro:
      "El tercer bloque es el más profundo del libro — y el más liberador. Aquí comprendes que la mayoría de los programas que ejecutas no fueron escritos por ti. Fueron escritos por personas que vivieron antes que tú, en contextos de supervivencia que ya no existen, pero cuyas soluciones siguen corriendo en tu sistema como si el peligro original aún estuviera presente.",
    secciones: [
      {
        titulo: "El árbol genealógico como matriz de datos",
        texto:
          "Cada ancestro en tu árbol fue un nodo de procesamiento. Sus experiencias — guerras, pérdidas, traumas, mandatos culturales — generaron adaptaciones de supervivencia que el sistema familiar transmitió a las generaciones siguientes. El MECF enseña a leer el árbol no como una historia familiar, sino como un diagrama de flujo: quién instaló qué programa, cuándo y por qué. Con ese mapa, la intervención es precisa.",
      },
      {
        titulo: "Las lealtades invisibles",
        texto:
          "El concepto más subversivo del libro: las lealtades invisibles. El sistema familiar actúa como un organismo colectivo que tiende hacia la homeostasis — el equilibrio. Cuando un miembro del clan sufrió una exclusión, una injusticia o una pérdida no procesada, los descendientes desarrollan inconscientemente comportamientos que 'recuerdan' ese evento o que intentan compensarlo. No lo hacen por debilidad, sino por amor. La ingeniería de linajes consiste en reconocer esas lealtades y liberarlas con dignidad.",
      },
      {
        titulo: "La ingeniería de reversa",
        texto:
          "La ingeniería de reversa es el proceso de trazar el camino desde el síntoma actual hasta el origen en el árbol. Starts con lo que se repite — el patrón de relaciones, la dificultad económica crónica, el síntoma físico — y retrocede generación a generación hasta encontrar el primer evento que lo generó. Una vez localizado el origen, el trabajo no es juzgar ni culpar, sino actualizar el registro: ese conflicto ya fue, ese peligro ya pasó, esa deuda ya se saldó.",
      },
    ],
    cierre:
      "Con el linaje trabajado, el último bloque cierra el ciclo: los protocolos de mantenimiento para que los cambios no sean un destello, sino una nueva arquitectura permanente.",
  },
  {
    num: "04",
    slug: "mantenimiento-y-ejecucion",
    title: "Mantenimiento y Ejecución",
    desc: "Protocolos de actualización continua. Nodos cronológicos, ventanas de intervención y el sistema de monitorización para que los cambios sean permanentes y escalen.",
    intro:
      "El cuarto bloque es donde la mayoría de los métodos fracasan. Producen un destello de insight, una semana de euforia y luego el sistema regresa al patrón anterior. El MECF incluye desde su diseño los protocolos de mantenimiento — porque un sistema sin mantenimiento es un sistema que se degrada.",
    secciones: [
      {
        titulo: "Por qué los cambios no duran",
        texto:
          "El subconsciente no entiende de propósitos ni de intenciones — entiende de seguridad. Cuando instalas un nuevo patrón de comportamiento, el sistema lo evalúa durante semanas o meses. Si percibe que el nuevo patrón es más seguro que el anterior, lo integra. Si percibe amenaza o incoherencia, activa el mecanismo de rollback — y de vuelta al punto de partida. El mantenimiento consiste en darle al sistema suficiente evidencia de que el nuevo software es confiable.",
      },
      {
        titulo: "Los nodos cronológicos anuales",
        texto:
          "Cada año activa un nodo cronológico distinto según tu voltaje. Estos nodos son las ventanas naturales de actualización del sistema — momentos en que el campo es más receptivo a la integración de cambios profundos. El libro incluye el mapa completo de nodos y cómo leer el tuyo: qué área de vida será la más activa, qué resistencias esperar y qué acciones son más eficientes dentro de esa ventana.",
      },
      {
        titulo: "El protocolo de monitorización",
        texto:
          "Un administrador no espera a que el sistema colapse para intervenir — monitoriza de forma proactiva. El MECF establece un protocolo de revisión trimestral: indicadores de coherencia interna (sueño, energía, claridad mental), indicadores externos (movimiento económico, calidad de relaciones, salud) y señales de alerta temprana (síntomas físicos leves, patrones de sabotaje, sueños recurrentes). Con este sistema, los virus se detectan antes de que generen daño real.",
      },
    ],
    cierre:
      "El Administrador Total no es un estado que se alcanza — es un modo de operar que se mantiene. Este bloque es el manual de operaciones permanente.",
  },
];
