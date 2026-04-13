/* Definition for log entries to ensure data integrity */
export interface FragmentEntry {
  id: number;
  date: string;
  title: string;
  category: 'Log' | 'Dev' | 'Med' | 'Research';
  content: string;
}

export const fragments: FragmentEntry[] = [
    {
    id: 4,
    date: "2026.05.01",
    title: "Inicio de clases de nuevo",
    category: "Med",
    content: "Despues de este breve descanso de la medicina volvemos a la rutina :)"
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
    title: "Neuro-Plasticidad",
    category: "Log",
    content: "Redefiniendo el enfoque de mi vida. En lugar de perseguir metas externas, me concentro en moldear mi mente y hábitos. Cada día es una oportunidad para reprogramar mi cerebro, cultivando pensamientos y acciones que reflejen la persona que deseo ser."
  }
];