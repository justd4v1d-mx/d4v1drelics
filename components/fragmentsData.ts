/* Definition for log entries to ensure data integrity */
export interface FragmentEntry {
  id: number;
  date: string;
  title: string;
  category: 'Log' | 'Dev' | 'Med' | 'Research' | 'Other';
  content: string;
}

export const fragments: FragmentEntry[] = [
  {
    id: 10,
    date: "2026.04.17",
    title: "Nice try i think",
    category: "Med",
    content: "Bioqimica me pego una arrastrada hoy ",
  },
  {
    id: 9,
    date: "2026.04.16",
    title: "Amo esos ojos que no me dejan dormir",
    category: "Other",
    content: "Esos ojos que me miran y me hacen sentir vivo, esos ojos que me hipnotizan y me hacen perder la noción del tiempo, esos ojos que me hacen soñar despierto y me llenan de esperanza, esos ojos que me hacen sentir amado y protegido, esos ojos que me hacen sentir completo y feliz."
  },
  {
    id: 8,
    date: "2026.04.15",
    title: "Vivo si me exiges <3",
    category: "Other",
    content:"Dime si tu estas contigo, estas aqui?"
  },
  { 
    id: 7,
    date: "2026.04.14",
    title: "Sueños",
    category: "Other",
    content: "Es increible como los sueños te pueden llevar a tanto pero son tan debiles y efimeros a la vez, son similares al 'fuego' pero de un momento a otro es como si se acabara el O2 y se fuera todo a la chingada."
  },
  {
    id: 6,
    date: "2026.04.14",
    title: "PPP",
    category: "Other",
    content: "y si tu me pides la dejo w"
  },
  {
    id: 5,
    date: "2026.04.13",
    title: "Adenosin Mono Fosfato (AMP)",
    category: "Other",
    content: "Sera que AMP? ya que bby somos soulmates pero no de la cabeza"
  } , 
  {
    id: 4,
    date: "2026.04.13",
    title: "Inicio de clases de nuevo",
    category: "Med",
    content: "Despues de este breve descanso de la medicina volvemos a la rutina"
    },
  {
    id: 3,
    date: "2026.04.10",
    title: "Gravitacional Shader v1",
    category: "Dev",
    content: "Inicio de el dev referente a las fisicas y aspecto del fondo del proyecto, creando un shader que simula un efecto gravitacional con distorsión y partículas, buscando lograr una atmósfera envolvente y misteriosa."
  },
  {
    id: 2,
    date: "2026.03.15",
    title: "Inicio del dev de relyquary",
    category: "Dev",
    content: "Realizo una lluvia de idas para definir las características principales de d4v1d reliquary. Decido enfocarme en una experiencia inmersiva que combine arte, música y tecnología, creando un espacio digital que refleje mi visión creativa."
  },
  {
    id: 1,
    date: "2026.02.21",
    title: "Reajuste de parametros personales",
    category: "Log",
    content: "Redefiniendo el enfoque de mi vida. En lugar de perseguir metas externas, me concentro en moldear mi mente y hábitos. Cada día es una oportunidad para reprogramar mi cerebro, cultivando pensamientos y acciones que reflejen la persona que deseo ser."
  }
];