import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, Activity, BookOpen, Clock, Play, Pause, RotateCcw,
  CheckCircle, Sparkles, Volume2, Info, Calendar,
  Sun, Headphones, Star, Video, Lock, Unlock,
  CreditCard, Send, Bot, BarChart2, TrendingUp, Users, UserCheck, MessageSquare,
  Award, Compass, MapPin, Feather, Tag, X, ChevronRight, Share2, ShieldCheck,
  Brain, Shield, Moon, Smile, RefreshCw
} from 'lucide-react';

const EXERCISES = [
  {
    id: 'Zu Chang Fa',
    title: 'Zu Chang Fa (Organización del Campo de Qi)',
    subtitle: 'Base indispensable para toda práctica de Zhineng Qigong',
    duration: '19 min',
    level: 'Todos los niveles / Este método debe realizarse antes de cualquier otro',
    description: 'Alinear la mente con el universo y relajar profundamente el cuerpo. Establece una conexión pura con el Hunyuan Qi primordial antes de iniciar cualquier método o sanación.',
    steps: [
      'Pies juntos, cuerpo centrado y erguido, mirada al frente en el horizonte.',
      'Traer la atención lentamente al centro de la cabeza y cerrar suavemente los ojos.',
      'Apertura mental: La cabeza toca el cielo, los pies firmes en la tierra.',
      'El cuerpo se relaja, la mente se expande ',
      'Respeto por fuera, serenidad y quietud por dentro.',
      'Corazón puro y mente transparente, expandiendo la conciencia al universo.',
      'Mente dentro del cuerpo y en armonía con el Hunyuan Qi',
    ],
    benefits: ['Centra la mente instantáneamente', 'Armoniza el sistema nervioso', 'Aumenta la efectividad de los ejercicios']
  },
  {
    id: 'la-qi',
    title: 'La Qi (Reunir Qi)',
    subtitle: 'Práctica esencial para sentir y acumular el Qi',
    duration: '6 min',
    level: 'Todos los niveles',
    description: 'Reunir Qi entre las manos mediante movimientos rítmicos de apertura (Kai) y cierre (He). Se puede mandar Qi a una zona especifica del cuerpo.',
    steps: [
      'Sostener una esfera transparente de Qi entre las palmas frente al abdomen.',
      'Abrir (Kai): Expandir las manos sintiendo la conexión con el horizonte infinito.',
      'Cerrar (He): Acercar las palmas sin tocarse, concentrando el Qi entre el espacio vacio entre las manos.'
    ],
    benefits: ['Desarrolla alta sensibilidad al Qi', 'Alivia dolor y tensión muscular', 'Regula la vitalidad corporal']
  },
  {
    id: 'peng-qi',
    title: 'Peng Qi Guan Ding Fa (Levantar y Verter el Qi por la cabeza)',
    subtitle: 'El método fundamental de Nivel 1 del Dr. Pang Ming',
    duration: '25-30 min',
    level: 'Principiante / Intermedio',
    description: 'Intercambiar el Qi del interior del cuerpo con el Hunyuan Qi del universo a través de la mente y movimientos fluidos de los brazos.',
    steps: [
      'Iniciar desde la posición neutra tras la Organización del Campo.',
      'Levantar el Qi por el frente, los lados y en diagonal hacia la coronilla (Baihui).',
      'Verter el Qi a través de la cabeza nutriendo todo el cuerpo hasta los pies.',
      'Llevar el Qi acumulado de regreso al Dan Tien bajo.'
    ],
    benefits: ['Fortalece el sistema inmunológico', 'Desbloquea los meridianos', 'Incrementa la vitalidad diaria']
  },
  {
    id: 'san-xin',
    title: 'San Xin Bing Zhan Zhuang (Fusión de los Tres Centros)',
    subtitle: 'Postura de Zhan Zhuang para unificar mente, cuerpo y Qi',
    duration: '15-20 min',
    level: 'Intermedio',
    description: 'Unifica los tres centros (centro de la cabeza, centro de las palmas y centro de las plantas de los pies) en el Dan Tien bajo para enraizar la mente y consolidar el Qi.',
    steps: [
      'Postura de pie con pies a lo ancho de hombros y rodillas ligeramente flexionadas.',
      'Palmas frente al abdomen guiando el foco hacia el centro del cuerpo.',
      'Llevar la intención desde Baihui, Laogong y Yongquan hacia el Dan Tien.',
      'Sostener la postura en profunda quietud interior.'
    ],
    benefits: ['Rejuvenece la energía profunda', 'Proporciona una calma emocional duradera', 'Fortalece la columna y piernas', 'Método de transcisión']
  },
  {
    id: 'dun-qiang',
    title: 'Dun Qiang Fa (Sentadillas de Pared)',
    subtitle: 'Transformación física y flexibilización de la columna',
    duration: '10-15 min',
    level: 'Todos los niveles',
    description: 'Sentadillas continuas frente a una pared que estiran los ligamentos principales y desbloquean el flujo de Qi a lo largo de la columna vertebral.',
    steps: [
      'Ubicarse frente a una pared con pies juntos o ligeramente separados.',
      'Bajar lentamente la cadera manteniendo la espalda recta.',
      'Subir impulsando desde la coronilla y el Dan Tien bajo.',
      'Mantener la mente tranquila y enfocada en la flexibilidad corporal.'
    ],
    benefits: ['Flexibiliza la columna vertebral', 'Mejora la salud lumbar', 'Poderosa desintoxicación corporal']
  },
  {
    id: 'cheng-qi',
    title: 'Cheng Qi (Extender el Qi)',
    subtitle: 'Expansión del Qi al espacio infinito',
    duration: '15 min',
    level: 'Intermedio / Avanzado',
    description: 'Extiende los brazos y la mente hacia el universo exterior para atraer información pura de salud y fuerza hacia nuestro campo personal.',
    steps: [
      'Proyectar las palmas y la conciencia hacia los confines del universo.',
      'Recoger el Qi atrayendolo de vuelta al abdomen.',
      'Integrar la información de abundancia y salud en cada célula.'
    ],
    benefits: ['Expande el campo de salud', 'Otorga gran claridad mental', 'Fortalece los brazos, las escapulas y el pecho']
  }
];

