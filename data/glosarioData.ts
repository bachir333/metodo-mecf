export interface GlosarioTerm {
  slug: string;
  term: string;
  icon: string;
  simple: string;
  analogy: string;
  mecf: string;
  seoTitle: string;
  seoDesc: string;
  expanded: {
    title: string;
    body: string;
  }[];
  faqs: { q: string; a: string }[];
  related: string[];
}

export const TERMS: GlosarioTerm[] = [
  {
    slug: "software",
    term: "Software",
    icon: "◈",
    simple: "Las instrucciones que gobiernan tu comportamiento",
    analogy:
      "Como las aplicaciones de tu móvil: no las ves, pero determinan todo lo que hace el sistema. Tu software son los programas mentales, creencias y respuestas automáticas que ejecutas a diario sin darte cuenta.",
    mecf:
      "En el MECF, el software son los patrones de conducta que identificamos y que se pueden actualizar. No eres tú — es lo que estás ejecutando.",
    seoTitle: "¿Qué es el Software en el Método MECF?",
    seoDesc:
      "Descubre qué significa Software en el Método MECF: los patrones de conducta y creencias automáticas que gobiernan tu comportamiento y cómo identificarlos para actualizarlos.",
    expanded: [
      {
        title: "¿Qué es el software personal?",
        body:
          "El software personal son todas las instrucciones que tu sistema ejecuta de forma automática: respuestas emocionales ante ciertos estímulos, patrones de relación, creencias sobre el dinero o el éxito, y reacciones aprendidas desde la infancia. No los elegiste conscientemente — simplemente quedaron instalados.",
      },
      {
        title: "¿Por qué el MECF usa el término 'software' y no 'creencias'?",
        body:
          "Porque 'creencias' implica que podrías simplemente 'cambiar de opinión'. El software es más preciso: describe un programa que se ejecuta en segundo plano, independientemente de lo que tú pienses conscientemente. Esta distinción cambia completamente el enfoque del análisis — no se trata de convencerte de algo, sino de identificar el programa que está corriendo.",
      },
      {
        title: "¿Se puede actualizar el software?",
        body:
          "Sí. En términos MECF, actualizar el software significa identificar el programa antiguo, entender en qué contexto fue útil (normalmente la infancia) y reemplazarlo por una versión más funcional para el contexto actual. El Protocolo MECF incluye el proceso de actualización una vez identificado el software que está generando conflictos.",
      },
    ],
    faqs: [
      {
        q: "¿El software es lo mismo que el subconsciente?",
        a: "Son términos solapados pero no idénticos. El software MECF se refiere específicamente a los patrones de conducta ejecutables — no a todo el contenido subconsciente. Es más operativo: lo que se puede identificar, medir y actualizar.",
      },
      {
        q: "¿Cuántos programas de software tiene una persona?",
        a: "El análisis MECF identifica los programas principales que están activos en este momento — los que generan mayor fricción o mayor energía en el sistema. No se trata de catalogar todo, sino de encontrar los que más impacto tienen.",
      },
      {
        q: "¿El software cambia solo con el tiempo?",
        a: "Puede evolucionar, pero raramente se actualiza solo. Sin intervención consciente, el sistema tiende a reforzar los programas existentes — incluso cuando ya no son útiles.",
      },
    ],
    related: ["firmware", "actualizacion", "hardware", "protocolo"],
  },
  {
    slug: "hardware",
    term: "Hardware",
    icon: "⬡",
    simple: "Tu cuerpo y tu biología — el contenedor físico",
    analogy:
      "Como el propio teléfono: la pantalla, los chips, la batería. Sin hardware no hay software. En tu vida, el hardware es tu cuerpo, tu sistema nervioso y tu genética — la base física sobre la que todo lo demás opera.",
    mecf:
      "El MECF no trabaja directamente con el hardware, pero reconoce que muchos síntomas físicos son la expresión del software que se está ejecutando en él.",
    seoTitle: "¿Qué es el Hardware en el Método MECF?",
    seoDesc:
      "En el Método MECF, el hardware es tu cuerpo y tu biología. Aprende cómo la base física actúa como contenedor de los programas mentales y qué relación tiene con tus síntomas.",
    expanded: [
      {
        title: "¿Qué representa el hardware en una persona?",
        body:
          "El hardware es la capa física: tu sistema nervioso, tu genética, tu cuerpo. Es el contenedor sobre el que se ejecutan todos los demás sistemas — software, firmware, voltaje. No puedes cambiar el hardware de base, pero sí puedes optimizar cómo lo usas y qué programas corren sobre él.",
      },
      {
        title: "¿El MECF trabaja con el hardware?",
        body:
          "El análisis MECF no es una intervención médica ni terapéutica corporal. Sin embargo, reconoce que los síntomas físicos — tensión, fatiga crónica, insomnio, somatizaciones — frecuentemente son la expresión de software desactualizado ejecutándose en el hardware. Actualizar el software puede aliviar la presión sobre el sistema físico.",
      },
      {
        title: "¿Por qué importa entender el hardware?",
        body:
          "Porque muchas personas intentan 'cambiar su vida' sin reconocer las limitaciones del hardware actual. Si tu sistema nervioso está en modo de alerta constante, cualquier software que instales encima opera en condiciones degradadas. Reconocer el hardware ayuda a entender por qué ciertos cambios cuestan más en determinados momentos.",
      },
    ],
    faqs: [
      {
        q: "¿La genética es el hardware?",
        a: "Sí, en gran parte. La genética es la especificación técnica con la que llegaste — el modelo de dispositivo. No determina todo lo que eres, pero sí establece ciertos rangos dentro de los que opera el sistema.",
      },
      {
        q: "¿Se puede mejorar el hardware?",
        a: "Hasta cierto punto: el descanso, la alimentación y el ejercicio son formas de mantener el hardware en condiciones óptimas. El MECF enfoca el trabajo en el software y el firmware, pero siempre reconoce que el hardware en buen estado facilita todo lo demás.",
      },
      {
        q: "¿Los síntomas físicos tienen siempre una causa de software?",
        a: "No siempre, y el MECF no hace esa afirmación. Lo que sí observa es que muchos síntomas persistentes sin causa médica clara tienen correlación con patrones de software activos.",
      },
    ],
    related: ["software", "firmware", "voltaje"],
  },
  {
    slug: "firmware",
    term: "Firmware",
    icon: "◇",
    simple: "Los programas que vienen instalados de fábrica y no ves",
    analogy:
      "Como el sistema base de un televisor: está siempre activo, no lo elegiste y casi nunca lo actualizas. En tu vida, el firmware son los patrones familiares y culturales que absorbiste en la infancia — antes de tener criterio para aceptarlos o rechazarlos.",
    mecf:
      "El módulo Firmware MECF identifica qué sistema operativo base estás usando, de dónde viene y cómo condiciona todo lo que percibes y decides.",
    seoTitle: "¿Qué es el Firmware en el Método MECF?",
    seoDesc:
      "El Firmware MECF son los patrones familiares y culturales instalados en la infancia. Descubre cómo identificar tu sistema operativo base y cómo condiciona tu percepción y decisiones.",
    expanded: [
      {
        title: "¿Qué es el firmware personal?",
        body:
          "El firmware son los programas más profundos del sistema — los que se instalaron antes de que pudieras elegir. Incluye los valores familiares transmitidos sin palabras, las lealtades invisibles al linaje, las creencias culturales sobre lo que es posible y lo que no, y los patrones de relación que viste repetirse en casa. Están tan integrados que parecen 'tu forma de ser' cuando en realidad son herencia.",
      },
      {
        title: "¿Por qué es difícil detectar el firmware?",
        body:
          "Porque opera como el sistema operativo: en segundo plano, siempre activo, invisible para el propio sistema. Cuando tu firmware dice 'el dinero es peligroso' o 'las relaciones duran poco', no lo experimentas como una creencia — lo experimentas como la realidad. El análisis MECF usa herramientas específicas para hacerlo visible.",
      },
      {
        title: "¿El firmware se puede cambiar?",
        body:
          "Es el nivel más difícil de actualizar, pero sí puede modificarse. El módulo Firmware MECF no borra el original — lo hace consciente, lo que ya cambia su influencia. Una vez identificado, se puede instalar una versión actualizada que coexiste con el antiguo pero ya no lo ejecuta automáticamente.",
      },
    ],
    faqs: [
      {
        q: "¿El firmware es lo mismo que los traumas de infancia?",
        a: "No exactamente. El trauma es un evento; el firmware es el programa que se instaló como respuesta a ese evento (o simplemente como herencia). El MECF trabaja con el programa, no con el evento.",
      },
      {
        q: "¿Cómo sé cuál es mi firmware?",
        a: "El análisis MECF lo identifica a partir de la fecha de nacimiento y el contexto biográfico. Las señales más claras suelen ser las áreas de la vida donde sientes que 'siempre pasa lo mismo' o donde tus decisiones parecen tomadas solas.",
      },
      {
        q: "¿El firmware es el mismo para todos los de una familia?",
        a: "Hay un firmware familiar compartido, pero cada miembro lo recibe y procesa diferente según su voltaje y posición en el árbol biográfico.",
      },
    ],
    related: ["software", "arbol-biografico", "actualizacion", "hardware"],
  },
  {
    slug: "voltaje",
    term: "Voltaje",
    icon: "◉",
    simple: "La frecuencia energética base desde la que operas",
    analogy:
      "Piensa en los enchufes: un electrodoméstico diseñado para 110V no funciona igual en una red de 220V. El voltaje no es bueno ni malo — es simplemente la frecuencia con la que tu sistema fue diseñado para operar. Forzarlo a otra frecuencia genera ruido y cortocircuitos.",
    mecf:
      "El MECF calcula tu Voltaje usando la secuencia de Tesla (3·6·9) aplicada a tu fecha de nacimiento. Es el patrón base que filtra cómo procesas la realidad.",
    seoTitle: "¿Qué es el Voltaje en el Método MECF?",
    seoDesc:
      "El Voltaje MECF es tu frecuencia energética base, calculada con la secuencia de Tesla aplicada a tu fecha de nacimiento. Aprende qué patrón determina cómo procesas la realidad.",
    expanded: [
      {
        title: "¿Qué determina el voltaje de una persona?",
        body:
          "El voltaje determina el tipo de energía con la que tu sistema procesa la información y genera acción. No es tu personalidad — es la frecuencia base. Hay personas de voltaje 3 (comunicación, ciclos cortos, expresión), de voltaje 6 (armonía, responsabilidad, estructura relacional) y de voltaje 9 (cierre, transformación, visión de largo plazo). Cada uno opera de forma óptima en entornos alineados con su frecuencia.",
      },
      {
        title: "¿Por qué la secuencia de Tesla (3·6·9)?",
        body:
          "Nikola Tesla consideraba los números 3, 6 y 9 como los patrones fundamentales de la naturaleza. El MECF utiliza esta secuencia como base del cálculo de voltaje porque corresponde a los tres modos fundamentales de procesamiento energético que se observan en los sistemas humanos. No es numerología convencional — es un sistema de clasificación técnica.",
      },
      {
        title: "¿Se puede cambiar el voltaje?",
        body:
          "No. El voltaje es una constante del sistema — viene determinado por la fecha de nacimiento. Lo que sí puedes hacer es dejar de operar en frecuencias incompatibles con él. Muchos problemas crónicos (burnout, relaciones desgastantes, trabajo que drena) tienen como causa de raíz operar en un voltaje diferente al propio.",
      },
    ],
    faqs: [
      {
        q: "¿Cuántos tipos de voltaje existen?",
        a: "Tres: voltaje 3, voltaje 6 y voltaje 9. Cada uno tiene sus características operativas, sus entornos óptimos y sus patrones de desgaste específicos.",
      },
      {
        q: "¿El voltaje cambia con la edad?",
        a: "No. Es una constante calculada a partir de la fecha de nacimiento. Lo que cambia son los ciclos biográficos y los nodos activos — pero el voltaje permanece.",
      },
      {
        q: "¿Puedo saber mi voltaje sin comprar el informe?",
        a: "El cálculo completo requiere el Protocolo MECF. Sin embargo, si entiendes los tres tipos puedes tener una orientación inicial observando en qué tipo de entorno te sientes más funcional.",
      },
    ],
    related: ["ciclo-biografico", "nodo", "codigo-mecf"],
  },
  {
    slug: "nodo",
    term: "Nodo",
    icon: "◆",
    simple: "Un punto de intersección — una ventana de oportunidad",
    analogy:
      "En una red de carreteras, un nodo es una intersección: el punto donde los caminos se cruzan y puedes elegir dirección. En tu árbol biográfico, los nodos son los momentos donde el sistema puede cambiar de rumbo — si sabes cuándo están y cómo usarlos.",
    mecf:
      "El análisis de Nodos MECF identifica esas intersecciones en tu línea biográfica. No son destinos — son ventanas de intervención técnica.",
    seoTitle: "¿Qué es un Nodo en el Método MECF?",
    seoDesc:
      "Un Nodo MECF es una ventana de intervención técnica en tu línea biográfica: el momento donde el sistema puede cambiar de rumbo. Descubre cómo identificarlos y usarlos.",
    expanded: [
      {
        title: "¿Qué distingue un nodo de un momento cualquiera?",
        body:
          "La mayoría del tiempo, el sistema opera dentro de la inercia de sus ciclos actuales. Un nodo es un punto donde convergen varios patrones simultáneamente, creando una apertura real al cambio. Son raros y calculables — no ocurren todos los años. El error más común es no reconocerlos cuando llegan, o intentar forzar cambios cuando no hay ningún nodo activo.",
      },
      {
        title: "¿Cuántos nodos tiene una persona en su vida?",
        body:
          "Depende del árbol biográfico y los ciclos. El análisis MECF proyecta los nodos hasta 2032, identificando cuáles son de alta densidad (mayor capacidad de cambio estructural) y cuáles son de tránsito (cambios más superficiales). No todos los nodos son del mismo tipo ni tienen el mismo impacto.",
      },
      {
        title: "¿Se puede crear un nodo artificialmente?",
        body:
          "No. Los nodos emergen de la intersección de ciclos y patrones del sistema — no se pueden manufacturar. Lo que sí se puede hacer es estar preparado cuando llegan: tener clara la dirección, el software actualizado y el firmware identificado. Un nodo activo con el sistema preparado es una ventana real de transformación.",
      },
    ],
    faqs: [
      {
        q: "¿Están los nodos relacionados con los momentos difíciles de la vida?",
        a: "A veces. Los nodos de alta densidad a menudo se viven como crisis — porque el sistema está bajo presión para cambiar. Pero también pueden vivirse como oportunidades si se tiene el mapa del sistema.",
      },
      {
        q: "¿Qué pasa si no aprovecho un nodo?",
        a: "El sistema vuelve a la inercia del ciclo. No es una pérdida permanente — habrá otros nodos — pero sí es una ventana que se cierra. La consciencia del nodo permite decidir activamente qué hacer con él.",
      },
      {
        q: "¿El próximo nodo está en el informe MECF?",
        a: "Sí. El informe incluye la proyección de nodos activos hasta 2032 con su tipo, densidad y ventana temporal.",
      },
    ],
    related: ["ciclo-biografico", "arbol-biografico", "codigo-mecf", "protocolo"],
  },
  {
    slug: "arbol-biografico",
    term: "Árbol biográfico",
    icon: "⌘",
    simple: "La estructura de programas heredados que estás ejecutando",
    analogy:
      "Como un árbol genealógico, pero en lugar de mostrar quién es quién, muestra qué patrones de comportamiento se han transmitido de generación en generación. Las raíces son tus antepasados; las ramas son los programas que heredaste; las hojas son cómo esos programas se manifiestan en tu vida hoy.",
    mecf:
      "El módulo Árbol MECF mapea esa estructura y detecta qué programas heredados estás ejecutando sin haberlos elegido.",
    seoTitle: "¿Qué es el Árbol Biográfico en el Método MECF?",
    seoDesc:
      "El Árbol Biográfico MECF mapea la estructura de programas heredados que ejecutas. Descubre qué patrones transgeneracionales condicionan tu vida y cómo identificarlos.",
    expanded: [
      {
        title: "¿Qué contiene el árbol biográfico?",
        body:
          "El árbol biográfico es la estructura completa de programas que provienen de tu linaje: los patrones de comportamiento repetidos en tu familia durante generaciones, las lealtades invisibles a figuras del pasado, los mandatos (conscientes o no) sobre cómo vivir, qué lograr, a qué renunciar. Incluye también los eventos de alto impacto biográfico — los que dejaron marca en el sistema familiar.",
      },
      {
        title: "¿Por qué se repiten los patrones en las familias?",
        body:
          "Porque los programas no desaparecen solos entre generaciones. Un patrón instalado en un antepasado (por ejemplo, ante una situación de escasez extrema) queda codificado en el firmware del sistema familiar y se transmite como 'la forma en que se hacen las cosas'. Cada generación lo ejecuta sin cuestionarlo porque parece natural — es el agua en la que todos nadan.",
      },
      {
        title: "¿Cómo trabaja el MECF con el árbol biográfico?",
        body:
          "El módulo Árbol MECF no requiere que conozcas toda tu historia familiar. Usa la fecha de nacimiento como punto de entrada al sistema y, a partir de ahí, calcula la estructura de herencia activa — qué programas del linaje están corriendo en este momento y cuáles son los de mayor impacto en las decisiones actuales.",
      },
    ],
    faqs: [
      {
        q: "¿Necesito conocer a mis abuelos para hacer el análisis del árbol?",
        a: "No. El análisis MECF no es biográfico en el sentido histórico — no requiere que cuentes tu historia familiar. El cálculo parte de la fecha de nacimiento y el sistema deduce la estructura activa.",
      },
      {
        q: "¿El árbol biográfico incluye a los dos lados de la familia?",
        a: "Sí. El análisis considera el linaje materno y el paterno, con sus diferentes tipos de herencia e influencia en el sistema.",
      },
      {
        q: "¿Puedo 'salirme' del árbol biográfico?",
        a: "No puedes borrar tu origen, pero sí puedes dejar de ejecutar sus programas automáticamente. Eso es lo que el MECF llama actualización del firmware.",
      },
    ],
    related: ["firmware", "nodo", "software", "ciclo-biografico"],
  },
  {
    slug: "protocolo",
    term: "Protocolo",
    icon: "▶",
    simple: "Un conjunto de pasos ordenados que el sistema sigue",
    analogy:
      "Como un protocolo médico de urgencias: una secuencia específica de acciones que se sigue en orden para obtener el resultado correcto. No se improvisa, no se salta pasos. El protocolo existe porque funciona cuando se aplica completo.",
    mecf:
      "El Protocolo MECF es el proceso completo de análisis: introducir datos → calcular códigos → generar el informe → identificar ventanas de intervención.",
    seoTitle: "¿Qué es el Protocolo MECF?",
    seoDesc:
      "El Protocolo MECF es el proceso completo de análisis biográfico: datos → códigos → informe → ventanas de intervención. Descubre cómo funciona el método paso a paso.",
    expanded: [
      {
        title: "¿Por qué se llama Protocolo y no método o técnica?",
        body:
          "Porque un protocolo implica precisión y orden. Un método es flexible — puedes adaptarlo. Un protocolo no: cada paso tiene su razón y su secuencia. El MECF se llama Protocolo porque el análisis funciona cuando se aplica en orden completo — no como un menú del que eliges partes.",
      },
      {
        title: "¿Qué incluye el Protocolo MECF?",
        body:
          "El protocolo completo incluye: (1) Recopilación de datos biográficos — fecha de nacimiento, lugar, contexto. (2) Cálculo del Voltaje, Firmware activo y Árbol biográfico. (3) Proyección de Ciclos y Nodos hasta 2032. (4) Generación del Código MECF y el informe personalizado. (5) Identificación de las ventanas de intervención activas.",
      },
      {
        title: "¿El protocolo es el mismo para todos?",
        body:
          "El proceso es el mismo — la secuencia de cálculo es estándar. El resultado es único para cada persona porque los datos de entrada son únicos. Dos personas con la misma fecha de nacimiento pero distinto lugar de nacimiento tienen códigos MECF diferentes.",
      },
    ],
    faqs: [
      {
        q: "¿Cuánto tiempo tarda el protocolo?",
        a: "El análisis se genera automáticamente en minutos una vez introducidos los datos. El informe llega por email en formato PDF.",
      },
      {
        q: "¿Es el Protocolo MECF una terapia?",
        a: "No. El MECF es un sistema de análisis técnico — no es terapia, ni coaching, ni asesoramiento psicológico. Es diagnóstico e identificación de patrones activos.",
      },
      {
        q: "¿Se puede hacer el protocolo en varios idiomas?",
        a: "Sí. El informe está disponible en español, inglés y francés.",
      },
    ],
    related: ["codigo-mecf", "voltaje", "nodo", "ciclo-biografico"],
  },
  {
    slug: "actualizacion",
    term: "Actualización",
    icon: "↑",
    simple: "Reemplazar un programa obsoleto por uno más funcional",
    analogy:
      "Cuando tu móvil tiene una versión antigua del sistema operativo, no funciona bien con las apps modernas. No está roto — necesita una actualización. Lo mismo aplica a los programas mentales: no estás roto, estás ejecutando una versión que ya no sirve para el contexto actual.",
    mecf:
      "El MECF no habla de 'sanar' ni de 'curar'. Habla de actualizar. La diferencia es técnica: sanar implica que algo está enfermo; actualizar implica que algo puede mejorarse.",
    seoTitle: "¿Qué es una Actualización en el Método MECF?",
    seoDesc:
      "En el MECF, actualizar significa reemplazar un programa obsoleto por uno funcional. Descubre por qué el Método habla de actualización en lugar de sanación o terapia.",
    expanded: [
      {
        title: "¿Qué diferencia a una actualización de una 'sanación'?",
        body:
          "La sanación implica que algo está enfermo o roto y necesita ser curado. La actualización parte de una premisa diferente: el sistema funciona correctamente — está ejecutando el programa para el que fue diseñado. El problema es que ese programa fue diseñado para un contexto que ya no existe. Actualizar es instalar una versión más funcional para el contexto actual.",
      },
      {
        title: "¿Cómo se hace una actualización según el MECF?",
        body:
          "El proceso tiene tres etapas: (1) Identificar el programa que está generando conflicto — qué instrucción específica está ejecutando. (2) Entender su origen y el contexto en el que fue útil. (3) Diseñar e instalar una versión actualizada que mantenga la función (protegerte, adaptarte, relacionarte) pero con una lógica más actual. El Protocolo MECF identifica los programas prioritarios para actualizar.",
      },
      {
        title: "¿La actualización es permanente?",
        body:
          "Como cualquier actualización de software, puede ser revertida por el sistema si no se consolida. Requiere un período de implementación donde el programa nuevo se convierte en el predeterminado. El mapa de ciclos y nodos del MECF indica cuáles son los mejores momentos para que una actualización sea efectiva.",
      },
    ],
    faqs: [
      {
        q: "¿Puedo actualizar todos mis programas a la vez?",
        a: "No es recomendable. El sistema necesita estabilidad para procesar cambios. El análisis MECF identifica qué programas tienen mayor impacto y en qué orden actualizar para no sobrecargar el sistema.",
      },
      {
        q: "¿La actualización requiere terapia?",
        a: "No necesariamente. El MECF ofrece el diagnóstico y el mapa — el proceso de actualización lo puede complementar con las herramientas que cada persona elija.",
      },
      {
        q: "¿Cómo sé si una actualización ha funcionado?",
        a: "Cuando el patrón antiguo deja de activarse automáticamente ante los mismos estímulos — o cuando se activa, tienes capacidad de observarlo y elegir una respuesta diferente.",
      },
    ],
    related: ["software", "firmware", "protocolo", "ciclo-biografico"],
  },
  {
    slug: "ciclo-biografico",
    term: "Ciclo biográfico",
    icon: "○",
    simple: "Los períodos de tiempo en los que tu sistema opera bajo una frecuencia específica",
    analogy:
      "Como las estaciones del año: no puedes plantar en invierno y esperar los mismos resultados que en primavera. Los ciclos biográficos son los 'períodos climáticos' de tu sistema — cada uno con su frecuencia, sus oportunidades y sus limitaciones propias.",
    mecf:
      "El MECF calcula tus ciclos biográficos y los proyecta hasta 2032. No para predecir el futuro — para saber en qué frecuencia estás operando y cuándo cambia.",
    seoTitle: "¿Qué es un Ciclo Biográfico en el Método MECF?",
    seoDesc:
      "Un Ciclo Biográfico MECF es un período de tiempo donde tu sistema opera en una frecuencia específica. Aprende a identificar en qué ciclo estás y qué oportunidades activa.",
    expanded: [
      {
        title: "¿Cómo funciona un ciclo biográfico?",
        body:
          "Cada ciclo tiene una duración determinada y una frecuencia dominante — una especie de 'clima energético' en el que el sistema opera. Durante un ciclo de apertura, los cambios fluyen más. Durante un ciclo de consolidación, lo que importa es afianzar lo existente. Intentar cambiar de raíz durante un ciclo de consolidación genera desgaste sin resultados — como remar contra la corriente.",
      },
      {
        title: "¿Los ciclos son iguales para todos?",
        body:
          "No. Los ciclos se calculan individualmente a partir de la fecha de nacimiento y el voltaje. Dos personas que viven el mismo año pueden estar en ciclos completamente diferentes — con frecuencias opuestas. Esto explica por qué el mismo momento histórico impacta diferente a cada persona.",
      },
      {
        title: "¿Qué pasa en el cambio de ciclo?",
        body:
          "Los cambios de ciclo son los momentos de mayor potencial de transformación — y también de mayor inestabilidad. El sistema está recalibrando su frecuencia base. El análisis MECF identifica los cambios de ciclo próximos y qué tipo de transición implican.",
      },
    ],
    faqs: [
      {
        q: "¿Cuánto dura un ciclo biográfico?",
        a: "Depende del sistema individual. Hay ciclos cortos (de meses) y ciclos mayores (de años). El análisis MECF identifica ambos y su superposición.",
      },
      {
        q: "¿Puedo estar en más de un ciclo a la vez?",
        a: "Sí. Los ciclos se superponen como capas — hay un ciclo mayor que define el período general y ciclos menores dentro de él que modulan semanas o meses específicos.",
      },
      {
        q: "¿El informe MECF incluye mis ciclos actuales?",
        a: "Sí. El informe proyecta los ciclos hasta 2032 con su frecuencia, duración y los nodos que se activan dentro de cada uno.",
      },
    ],
    related: ["nodo", "voltaje", "codigo-mecf", "protocolo"],
  },
  {
    slug: "codigo-mecf",
    term: "Código MECF",
    icon: "◈",
    simple: "Tu perfil técnico único — la combinación de todos tus parámetros",
    analogy:
      "Como el número de serie de un dispositivo: identifica exactamente qué configuración tienes, qué voltaje requiere, qué firmware lleva instalado y qué ciclos de mantenimiento necesita. Dos personas con la misma fecha de nacimiento pero distinto lugar tienen códigos diferentes.",
    mecf:
      "El Código MECF es el resultado del cálculo completo: Voltaje + Firmware + Árbol + Nodos + Ciclos. Es el diagnóstico técnico de tu sistema.",
    seoTitle: "¿Qué es el Código MECF?",
    seoDesc:
      "El Código MECF es tu perfil técnico único: la combinación de Voltaje, Firmware, Árbol biográfico, Nodos y Ciclos. Descubre qué contiene y cómo se calcula.",
    expanded: [
      {
        title: "¿Qué contiene exactamente el Código MECF?",
        body:
          "El Código MECF es el resultado de integrar todos los módulos del análisis: tu Voltaje (frecuencia base), tu Firmware activo (herencia familiar dominante), la estructura de tu Árbol biográfico (programas de linaje activos), los Nodos próximos (ventanas de intervención) y los Ciclos actuales y futuros (frecuencias operativas hasta 2032). Es el diagnóstico técnico completo del sistema.",
      },
      {
        title: "¿Es el Código MECF único por persona?",
        body:
          "Sí. Aunque dos personas tengan la misma fecha de nacimiento, el lugar de nacimiento, la hora y el contexto biográfico generan variaciones en el código. No hay dos Códigos MECF idénticos.",
      },
      {
        title: "¿Cómo se usa el Código MECF?",
        body:
          "El Código es la base del informe. Una vez generado, permite identificar con precisión qué programas están activos, cuáles generan más fricción, cuándo son los próximos nodos de intervención y en qué frecuencia de ciclo se está operando. Es el manual de usuario del sistema.",
      },
    ],
    faqs: [
      {
        q: "¿El Código MECF cambia con el tiempo?",
        a: "Los parámetros base (voltaje, firmware) son constantes. Los ciclos y nodos sí evolucionan — por eso el informe incluye proyección hasta 2032.",
      },
      {
        q: "¿Cómo obtengo mi Código MECF?",
        a: "A través del Protocolo MECF completo, disponible en la sección de módulos. Introduces tu fecha y lugar de nacimiento, y el sistema genera el código y el informe personalizado.",
      },
      {
        q: "¿El Código MECF es lo mismo que un número de la suerte?",
        a: "No. El Código MECF es un diagnóstico técnico basado en patrones biográficos calculables — no es astrología, numerología convencional ni predicción. Es un mapa del sistema, no una profecía.",
      },
    ],
    related: ["voltaje", "firmware", "arbol-biografico", "protocolo", "ciclo-biografico"],
  },
];

export function getTermBySlug(slug: string): GlosarioTerm | undefined {
  return TERMS.find(t => t.slug === slug);
}

export function getRelatedTerms(slugs: string[]): GlosarioTerm[] {
  return slugs
    .map(s => TERMS.find(t => t.slug === s))
    .filter((t): t is GlosarioTerm => t !== undefined);
}
