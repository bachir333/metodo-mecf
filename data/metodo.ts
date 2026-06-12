export interface MetodoBloque {
  id: string;
  slug: string;
  num: string;
  title: string;
  tagline: string;
  intro: string;
  bloques: { titulo: string; texto: string }[];
  cierre: string;
}

export const metodoBloques: MetodoBloque[] = [
  {
    id: "01",
    slug: "codigo-de-origen",
    num: "01",
    title: "Código de Origen",
    tagline: "Identifica la programación heredada que rige tus decisiones inconscientes.",
    intro:
      "Cada ser humano llega al mundo con un software preinstalado. No lo elegiste tú — lo eligió el linaje. El Código de Origen es la suma de creencias, traumas no resueltos y patrones de comportamiento que tus ancestros grabaron en el ADN familiar y que hoy operan en ti como si fueran tuyos.",
    bloques: [
      {
        titulo: "¿Qué es el Código de Origen?",
        texto:
          "Es el conjunto de instrucciones emocionales, conductuales y biológicas que tu sistema nervioso ejecuta de forma automática. Incluye mandatos como 'el dinero es malo', 'no puedes confiar en nadie' o 'el éxito trae consecuencias'. Estos programas no son tuyos — son lealtades invisibles al clan.",
      },
      {
        titulo: "¿Cómo se instala?",
        texto:
          "El Método MECF identifica tres vectores de transmisión: el vector emocional (traumas del linaje que no fueron procesados), el vector conductual (patrones repetidos en 2 o más generaciones) y el vector biológico (síntomas físicos que tienen un origen psicoemocional y se repiten en el árbol familiar).",
      },
      {
        titulo: "El primer paso hacia la libertad",
        texto:
          "No puedes desinstalar un programa que no sabes que tienes. El Código de Origen te da visibilidad total: en qué áreas de tu vida operas en modo heredado, quién instaló el programa y cuándo. El diagnóstico es el 80% de la solución.",
      },
    ],
    cierre:
      "Una vez identificado tu Código de Origen, el sistema está listo para la siguiente fase: el Hackeo Cuántico.",
  },
  {
    id: "02",
    slug: "hackeo-cuantico",
    num: "02",
    title: "Hackeo Cuántico",
    tagline: "Modifica las variables de tu campo energético para alterar resultados tangibles.",
    intro:
      "Si el Código de Origen es el diagnóstico, el Hackeo Cuántico es la intervención. No se trata de motivación ni de fuerza de voluntad — se trata de modificar la frecuencia que emites para que la realidad exterior responda a un patrón diferente.",
    bloques: [
      {
        titulo: "La física detrás del cambio",
        texto:
          "Tesla demostró que todo en el universo es energía, frecuencia y vibración. Tu campo electromagnético — generado principalmente por el corazón — emite una señal constante. Esa señal atrae experiencias coherentes con su frecuencia. Cambiar el resultado exterior requiere primero cambiar la señal interior.",
      },
      {
        titulo: "Las variables que se pueden modificar",
        texto:
          "El MECF trabaja con cuatro variables principales: la frecuencia emocional dominante, el voltaje biológico (determinado por tu fecha de nacimiento según la escala Tesla 3·6·9), los nodos cronológicos de activación y la coherencia entre pensamiento, emoción y acción.",
      },
      {
        titulo: "El proceso de hackeo",
        texto:
          "El hackeo no es instantáneo pero sí es preciso. Una vez identificadas las variables a modificar, el protocolo establece ventanas de intervención óptimas — los nodos cronológicos — donde el campo es más receptivo al cambio. Actuar fuera de estas ventanas consume el doble de energía con la mitad de resultados.",
      },
    ],
    cierre:
      "Con el campo reprogramado, el siguiente paso es limpiar los virus financieros que bloquean la prosperidad.",
  },
  {
    id: "03",
    slug: "debug-de-prosperidad",
    num: "03",
    title: "Debug de Prosperidad",
    tagline: "Elimina los virus financieros y bloqueos de abundancia en tu linaje.",
    intro:
      "La pobreza no es una condición económica — es una frecuencia heredada. El Debug de Prosperidad localiza y elimina los virus que impiden que el dinero fluya de forma natural y sostenida en tu vida y en tu linaje.",
    bloques: [
      {
        titulo: "¿Qué es un virus financiero?",
        texto:
          "Un virus financiero es un programa limitante específicamente relacionado con el dinero, la abundancia y el merecimiento. Ejemplos: 'en esta familia nadie ha sido rico', 'ganar dinero requiere sacrificio', 'si tengo mucho, alguien cercano sufre'. Estos programas actúan como limitadores de voltaje — dejan pasar solo la cantidad de prosperidad que el sistema considera 'segura'.",
      },
      {
        titulo: "El origen transgeneracional del bloqueo",
        texto:
          "El MECF identifica el eslabón del árbol familiar donde se instaló el virus. Puede ser un bisabuelo que perdió todo en una guerra, una abuela que vivió en escasez extrema o un mandato cultural del clan. Ese evento generó una 'solución de supervivencia' que el sistema familiar sigue ejecutando generaciones después como si el peligro aún existiera.",
      },
      {
        titulo: "El proceso de debug",
        texto:
          "El debug consiste en tres pasos: identificación del virus y su origen, desactivación del mandato de lealtad que lo mantiene activo, e instalación de un nuevo protocolo de abundancia coherente con el voltaje real del consultante. No se puede instalar prosperidad donde hay culpa o vergüenza activa.",
      },
    ],
    cierre:
      "Con los virus eliminados, el sistema está listo para reescribir los patrones a nivel celular.",
  },
  {
    id: "04",
    slug: "patrones-quirurgicos",
    num: "04",
    title: "Patrones Quirúrgicos",
    tagline: "Reescribe hábitos a nivel celular mediante biodecodificación de precisión.",
    intro:
      "Los hábitos no son costumbres — son cicatrices neurológicas. Los Patrones Quirúrgicos es la fase del MECF donde se interviene directamente en la arquitectura del comportamiento, no con motivación sino con precisión biológica.",
    bloques: [
      {
        titulo: "Por qué la fuerza de voluntad no funciona",
        texto:
          "El 95% de tus comportamientos son ejecutados por el subconsciente — un sistema que no entiende de intenciones ni de propósitos de año nuevo. Solo entiende de seguridad y amenaza. Si un comportamiento lleva años instalado, el subconsciente lo considera 'seguro' simplemente porque es conocido. Cambiar requiere convencer al sistema, no forzarlo.",
      },
      {
        titulo: "La biodecodificación de precisión",
        texto:
          "Cada síntoma físico y cada patrón de comportamiento tiene un conflicto emocional subyacente. El MECF identifica la emoción detrás del patrón, el momento en que se instaló y la función de supervivencia que cumple. Una vez visible, el sistema puede ofrecer una alternativa más eficiente que el comportamiento problemático.",
      },
      {
        titulo: "La intervención quirúrgica",
        texto:
          "A diferencia de los métodos convencionales que atacan el síntoma, la intervención quirúrgica del MECF va a la raíz: modifica el programa emocional que genera el comportamiento. El resultado es un cambio duradero porque se resuelve la causa, no se suprime la consecuencia.",
      },
    ],
    cierre:
      "Con los patrones reescritos, el sistema está preparado para ejecutar el salto cuántico hacia el nuevo nivel de existencia.",
  },
  {
    id: "05",
    slug: "salto-cuantico",
    num: "05",
    title: "Salto Cuántico",
    tagline: "Ejecuta el nuevo software y observa cómo el hardware biológico responde.",
    intro:
      "El Salto Cuántico no es una metáfora — es un cambio real y medible en la frecuencia que emites y en los resultados que obtienes. Es el momento en que el nuevo software instalado en las fases anteriores comienza a ejecutarse de forma autónoma.",
    bloques: [
      {
        titulo: "¿Qué es exactamente un salto cuántico?",
        texto:
          "En física cuántica, un salto cuántico es el cambio discontinuo de un electrón de un nivel de energía a otro — sin pasar por estados intermedios. En el MECF, un salto cuántico personal es ese momento en que dejas de operar desde el patrón heredado y empiezas a operar desde tu voltaje real. No es gradual — es un antes y un después.",
      },
      {
        titulo: "Las condiciones necesarias",
        texto:
          "El salto no puede forzarse — solo puede facilitarse. Las condiciones son: haber identificado y desactivado el Código de Origen, haber eliminado los principales virus financieros y emocionales, y estar operando dentro de un nodo cronológico activo. Intentar el salto fuera de estas condiciones produce rebote — el sistema regresa al patrón anterior con más fuerza.",
      },
      {
        titulo: "Cómo se manifiesta en la realidad",
        texto:
          "Los primeros indicadores del salto cuántico son sutiles: cambios en las personas que atraes, oportunidades que aparecen sin que las busques, y sobre todo una sensación de coherencia interna — la ausencia de la tensión crónica entre lo que quieres y lo que haces. Después vienen los cambios externos: económicos, relacionales, de salud.",
      },
    ],
    cierre:
      "Tras el salto, la última fase es la más importante: convertirte en el Administrador Total de tu sistema para que los resultados sean permanentes.",
  },
  {
    id: "06",
    slug: "administrador-total",
    num: "06",
    title: "Administrador Total",
    tagline: "Conviértete en el único operador de tu sistema y reescribe tus resultados.",
    intro:
      "La mayoría de las personas viven como Usuarios Invitados de su propia vida — ejecutan el software que otros instalaron, en un sistema que otros configuraron. El Administrador Total es el nivel en el que recuperas los permisos de root sobre tu propia existencia.",
    bloques: [
      {
        titulo: "La diferencia entre usuario y administrador",
        texto:
          "Un usuario puede usar el sistema tal como está. Un administrador puede modificarlo, actualizarlo, eliminar programas y instalar nuevos. Durante décadas has sido usuario de un sistema diseñado por tu linaje, tu cultura y tus experiencias tempranas. El MECF te devuelve los privilegios de administrador.",
      },
      {
        titulo: "Las responsabilidades del administrador",
        texto:
          "Ser Administrador Total implica aceptar que los resultados de tu vida son el output directo de la programación que operas. No hay víctimas en el nivel de administrador — solo variables a ajustar. Esta perspectiva no es una carga sino una liberación: si tú eres el origen, tú tienes el poder de cambiar el resultado.",
      },
      {
        titulo: "El mantenimiento del sistema",
        texto:
          "Un administrador no solo instala el nuevo software — también hace mantenimiento preventivo. El MECF incluye un protocolo de monitorización continua: los nodos cronológicos anuales son las ventanas de revisión y actualización del sistema. Cada nodo es una oportunidad de subir de versión — o de detectar un virus antes de que cause daño.",
      },
    ],
    cierre:
      "El Administrador Total no es un destino — es un modo de operar permanente. Bienvenido al nivel de acceso completo.",
  },
];