const BLOG_POSTS = [
  {
    id: 1,
    title: '¿Qué es realmente el Qi? Más allá de la idea de "energía"',
    category: 'Filosofía',
    date: '17 de Octubre, 2026',
    readTime: '4 min de lectura',
    author: 'José Antonio Cano',
    image: '',
    excerpt: 'Cuando las personas se acercan por primera vez a disciplinas orientales, es habitual escuchar que traducen el Qi como "energía". Sin embargo, en Zhineng Qigong la definición es mucho más profunda.',
    content: `Cuando las personas se acercan por primera vez a disciplinas orientales como el Qigong, es habitual que escuchen la palabra Qi traducida de forma simplificada como "energía" o "fuerza vital". Aunque esta traducción resulta práctica en una conversación informal, en el ámbito del Zhineng Qigong la definición es notablemente más profunda y completa.

Para comprender verdaderamente la práctica desarrollada por el Dr. Pang Ming, es necesario explorar la Teoría del Hunyuan Qi, pilar fundamental de esta ciencia del autocultivo.

El Hunyuan Qi: La integración de materia, energía e información

Desde la perspectiva del Zhineng Qigong, el Hunyuan Qi no es una fuerza sutil o mística separada de la realidad física, sino la sustancia primordial y continua del universo. Todo lo que existe en la naturaleza —desde una roca hasta una célula o un pensamiento— está compuesto y atravesado por Hunyuan Qi.

Esta sustancia se manifiesta en tres aspectos indisolubles conocidos como Xing, Qi y Shen:

1. Materia (Xing): La forma visible, la estructura corporal y la masa física.
2. Energía (Qi): La capacidad de transformación, movimiento e interacción entre las partes.
3. Información (Shen): El estado, las características y la dirección que organiza a la materia y a la energía.

Por lo tanto, cuando practicamos Zhineng Qigong, no estamos simplemente intentando "acumular energía" como quien carga una batería. Lo que hacemos es organizar la información de nuestro cuerpo y mente para que la materia y la energía fluyan de manera armónica.

El papel central de la mente (Yi Nian)

En otras corrientes tradicionales se trabaja manipulando la respiración o siguiendo trayectorias rígidas de meridianos. En Zhineng Qigong, el principio rector es claro: la mente guía al Qi (Yin Qi He Hunyuan).

La mente y la conciencia (YiyuanTi) no están separadas del campo de Qi; son, de hecho, la forma más elevada y refinada de información. Cuando dirigimos nuestra atención e intención (Yi Nian) hacia el espacio infinito o hacia el interior del cuerpo, el Hunyuan Qi responde de manera inmediata a esa dirección.

- Mente hacia el exterior: El Qi se expande y se conecta con la abundancia del entorno.
- Mente hacia el interior: El Qi se reúne y penetra profundamente en los órganos, tejidos y células.

Una perspectiva moderna y práctica

Comprender el Qi como una combinación de materia, energía e información transforma la manera en que abordamos la salud. Un malestar o un estado de fatiga no es la "falta" de una energía misteriosa, sino una perturbación en la información y organización del cuerpo.

A través de la práctica constante, aprendemos a serenar la mente, ajustar la postura física y enviar información clara de salud, equilibrio y vitalidad a cada rincón de nuestro ser.`
  },
  {
    id: 2,
    title: 'Zhineng Qigong para la mente moderna: Cómo reducir el estrés enfocando la conciencia',
    category: 'Práctica',
    date: '15 de Octubre, 2026',
    readTime: '3 min de lectura',
    author: 'José Antonio Cano',
    image: '',
    excerpt: 'El estilo de vida contemporáneo somete a nuestro sistema nervioso a una sobreestimulación constante. Descubre cómo transformar el estado mental a través del enfoque de la conciencia.',
    content: `El estilo de vida contemporáneo somete a nuestro sistema nervioso a una sobreestimulación constante. Notificaciones, interrupciones laborales, preocupaciones económicas y una lista interminable de pendientes mantienen a la mente en un estado de alerta continua. Este ritmo acelerado se traduce frecuentemente en fatiga crónica, tensión muscular e insomnio.

Ante esta realidad, muchas personas buscan herramientas para recuperar la calma. Sin embargo, en Zhineng Qigong el enfoque ante el estrés es distinto: no se busca controlar forzadamente la respiración ni detener los pensamientos de forma artificial, sino transformar el estado de la mente a través del enfoque de la conciencia.

La diferencia de Zhineng Qigong: Sin manipulación respiratoria

A menudo se asocia la meditación o el trabajo corporal con patrones de respiración específicos. En Zhineng Qigong no se realiza control o manipulación de la respiración (Tu Na). La respiración es un proceso fisiológico autónomo que debe mantenerse natural y libre.

Forzar un ritmo respiratorio cuando la mente está agitada solo genera tensión secundaria. En lugar de ello, Zhineng Qigong utiliza la intención mental (Yi Nian) para regular el estado general del organismo. Cuando la mente se enfoca y se aquieta, el ritmo respiratorio y el sistema nervioso se autorregulan por sí solos.

Herramientas prácticas para la vida diaria

Para aplicar el Zhineng Qigong frente al estrés cotidiano, no es necesario aislarse en una montaña ni dedicar horas a posturas complejas. Se pueden integrar principios sencillos en el día a día:

1. Organización del Campo de Qi (Zu Chang Fa)
Antes de iniciar tu jornada laboral o al terminar un día ajetreado, dedica unos minutos a organizar tu campo de Qi mentalmente. Lleva la atención a la inmensidad del espacio que te rodea, siente la serenidad del entorno y regresa esa atención al interior de tu cuerpo. Esta alternancia entre expansión y concentración restaura de inmediato el equilibrio mental.

2. Recoger la atención hacia el interior
El estrés se produce en gran medida cuando la mente se dispersa hacia el exterior en múltiples estímulos a la vez. Practicar la observación interior —sentir el cuerpo de cabeza a pies sin juzgar ni analizar— permite que la energía y la información regresen al centro, deteniendo el desgaste innecesario.

De la reacción a la presencia

Cultivar la serenidad mental (Tiao Xin) mediante Zhineng Qigong nos otorga un espacio entre el estímulo externo y nuestra respuesta. En lugar de reaccionar impulsivamente ante las exigencias del entorno, desarrollamos una mente clara, estable y presente, capaz de responder con ecuanimidad y eficacia.`
  },
  {
    id: 3,
    title: 'Mi Experiencia de Formación con los Maestros en Beijing',
    category: 'Salud y Qi',
    date: '28 de Septiembre, 2026',
    readTime: '4 min de lectura',
    author: 'José Antonio Cano',
    image: '13.jpg',
    excerpt: 'Reflexiones sobre la disciplina, el estudio directo y la vivencia en el corazón de China durante el proceso de certificación.',
    content: `Viajar a China para recibir la certificación directa de la mano de maestros como Helen y Karl fue un punto de inflexión en mi vida. En Beijing pude respirar la fuerza colectiva de campos de Qi consolidados por décadas de práctica ininterrumpida.

Allí comprendí que la técnica es solo el marco; la clave reside en la pureza de intención de la mente. El Zhineng Qigong no busca combatir la enfermedad, sino fortalecer la vida de tal manera que la desarmonía no encuentre espacio para permanecer.`
  },
  {
    id: 4,
    title: 'Levantar y Verter el Qi (Peng Qi Guan Ding Fa): El arte de reunir la vitalidad del entorno',
    category: 'Práctica',
    date: '10 de Octubre, 2026',
    readTime: '4 min de lectura',
    author: 'José Antonio Cano',
    image: '',
    excerpt: 'Conoce la estructura, intencionalidad y beneficios del método principal del Primer Nivel de Zhineng Qigong para interactuar con el Hunyuan Qi del universo.',
    content: `Dentro de los métodos que conforman el sistema de Zhineng Qigong, Peng Qi Guan Ding Fa (Levantar y Verter el Qi por la Cabeza) ocupa un lugar fundamental. Es el método principal del Primer Nivel de la disciplina y constituye la puerta de entrada para aprender a interactuar conscientemente con el Hunyuan Qi del universo.

A diferencia de prácticas que buscan únicamente mover el Qi interno por los meridianos, este método está diseñado para intercambiar información y Qi entre el micro-universo (el ser humano) y el macro-universo (la naturaleza y el espacio infinito).

La estructura del método: Movimiento e intencionalidad

El método combina movimientos corporales suaves y fluidos con una dirección mental muy precisa. No se trata de un ejercicio gimnástico; cada movimiento de las manos y el cuerpo tiene un correlato directo en el enfoque de la conciencia.

1. Abrir y Expandir (Kai): Las manos y la mente se dirigen hacia el espacio infinito. La mente se expande sin límites, conectando con el Hunyuan Qi puro del cosmos.

2. Juntar y Traer (He): La mente regresa hacia el interior del cuerpo, trayendo esa información de abundancia, salud y armonía hacia los centros energéticos (Dantian) y a cada órgano o tejido.

Mediante esta alternancia continua entre abrir y cerrar, expandir y concentrar, los poros, membranas y canales del cuerpo se abren, permitiendo que las obstrucciones se disuelvan de manera natural.

Beneficios de la práctica constante de Peng Qi Guan Ding Fa

La práctica regular de este método genera transformaciones profundas en el bienestar general:

- Restablecimiento del nivel energético: Ayuda a superar estados de agotamiento físico y cansancio acumulado.
- Fortalecimiento del sistema inmune: Al mejorar la circulación de Hunyuan Qi en todo el cuerpo, los mecanismos de autorregulación y defensa del organismo se optimizan.
- Flexibilidad y apertura corporal: Los movimientos suaves liberan articulaciones, columna vertebral y zonas de tensión acumulada.
- Claridad y serenidad mental: La sincronización entre la mente y el movimiento disipa la rumiación mental y aporta un profundo estado de tranquilidad.

Un método accesible para todas las etapas

Una de las grandes bondades de Peng Qi Guan Ding Fa es que puede ser adaptado a las condiciones de cualquier persona. Dado que el factor determinante es el trabajo mental y la dirección de la conciencia, el método puede practicarse de pie, sentado o incluso visualizado mentalmente en momentos de convalecencia.

Es una herramienta de autocuidado sumamente valiosa para integrar la vitalidad en nuestra vida cotidiana.`
  },
  {
    id: 5,
    title: 'La ciencia detrás del estado de presencia: ¿Cómo la mente guía al cuerpo en el Qigong?',
    category: 'Salud y Qi',
    date: '05 de Octubre, 2026',
    readTime: '4 min de lectura',
    author: 'José Antonio Cano',
    image: '',
    excerpt: 'Durante siglos se afirmó que la mente determina la salud del cuerpo. La neurociencia, la psiconeuroinmunología y la neuroplasticidad confirman hoy estos mismos principios.',
    content: `Durante siglos, las disciplinas de autocultivo oriental afirmaron que el estado de la mente determina la salud del cuerpo. Hoy en día, la ciencia occidental —a través de campos como la neurociencia, la psiconeuroinmunología y la neuroplasticidad— está redescubriendo y confirmando estos mismos principios.

En el Zhineng Qigong, el Dr. Pang Ming formuló una explicación científica y sistemática sobre este fenómeno a través de la Teoría de la Conciencia (YiyuanTi) y el principio fundamental: la mente guía al Qi.

El sistema nervioso y el estado de la mente

Cuando la mente experimenta estrés, prisa o ansiedad, el cerebro activa el sistema nervioso simpático, liberando hormonas como el cortisol y la adrenalina. Esto prepara al cuerpo para la lucha o la huida, contrayendo vasos sanguíneos, aumentando la frecuencia cardíaca y suspendiendo temporalmente las funciones de reparación celular e inmunológica.

Por el contrario, cuando enfocamos la mente en el presente y adoptamos una postura interior de quietud y respeto (Tiao Xin), el cerebro activa el sistema nervioso parasimpático. En este estado:

- La frecuencia cardíaca y la presión arterial se estabilizan.
- Se promueve la digestión, la regeneración celular y la respuesta inmune.
- La química cerebral cambia hacia un estado de equilibrio y recuperación.

La información como agente de cambio fisiológico

En la teoría del Zhineng Qigong, la mente no es algo abstracto fuera de la realidad corporal. La mente es el nivel más elevado de organización del Hunyuan Qi.

Cada pensamiento, intención o imagen mental emite una información específica. Si la información que enviamos al cuerpo es de preocupación, contracción o enfermedad, las células responden a esa señal. Si, por el contrario, mediante la práctica enfocada enviamos información de apertura, fluidez, armonía y salud, el cuerpo reorganiza sus procesos fisiológicos en respuesta a esa instrucción clara.

Neuroplasticidad y entrenamiento de la atención

El cerebro humano posee la capacidad de reconfigurar sus conexiones neuronales en función de las experiencias y los focos de atención repetidos (neuroplasticidad).

Practicar Zhineng Qigong es, en esencia, un entrenamiento avanzado de la atención y la conciencia. Al dirigir de manera consciente y repetida la mente hacia el interior del cuerpo o hacia el espacio infinito, fortalecemos las redes neuronales asociadas con la autorregulación emocional, la concentración y la percepción corporal (interocepción).

Un puente entre ciencia y experiencia personal

Zhineng Qigong demuestra que la mente no es una espectadora pasiva de la salud, sino la herramienta principal para transformarla. Entender este mecanismo nos devuelve la responsabilidad y la capacidad activa sobre nuestro propio bienestar integral.`
  }
];

const QUOTES = [
  "Hun Yuan Ling Tong: Todo el universo y nuestra conciencia están conectados en perfecta armonía.",
  "Relaja el cuerpo, expande la mente. Deja que el Qi fluya libremente por todo tu ser.",
  "Donde va tu mente, va el Qi. Dirige tu atención hacia la salud y la vitalidad.",
  "El campo de Qi nos nutre, nos fortalece y nos transforma en cada instante.",
  "La verdadera sanación comienza cuando la mente se aquieta y el Qi se unifica.",
  "Sonríe desde el corazón, relaja el entrecejo y permite que el universo trabaje en ti."
];

const MEDALS = [
  { id: 1, title: 'Iniciado en el Qi', reqMins: 900, desc: '15 horas (30 min x 30 días)', icon: Star },
  { id: 2, title: 'Buscador del Dao', reqMins: 1800, desc: '30 horas de práctica', icon: Compass },
  { id: 3, title: 'Mente Serena', reqMins: 3000, desc: '50 horas de práctica', icon: Brain },
  { id: 4, title: 'Corazón Puro', reqMins: 4500, desc: '75 horas de práctica', icon: Heart },
  { id: 5, title: 'Corriente Constante', reqMins: 6000, desc: '100 horas de práctica', icon: Activity },
  { id: 6, title: 'Fusión de los Centros', reqMins: 9000, desc: '150 horas de práctica', icon: Shield },
  { id: 7, title: 'Qi Abundante', reqMins: 12000, desc: '200 horas de práctica', icon: Smile },
  { id: 8, title: 'Cuerpo de Hunyuan', reqMins: 15000, desc: '250 horas de práctica', icon: Feather },
  { id: 9, title: 'Conciencia Expandida', reqMins: 18000, desc: '300 horas de práctica', icon: Sparkles },
  { id: 10, title: 'Maestría del Campo', reqMins: 30000, desc: '500 horas de práctica', icon: Sun }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const [activeTab, setActiveTab] = useState('home');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const userAlreadyRegistered = localStorage.getItem('qilife_user_registered');
    if (userAlreadyRegistered === 'true') {
      setIsRegistered(true);
    }
  }, []);

  const audioRef = useRef(null);

  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1140);
  const [timerMode, setTimerMode] = useState('meditation');
  const [laQiPhase, setLaQiPhase] = useState('Abrir (Kai)');

  const [journalEntries, setJournalEntries] = useState(() => {
    const saved = localStorage.getItem('qilife_journal_entries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('qilife_journal_entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  const [newNote, setNewNote] = useState('');
  const [newPracticeName, setNewPracticeName] = useState('Zu Chang Fa');
  const [newDuration, setNewDuration] = useState('15 min');

  const parseDurationToMinutes = (durationStr) => {
    if (durationStr === '1 hora') return 60;
    if (durationStr === '1 hora y media') return 90;
    if (durationStr === '2 horas') return 120;
    const match = durationStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const totalSesiones = journalEntries.length;
  const totalMinutos = journalEntries.reduce((acc, entry) => acc + parseDurationToMinutes(entry.duration), 0);
  const diasRacha = new Set(journalEntries.map(e => e.date)).size;

  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, author: 'María Carmen', date: 'Hace 2 días', content: 'Llevo 3 meses practicando Peng Qi Guan Ding Fa y mis dolores de espalda han desaparecido. ¡Gracias José Antonio por tu guía, el campo de Qi es real!', likes: 14 },
    { id: 2, author: 'Roberto S.', date: 'Hace 4 días', content: 'La práctica de La Qi me ha ayudado muchísimo a controlar mi ansiedad por las noches. La comunidad de Qilife me da mucha fortaleza. Hun Yuan Ling Tong.', likes: 9 }
  ]);
  const [newPost, setNewPost] = useState('');

  const [formData, setFormData] = useState({ nombre: '', email: '', whatsapp: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedBlogCategory, setSelectedBlogCategory] = useState('Todos');
  const [activeBlog, setActiveBlog] = useState(null);

  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: '¡Hola! Hun Yuan Ling Tong. Soy tu asistente inteligente de Zhineng Qigong. ¿Cómo te sientes física y emocionalmente el día de hoy?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const dailyQuoteIndex = Math.floor(Date.now() / 86400000) % QUOTES.length;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
        if (timerMode === 'laqi') {
          if (timerSeconds % 10 <= 5) {
            setLaQiPhase('Cerrar (He)');
          } else {
            setLaQiPhase('Abrir (Kai)');
          }
        }
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds, timerMode]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainSecs.toString().padStart(2, '0')}`;
  };

  const handleAddJournalEntry = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];

    const entry = {
      id: Date.now(),
      date: localISOTime,
      practice: newPracticeName,
      duration: newDuration,
      notes: newNote
    };
    setJournalEntries([entry, ...journalEntries]);
    setNewNote('');
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      author: formData.nombre || 'Practicante de Qi',
      date: 'Justo ahora',
      content: newPost,
      likes: 0
    };
    setCommunityPosts([post, ...communityPosts]);
    setNewPost('');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.nombre.trim() || formData.nombre.trim().length < 2) {
      setFormError('Por favor, ingresa tu nombre completo.');
      return;
    }
    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setFormError('El número de WhatsApp debe tener exactamente 10 dígitos (ej. 3312345678).');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Por favor, ingresa un correo electrónico válido (ej. correo@gmail.com).');
      return;
    }

    setIsSubmitting(true);
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzHiuRh4LmFmhw1YBZJwAEnMM9AzqD_ArYkiGquyDTU9tQemYe-GChiFRjXPIkMXlQugQ/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          whatsapp: cleanPhone,
          email: formData.email.trim()
        })
      });

      localStorage.setItem('qilife_user_registered', 'true');
      localStorage.setItem('qilife_user_email', formData.email.trim());
      setIsRegistered(true);
    } catch (error) {
      console.error("Error en registro:", error);
      setIsRegistered(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');
    setIsAiTyping(true);

    try {
      const response = await fetch('https://qilife-app-ten.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatMessages,
          userText: userText
        }),
      });
      const data = await response.json();
      if (data.reply) {
        setChatMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'ai', text: "Hun Yuan Ling Tong. Conectando nuevamente con el campo de Qi..." }]);
      }
    } catch (error) {
      console.error("Error al conectar con la IA:", error);
      setChatMessages(prev => [...prev, { role: 'ai', text: "El campo de Qi está en reposo. Por favor, realiza una respiración profunda e intenta nuevamente." }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const LockedContent = ({ title, isEsencialOnly = true }) => (
    <div className="max-w-2xl mx-auto text-center space-y-6 animate-fadeIn py-12 px-4">
      <div className="w-20 h-20 bg-red-100/80 dark:bg-red-950/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200 dark:border-red-800">
        <Lock className="w-10 h-10 text-red-800 dark:text-red-400" />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Acceso Reservado</h2>
      <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
        {isEsencialOnly ? (
          <>Contenido exclusivo para miembros del <strong>Plan Qilife Esencial</strong>. Suscríbete para acceder a {title} y completar tu formación en los métodos de Nivel 1.</>
        ) : (
          <>Contenido exclusivo para miembros del <strong>Plan Gratis</strong>. Regístrate sin costo para acceder a {title}.</>
        )}
      </p>
      <div className="pt-2">
        <button
          onClick={() => setActiveTab(isEsencialOnly ? 'esencial' : 'home')}
          className="px-8 py-3.5 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-950 text-white rounded-xl font-bold shadow-lg transition-transform transform hover:scale-105"
        >
          {isEsencialOnly ? 'Ver Detalle del Plan Esencial' : 'Ir a Registrarse Gratis'}
        </button>
      </div>
    </div>
  );

  const filteredBlogs = selectedBlogCategory === 'Todos'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(b => b.category === selectedBlogCategory);

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans flex flex-col selection:bg-red-200 selection:text-red-900 transition-colors duration-300">

      {/* HEADER / NAVEGACIÓN */}
      <header className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-red-100/60 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-3">

          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <img
              src="logo_qilife.png"
              alt="Qilife Logo"
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <h1 className="text-2xl font-black text-red-900 dark:text-red-400 tracking-tight font-serif">Qilife</h1>
              <p className="text-[9px] text-amber-700 dark:text-amber-400 font-bold tracking-widest uppercase">Zhineng Qigong</p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-1.5 bg-slate-50/80 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-red-100/80 dark:border-slate-700 shadow-inner">
            {[
              { id: 'home', label: 'Inicio' },
              { id: 'about_zq', label: '¿Qué es ZQ?' },
              { id: 'exercises', label: 'Métodos' },
              { id: 'gratis', label: 'Plan Gratis' },
              { id: 'esencial', label: 'Plan Esencial' },
              { id: 'blog', label: 'Blog' },
              { id: 'evolucion', label: 'Mi Progreso' },
              { id: 'instructor', label: 'Instructor' },
              { id: 'community', label: 'Comunidad' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeTab === tab.id
                  ? 'bg-red-800 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-red-900 dark:hover:text-red-400 hover:bg-red-50/60 dark:hover:bg-slate-800'
                  }`}
              >
                {tab.label}
              </button>
            ))}

            <button
              onClick={() => setActiveTab('ia')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 ${activeTab === 'ia' ? 'bg-amber-700 text-white shadow-md' : 'text-amber-800 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800'
                }`}
            >
              <Bot className="w-3.5 h-3.5" /> IA
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 ml-1"
            >
              {isDarkMode ? <><Sun className="w-3.5 h-3.5 text-amber-400" /> Claro</> : <><Moon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200" /> Oscuro</>}
            </button>
          </nav>

        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">

        {/* INICIO */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">

            <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl border border-red-100 dark:border-slate-700 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 rounded-full text-xs font-bold uppercase tracking-wider">
                  Da el primer paso
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight font-serif">
                  Comienza tu viaje en Zhineng Qigong
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                  Regístrate para recibir información y acceder al <strong>plan gratuito</strong>, donde desbloquearás la práctica interactiva de <strong>Zu Chang Fa</strong> y <strong>La Qi (audio guiado)</strong>.
                </p>
                <div className="flex items-center gap-4 pt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 100% Gratuito</span>
                  <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Sin Tarjeta</span>
                </div>
              </div>

              <div className="w-full lg:w-[380px] bg-gradient-to-b from-slate-50 to-red-50/30 dark:from-slate-900 dark:to-slate-800/80 p-6 rounded-2xl border border-red-100 dark:border-slate-700 shadow-inner">
                {isRegistered ? (
                  <div className="text-center py-6 space-y-4">
                    <UserCheck className="w-14 h-14 text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">¡Registro Completado!</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Has desbloqueado tus herramientas de práctica gratuita.</p>
                    <button onClick={() => setActiveTab('gratis')} className="w-full py-3 bg-red-800 hover:bg-red-900 text-white rounded-xl font-bold shadow-md transition-colors mt-2 text-sm">
                      Iniciar Práctica Zu Chang Fa y La Qi
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3.5">
                    {formError && (
                      <div className="p-2.5 bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 rounded-xl text-red-800 dark:text-red-300 text-xs font-semibold animate-fadeIn">
                        ⚠️ {formError}
                      </div>
                    )}

                    <div>
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Nombre Completo</label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={e => {
                          setFormData({ ...formData, nombre: e.target.value });
                          if (formError) setFormError('');
                        }}
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-600 bg-white text-sm"
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">WhatsApp (10 dígitos)</label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.whatsapp}
                        onChange={e => {
                          const cleanVal = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, whatsapp: cleanVal });
                          if (formError) setFormError('');
                        }}
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-600 bg-white text-sm"
                        placeholder="10 dígitos (ej. 3312345678)"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Correo Electrónico</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formError) setFormError('');
                        }}
                        className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-600 bg-white text-sm"
                        placeholder="tu@correo.com"
                      />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-3 mt-2 rounded-xl font-bold text-white bg-red-800 hover:bg-red-900 shadow-md flex justify-center items-center gap-2 transition-colors text-sm">
                      {isSubmitting ? 'Verificando y enviando...' : <><Unlock className="w-4 h-4" /> Regístrate Gratis</>}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-red-100 dark:border-slate-700 flex items-center gap-5">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 rounded-full flex items-center justify-center shrink-0 hidden sm:flex">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <p className="text-red-800 dark:text-red-400 font-bold text-xs uppercase tracking-widest mb-1">Reflexión del Día</p>
                <p className="text-slate-700 dark:text-slate-200 italic text-base sm:text-lg font-medium">"{QUOTES[dailyQuoteIndex]}"</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { tab: 'about_zq', title: '¿Qué es Zhineng Qigong?', desc: 'Conoce los principios científicos y filosóficos del Dr. Pang Ming.', icon: Info, color: 'text-amber-800 dark:text-amber-400', bg: 'bg-amber-100/70 dark:bg-amber-950/50' },
                { tab: 'exercises', title: 'Métodos Principales', desc: 'Aprende los movimientos de Zu Chang Fa, La Qi y Nivel 1.', icon: Activity, color: 'text-red-800 dark:text-red-400', bg: 'bg-red-100/70 dark:bg-red-950/50' },
                { tab: 'instructor', title: 'Acerca del Instructor', desc: 'Conoce a José Antonio Cano y su trayectoria en China.', icon: Users, color: 'text-rose-800 dark:text-rose-400', bg: 'bg-rose-100/70 dark:bg-rose-950/50' },
                { tab: 'community', title: 'Comunidad Activa', desc: 'Descubre historias reales de sanación y cambio vital.', icon: MessageSquare, color: 'text-amber-900 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-950/30' }
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTab(item.tab)}
                  className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-red-50 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-4 group-hover:bg-red-800 group-hover:text-white transition-colors`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 font-serif">{item.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-red-800 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                    <span>Explorar</span> <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-red-900 via-red-800 to-amber-900 rounded-3xl p-6 sm:p-8 shadow-md text-white flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer hover:shadow-lg transition-all" onClick={() => setActiveTab('esencial')}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 text-amber-300 fill-current" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif">Únete a Qilife Esencial</h3>
                  <p className="text-red-100 text-xs sm:text-sm mt-0.5">Accede a todos los métodos de Nivel 1, videoteca, audios de práctica extensos y acompañamiento.</p>
                </div>
              </div>
              <button className="px-6 py-2.5 bg-white text-red-900 font-bold rounded-xl shadow-sm hover:bg-amber-50 transition-colors whitespace-nowrap text-sm">
                Ver Plan Esencial
              </button>
            </div>
          </div>
        )}

        {/* ¿QUÉ ES ZQ? */}
        {activeTab === 'about_zq' && (
          <div className="space-y-10 animate-fadeIn max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <span className="px-3.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">Ciencia de la Conciencia</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 font-serif">¿Qué es Zhineng Qigong?</h2>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-red-100 dark:border-slate-700 space-y-5 leading-relaxed text-slate-700 dark:text-slate-300">
              <p className="text-base sm:text-lg font-serif text-red-950 dark:text-red-300 border-l-4 border-amber-600 pl-4 py-1 bg-amber-50/50 dark:bg-amber-950/30 rounded-r-xl">
                Zhineng Qigong es una ciencia del cultivo de la salud y la conciencia desarrollada en la década de 1980 por el <strong>Dr. Pang Ming</strong>, médico formado en medicina tradicional china y medicina occidental. El término se traduce como <em>"Qigong para el desarrollo de la inteligencia y la sabiduría"</em>.
              </p>

              <div className="text-sm space-y-4 text-slate-600 dark:text-slate-300">
                <p>
                  A diferencia de otras ramas tradicionales o formas de ejercicio puramente físico, Zhineng Qigong se fundamenta en la <strong>Teoría del Hunyuan Qi</strong>. Desde esta perspectiva, el Qi no es una "energía" intangible o mística, sino la sustancia fundamental del universo que integra tres aspectos: <strong>materia, energía e información (Xing, Qi, Shen)</strong>.
                </p>
                <p>
                  A través de movimientos suaves, posturas físicas y un trabajo mental enfocado (<em>Yi Nian</em>), la persona aprende a organizar y transformar el Qi interno y a conectar con el Hunyuan Qi del entorno, promoviendo la autorregulación natural del organismo y el desarrollo del potencial humano.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="px-3 py-1 bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-300 rounded-full text-xs font-bold uppercase tracking-wider">Impacto Integral</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif">¿Para qué sirve Zhineng Qigong?</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">La práctica regular actúa sobre tres niveles clave de la vida cotidiana:</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-red-50 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-400 rounded-2xl flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3 font-serif">Salud Física y Autorregulación</h4>
                    <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2"><span className="text-red-700 dark:text-red-400 font-bold">•</span><span>Mejora la movilidad articular, la flexibilidad y la postura corporal.</span></li>
                      <li className="flex items-start gap-2"><span className="text-red-700 dark:text-red-400 font-bold">•</span><span>Optimiza el funcionamiento del sistema inmunológico y nivela el estado energético general.</span></li>
                      <li className="flex items-start gap-2"><span className="text-red-700 dark:text-red-400 font-bold">•</span><span>Promueve la recuperación física y la prevención de enfermedades al equilibrar las funciones del cuerpo.</span></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-red-50 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-4">
                      <Brain className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3 font-serif">Claridad Mental y Gestión del Estrés</h4>
                    <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2"><span className="text-amber-700 dark:text-amber-400 font-bold">•</span><span>Calma el sistema nervioso, reduciendo progresivamente los niveles de ansiedad y fatiga mental.</span></li>
                      <li className="flex items-start gap-2"><span className="text-amber-700 dark:text-amber-400 font-bold">•</span><span>Aumenta la capacidad de concentración, el enfoque y la presencia en el momento presente.</span></li>
                      <li className="flex items-start gap-2"><span className="text-amber-700 dark:text-amber-400 font-bold">•</span><span>Favorece un descanso y un sueño más profundos y reparadores.</span></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-red-50 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-4">
                      <Smile className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-3 font-serif">Equilibrio Emocional y Conciencia</h4>
                    <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2"><span className="text-rose-700 dark:text-rose-400 font-bold">•</span><span>Ayuda a reconocer y regular las respuestas emocionales sin reaccionar de forma impulsiva.</span></li>
                      <li className="flex items-start gap-2"><span className="text-rose-700 dark:text-rose-400 font-bold">•</span><span>Desarrolla un estado interior de serenidad, paciencia y estabilidad (<em>Tiao Xin</em>).</span></li>
                      <li className="flex items-start gap-2"><span className="text-rose-700 dark:text-rose-400 font-bold">•</span><span>Aumenta la autoconciencia, facilitando una relación más armónica con uno mismo y con el entorno.</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-red-100 dark:border-slate-700 space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-serif flex items-center gap-2">
                <Compass className="w-6 h-6 text-red-800 dark:text-red-400" /> El Origen y el Linaje Directo
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Fundado por el Dr. Pang Ming, Zhineng Qigong demostró su efectividad médica en el famoso Centro Huaxia ("el hospital sin medicinas más grande del mundo").
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-slate-100 dark:bg-slate-900">
                  <img src="dr. pang y helen.jpg" alt="Dr. Pang Ming y Maestra Helen" className="w-full h-56 object-contain bg-slate-900" />
                  <div className="p-3 text-center bg-white dark:bg-slate-800">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">El Maestro Dr. Pang Ming con la Maestra Helen</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Fundador e instructora de Zhineng Qigong</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-slate-100 dark:bg-slate-900">
                  <img src="Celebrating the Chinese New Year with Teacher Pang....jpg" alt="Primera Generación de Maestros" className="w-full h-56 object-contain bg-slate-900" />
                  <div className="p-3 text-center bg-white dark:bg-slate-800">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Celebración con el Maestro Pang Ming</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Primera generación de instructores de Zhineng Qigong junto al maestro Pang Ming </p>
                  </div>
                </div>
              </div>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/m6bvURVDutU"
                  title="Aniversario del Centro Huaxia - Zhineng Qigong"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* MÉTODOS */}
        {activeTab === 'exercises' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-3 py-1 bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 rounded-full text-xs font-bold uppercase tracking-wider">Prácticas Oficiales</span>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif">Métodos Principales de Zhineng Qigong</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Aprende la secuencia ordenada de los métodos tradicionales creados para restaurar y potenciar la salud integral.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EXERCISES.map((ex, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-red-50 dark:border-slate-700 flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2.5 py-1 bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-300 rounded-full text-[10px] font-bold">{ex.level}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{ex.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-serif">{ex.title}</h3>
                  <p className="text-xs font-semibold text-red-800 dark:text-red-400 mt-1 mb-3">{ex.subtitle}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{ex.description}</p>

                  <div className="mb-4 bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Pasos Clave:</h4>
                    <ul className="space-y-1">
                      {ex.steps.map((st, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                          <span className="text-red-700 dark:text-red-400 font-bold">•</span> <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-700">
                    <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Beneficios:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {ex.benefits.map((b, i) => (
                        <span key={i} className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 rounded-lg text-[10px] font-medium">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLAN GRATIS */}
        {activeTab === 'gratis' && (
          !isRegistered ? (
            <LockedContent title="Práctica Gratuita (Zu Chang Fa y La Qi)" isEsencialOnly={false} />
          ) : (
            <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
              <div className="text-center space-y-2">
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider">Plan Gratuito</span>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif">Zu Chang Fa y La Qi</h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Sigue las instrucciones de la práctica guiada termina el ejercicio de principio a fin e intenta hacerlo lo mejor que puedas.</p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-red-50 dark:border-slate-700 text-center space-y-6">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => {
                      setTimerMode('meditation');
                      setTimerSeconds(1140);
                      setTimerActive(false);
                      if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${timerMode === 'meditation' ? 'bg-red-800 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                  >
                    Zu Chang Fa (19 min)
                  </button>
                  <button
                    onClick={() => {
                      setTimerMode('laqi');
                      setTimerSeconds(360);
                      setTimerActive(false);
                      if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${timerMode === 'laqi' ? 'bg-red-800 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                  >
                    La Qi (6 min)
                  </button>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-2xl border border-red-100 dark:border-slate-700 space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Headphones className="w-4 h-4 text-red-800 dark:text-red-400" />
                      Audio Guiado: {timerMode === 'meditation' ? '02-ZuchangFa_19min.mp3' : '05-La Qi_6min.mp3'}
                    </span>
                  </div>
                  <audio
                    ref={audioRef}
                    controls
                    className="w-full h-10 rounded-xl"
                    src={timerMode === 'meditation' ? 'audios/02-ZuchangFa_19min.mp3' : 'audios/05-La Qi_6min.mp3'}
                  >
                    Tu navegador no soporta la reproducción de audio.
                  </audio>
                </div>

                <div className="relative w-60 h-60 mx-auto flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-full bg-red-300/30 dark:bg-red-900/30 transition-all duration-5000 ease-in-out ${timerActive && timerMode === 'laqi' && laQiPhase === 'Abrir (Kai)' ? 'scale-125 opacity-50' : 'scale-90 opacity-20'}`} />
                  <div className={`w-44 h-44 rounded-full bg-gradient-to-tr from-red-900 to-amber-600 shadow-xl flex flex-col items-center justify-center text-white transition-all duration-5000 ease-in-out ${timerActive && timerMode === 'laqi' && laQiPhase === 'Abrir (Kai)' ? 'scale-105' : 'scale-95'}`}>
                    <Sparkles className="w-6 h-6 mb-1 animate-pulse text-amber-300" />
                    <span className="text-3xl font-black tracking-wider">{formatTime(timerSeconds)}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-100 mt-1">
                      {timerActive ? (timerMode === 'laqi' ? laQiPhase : 'Concentración') : 'Listo'}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() => {
                      if (!timerActive) {
                        setTimerActive(true);
                        if (audioRef.current) audioRef.current.play().catch(() => { });
                      } else {
                        setTimerActive(false);
                        if (audioRef.current) audioRef.current.pause();
                      }
                    }}
                    className={`px-8 py-3.5 rounded-2xl font-bold text-white shadow-md transition-transform hover:scale-105 flex items-center space-x-2 text-sm ${timerActive ? 'bg-amber-700 hover:bg-amber-800' : 'bg-red-800 hover:bg-red-900'}`}
                  >
                    {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{timerActive ? 'Pausar Práctica' : 'Comenzar Práctica'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setTimerActive(false);
                      setTimerSeconds(timerMode === 'meditation' ? 1140 : 360);
                      if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                      }
                    }}
                    className="p-3.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-2xl transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* PLAN ESENCIAL */}
        {activeTab === 'esencial' && (
          <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 rounded-full text-xs font-bold tracking-wider uppercase">Inmersión Nivel 1</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 font-serif">Plan Qilife Esencial</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Inmersión profunda en todos los métodos fundamentales de Zhineng Qigong con videoteca y audios extensos.</p>
            </div>

            <div className="bg-gradient-to-b from-red-900 via-red-800 to-amber-950 text-white rounded-3xl p-8 border-2 border-amber-500 shadow-xl relative flex flex-col justify-between max-w-2xl mx-auto">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                Recomendado
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 font-serif text-center">Plan Qilife Esencial</h3>
                <p className="text-red-100 text-xs mb-6 text-center">Para practicantes en búsqueda de profundización técnica y acompañamiento.</p>
                <div className="text-4xl font-black text-white mb-6 text-center">$15 <span className="text-xs text-amber-200 font-normal">/ mes</span></div>
                <ul className="space-y-3 mb-8 text-xs text-red-50">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-amber-400 mr-2.5" /> Todo lo incluido en el Plan Gratuito</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-amber-400 mr-2.5" /> Videoteca paso a paso (Nivel 1: Peng Qi Guan Ding Fa, Dun Qiang Fa y San Xin Bing Zhan Zhuang)</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-amber-400 mr-2.5" /> Biblioteca de Audios Extensos guiados por el instructor</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-amber-400 mr-2.5" /> Acompañamiento en grupo exclusivo de WhatsApp</li>
                </ul>
              </div>
              <button
                onClick={() => alert("Próximamente podrás suscribirte directamente vía Hotmart, Stripe o PayPal.")}
                className="w-full py-3.5 rounded-xl font-bold text-slate-900 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 shadow-md transition-transform transform hover:scale-105 flex items-center justify-center gap-2 text-xs"
              >
                <CreditCard className="w-4 h-4" /> Suscribirme a Qilife Esencial
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm text-center space-y-3">
                <Video className="w-10 h-10 text-red-800 dark:text-red-400 mx-auto" />
                <h4 className="font-bold text-slate-800 dark:text-slate-100 font-serif">Videoteca Guiada Nivel 1</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">Explicaciones postura por postura y correcciones comunes en video de alta definición.</p>
                <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-full text-[10px] font-bold">Incluido en Esencial</span>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm text-center space-y-3">
                <Headphones className="w-10 h-10 text-amber-700 dark:text-amber-400 mx-auto" />
                <h4 className="font-bold text-slate-800 dark:text-slate-100 font-serif">Audios Extensos de Práctica</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">Sesiones de 30 a 60 minutos con inducciones profundas de Hunyuan Qi para llevar a cabo en casa.</p>
                <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-full text-[10px] font-bold">Incluido en Esencial</span>
              </div>
            </div>
          </div>
        )}

        {/* BLOG */}
        {activeTab === 'blog' && (
          <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">Publicaciones</span>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif">Blog Qilife</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Artículos sobre salud energética, testimonios en China y filosofía del Zhineng Qigong.</p>
            </div>

            <div className="flex justify-center flex-wrap gap-2">
              {['Todos', 'Filosofía', 'Práctica', 'Salud y Qi'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedBlogCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedBlogCategory === cat
                    ? 'bg-red-800 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-slate-700'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredBlogs.map(blog => (
                <div key={blog.id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-red-50 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    {blog.image ? (
                      <div className="h-48 overflow-hidden bg-slate-900 relative flex items-center justify-center p-2">
                        <img src={blog.image} alt={blog.title} className="max-h-full max-w-full object-contain rounded-lg hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-3 right-3 px-2.5 py-1 bg-red-900/90 text-white rounded-full text-[10px] font-bold backdrop-blur-sm">{blog.category}</span>
                      </div>
                    ) : (
                      <div className="p-6 pb-2 flex justify-between items-center">
                        <span className="px-2.5 py-1 bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-300 rounded-full text-[10px] font-bold">{blog.category}</span>
                      </div>
                    )}

                    <div className="p-6 pt-3">
                      <p className="text-[10px] text-slate-400 font-bold mb-2.5 flex items-center gap-1.5 flex-wrap">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}</span>
                        <span>•</span>
                        <span>{blog.author}</span>
                      </p>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-2 font-serif leading-snug">{blog.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => setActiveBlog(blog)}
                      className="w-full py-2 bg-slate-50 dark:bg-slate-700 hover:bg-red-50 dark:hover:bg-slate-600 text-red-800 dark:text-red-300 rounded-xl text-xs font-bold transition-colors border border-slate-200 dark:border-slate-600"
                    >
                      Leer Artículo
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {activeBlog && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn">
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 rounded-full text-[10px] font-bold">{activeBlog.category}</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif leading-snug">{activeBlog.title}</h2>
                    <p className="text-xs text-slate-400 font-semibold flex items-center gap-2 flex-wrap">
                      <span>{activeBlog.date}</span>
                      <span>•</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">{activeBlog.readTime}</span>
                      <span>•</span>
                      <span>Autor: {activeBlog.author}</span>
                    </p>
                  </div>

                  {activeBlog.image && (
                    <div className="h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-700">
                      <img src={activeBlog.image} alt={activeBlog.title} className="max-h-full max-w-full object-contain rounded-xl" />
                    </div>
                  )}

                  <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-light">
                    {activeBlog.content}
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                    <button onClick={() => setActiveBlog(null)} className="px-6 py-2 bg-red-800 text-white rounded-xl font-bold text-xs">
                      Cerrar Lectura
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MI PROGRESO */}
        {activeTab === 'evolucion' && (
          <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">Bitácora Personal</span>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif">Mi Progreso en Zhineng Qigong</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Visualiza tus métricas de práctica constante y desbloquea medallas por tu dedicación al flujo de Qi.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Sesiones Totales', val: totalSesiones, icon: Activity, color: 'text-red-800 dark:text-red-400', bg: 'bg-red-100/60 dark:bg-red-950/50' },
                { label: 'Minutos Practicados', val: totalMinutos, icon: Clock, color: 'text-amber-800 dark:text-amber-400', bg: 'bg-amber-100/60 dark:bg-amber-950/50' },
                { label: 'Días de Racha', val: diasRacha, icon: TrendingUp, color: 'text-rose-800 dark:text-rose-400', bg: 'bg-rose-100/60 dark:bg-rose-950/50' }
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-full flex items-center justify-center mb-3`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">{stat.val}</h3>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-4 font-serif">Registrar Sesión y Sensaciones</h3>
                  <form onSubmit={handleAddJournalEntry} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Método</label>
                        <select value={newPracticeName} onChange={e => setNewPracticeName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-600 text-xs">
                          <option>Zu Chang Fa</option>
                          <option>La Qi</option>
                          <option>Peng Qi Guan Ding Fa</option>
                          <option>San Xin Bing Zhan Zhuang</option>
                          <option>Dun Qiang Fa</option>
                          <option>Cheng Qi</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Duración</label>
                        <select value={newDuration} onChange={e => setNewDuration(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-600 text-xs">
                          <option>10 min</option>
                          <option>15 min</option>
                          <option>20 min</option>
                          <option>30 min</option>
                          <option>45 min</option>
                          <option>1 hora</option>
                          <option>1 hora y media</option>
                          <option>2 horas</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Anotación sobre el Qi</label>
                      <textarea rows="2" value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="¿Qué cambios físicos o emocionales percibiste?" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-600 text-xs resize-none" />
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-red-800 hover:bg-red-900 text-white rounded-xl text-xs font-bold transition-colors">Guardar en Registro</button>
                  </form>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center font-serif"><BookOpen className="w-5 h-5 mr-2 text-red-800 dark:text-red-400" />Historial de Registro</h3>
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                    {journalEntries.length === 0 ? (
                      <p className="text-xs text-slate-400 italic text-center py-8">Aún no has registrado ninguna sesión. Agrega la primera arriba.</p>
                    ) : (
                      journalEntries.map(entry => (
                        <div key={entry.id} className="relative pl-6 border-l-2 border-red-100 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
                          <div className="absolute w-3 h-3 bg-red-700 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-slate-800"></div>
                          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
                            <div className="flex justify-between items-start mb-2">
                              <span className="px-2 py-0.5 bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-300 rounded-lg text-[10px] font-bold">{entry.practice}</span>
                              <span className="text-[10px] text-slate-400 flex gap-2"><Calendar className="w-3 h-3" />{entry.date} <Clock className="w-3 h-3" />{entry.duration}</span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">{entry.notes}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center font-serif">
                  <Award className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" /> Medallas de Constancia
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Continúa sumando minutos en tu bitácora para ir desbloqueando los niveles de la práctica.</p>

                <div className="grid grid-cols-2 gap-4">
                  {MEDALS.map(medal => {
                    const isUnlocked = totalMinutos >= medal.reqMins;
                    const Icon = medal.icon;
                    return (
                      <div key={medal.id} className={`relative p-4 rounded-2xl border ${isUnlocked ? 'border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20' : 'border-slate-100 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50'} flex flex-col items-center text-center transition-all`}>
                        {!isUnlocked && (
                          <div className="absolute top-2 right-2 text-slate-300 dark:text-slate-600">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-inner ${isUnlocked ? 'bg-gradient-to-br from-amber-300 to-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h4 className={`text-[11px] font-bold uppercase tracking-wide mb-1 ${isUnlocked ? 'text-amber-900 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
                          {medal.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{medal.desc}</p>

                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${isUnlocked ? 'bg-emerald-500' : 'bg-amber-400'}`}
                            style={{ width: `${Math.min((totalMinutos / medal.reqMins) * 100, 100)}%` }}
                          />
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 mt-1">{Math.min(totalMinutos, medal.reqMins)} / {medal.reqMins} min</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INSTRUCTOR */}
        {activeTab === 'instructor' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-red-50 dark:border-slate-700 flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 rounded-full overflow-hidden shrink-0 shadow-lg border-4 border-red-100 dark:border-slate-700 bg-slate-100">
                <img src="jose_practicando.jpg" alt="José Antonio Cano Practicando" className="w-full h-full object-contain bg-slate-900" />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <div>
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">Instructor Certificado</span>
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif mt-2">José Antonio Cano</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Con formación directa en Beijing y el linaje original de los discípulos de la primera generación del Dr. Pang Ming, mi vocación es transmitir la esencia del Zhineng Qigong de forma pura, accesible e integradora.
                </p>
                <p className="text-xs text-red-900 dark:text-red-400 italic font-serif">
                  "El verdadero maestro se despierta cuando el alumno conecta con la fuente inagotable de su propio Hunyuan Qi."
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-red-50 dark:border-slate-700 space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-serif flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-700 dark:text-amber-400" /> Certificación y Linaje en China
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Imágenes de la graduación con los Maestros Karl y Helen, y la estancia de estudio en Beijing.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-slate-900">
                  <img src="16.jpg" alt="Entrega de Certificación con Maestros Karl y Helen" className="w-full h-48 object-contain" />
                  <div className="p-3 bg-white dark:bg-slate-800">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Certificación de Instructor</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Junto a los Maestros Karl y Helen en China</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-slate-900">
                  <img src="15.jpg" alt="Graduación de Zhineng Qigong" className="w-full h-48 object-contain" />
                  <div className="p-3 bg-white dark:bg-slate-800">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Graduación y Reconocimiento</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Formación directa en los métodos avanzados</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-slate-900">
                  <img src="13.jpg" alt="Estancia de Formación en Beijing" className="w-full h-48 object-contain" />
                  <div className="p-3 bg-white dark:bg-slate-800">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Estancia en Beijing</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Práctica e inmersión en la Ciudad Prohibida</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMUNIDAD */}
        {activeTab === 'community' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="px-3 py-1 bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 rounded-full text-xs font-bold uppercase tracking-wider">Campo Colectivo</span>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif">Comunidad Activa Qilife</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Comparte tus avances, testimonios y percepciones con otros practicantes de la red.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-red-50 dark:border-slate-700">
              <form onSubmit={handleAddPost} className="flex gap-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-400 rounded-full flex items-center justify-center font-bold shrink-0">
                  {formData.nombre ? formData.nombre.charAt(0).toUpperCase() : 'P'}
                </div>
                <div className="flex-1 space-y-3">
                  <textarea
                    value={newPost}
                    onChange={e => setNewPost(e.target.value)}
                    placeholder="¿Qué cambios positivos has experimentado con tu práctica de Qi?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-600 text-xs resize-none"
                    rows="3"
                  />
                  <button type="submit" disabled={!newPost.trim()} className="px-6 py-2 bg-red-800 text-white rounded-xl shadow-md hover:bg-red-900 disabled:opacity-50 font-bold text-xs">
                    Publicar Testimonio
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-4">
              {communityPosts.map(post => (
                <div key={post.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex gap-4">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full flex items-center justify-center font-bold shrink-0">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-800 dark:text-slate-100 text-xs">{post.author}</span>
                      <span className="text-[10px] text-slate-400">• {post.date}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed mb-3">{post.content}</p>
                    <button className="flex items-center gap-1 text-[11px] font-bold text-red-800 dark:text-red-400 hover:text-red-950 transition-colors">
                      <Heart className="w-3.5 h-3.5" /> {post.likes} Me gusta
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ASISTENTE IA */}
        {activeTab === 'ia' && (
          !isRegistered ? (
            <LockedContent title="el Asistente de IA" isEsencialOnly={false} />
          ) : (
            <div className="max-w-3xl mx-auto h-[580px] flex flex-col bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-red-50 dark:border-slate-700 overflow-hidden animate-fadeIn">
              <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-4 flex items-center gap-3 shadow-sm z-10">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0"><Bot className="w-6 h-6" /></div>
                <div>
                  <h3 className="font-bold text-sm font-serif">Asistente Zhineng Qigong (IA)</h3>
                  <p className="text-[10px] text-red-100">Guía personalizada inspirada en las enseñanzas del Dr. Pang Ming</p>
                </div>
              </div>

              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/60 dark:bg-slate-900/60">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${msg.role === 'user' ? 'bg-red-800 text-white rounded-br-none' : 'bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 text-slate-700 dark:text-slate-100 rounded-bl-none text-xs'}`}>
                      <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1.5">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                <form onSubmit={handleSendChatMessage} className="flex gap-2">
                  <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Escribe tu consulta sobre la práctica..." className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-600 text-xs" />
                  <button type="submit" disabled={!chatInput.trim() || isAiTyping} className="px-4 py-2.5 bg-red-800 text-white rounded-xl shadow-md hover:bg-red-900 disabled:opacity-50 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )
        )}
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t border-red-100 dark:border-slate-700 py-6 text-center text-xs text-slate-500 dark:text-slate-400 mt-auto">
        <p className="font-serif text-slate-700 dark:text-slate-300">Qilife • Ciencia de la Conciencia y el Qi (混元灵通)</p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Instructor José Antonio Cano — Formación e Inmersión en el Beijing Wisdom Healing Center, China</p>
      </footer>
    </div>
  );
}