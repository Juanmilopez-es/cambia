/**
 * LIFE RESET PROTOCOL - Frases de Sabiduría
 * Citas de Naval Ravikant, Joe Dispenza y el Protocolo
 */

import type { WisdomQuote } from '../types';

// Re-exportar el tipo para uso externo
export type { WisdomQuote } from '../types';

export const navalQuotes: WisdomQuote[] = [
  {
    text: 'La impaciencia con las acciones, paciencia con los resultados.',
    author: 'Naval',
  },
  {
    text: 'El deseo es un contrato que haces contigo mismo para ser infeliz hasta que consigas lo que quieres.',
    author: 'Naval',
  },
  {
    text: 'La riqueza es tener activos que ganan mientras duermes.',
    author: 'Naval',
  },
  {
    text: 'No puedes ser feliz si estás optimizando para algo más que la paz mental.',
    author: 'Naval',
  },
  {
    text: 'El apalancamiento viene del capital, del código, de la gente, y de los medios sin permiso.',
    author: 'Naval',
  },
  {
    text: 'Aprende a vender. Aprende a construir. Si puedes hacer ambas cosas, serás imparable.',
    author: 'Naval',
  },
  {
    text: 'El conocimiento específico se encuentra persiguiendo tu curiosidad genuina.',
    author: 'Naval',
  },
  {
    text: 'Un cuerpo en forma, una mente calmada, una casa llena de amor. Estas cosas no se pueden comprar.',
    author: 'Naval',
  },
  {
    text: 'Los fundamentos de las cosas son más importantes que cualquier otra cosa.',
    author: 'Naval',
  },
  {
    text: 'La felicidad es una habilidad. Es algo que desarrollas y trabajas.',
    author: 'Naval',
  },
  {
    text: 'Juega juegos iterados. Toda la ganancia de la vida viene del interés compuesto.',
    author: 'Naval',
  },
  {
    text: 'Elige la industria donde puedas jugar juegos a largo plazo con personas de largo plazo.',
    author: 'Naval',
  },
  {
    text: 'Trabaja tan duro como puedas. Aunque con quién trabajas y en qué trabajas importa más.',
    author: 'Naval',
  },
  {
    text: 'Arma a tus compañeros de equipo con la información que necesitan para tomar decisiones por su cuenta.',
    author: 'Naval',
  },
  {
    text: 'No busques la riqueza. Busca la libertad. La riqueza es solo un subproducto.',
    author: 'Naval',
  },
];

export const dispenzaQuotes: WisdomQuote[] = [
  {
    text: 'Tu personalidad crea tu realidad personal. Para crear una nueva realidad personal, necesitas una nueva personalidad.',
    author: 'Dispenza',
  },
  {
    text: 'Donde pones tu atención, pones tu energía. Donde pones tu energía, creas tu vida.',
    author: 'Dispenza',
  },
  {
    text: 'El momento presente es el único punto donde puedes cambiar tu futuro.',
    author: 'Dispenza',
  },
  {
    text: 'Tus pensamientos son el lenguaje del cerebro. Tus emociones son el lenguaje del cuerpo.',
    author: 'Dispenza',
  },
  {
    text: 'Para cambiar, debes ser mayor que tu entorno, tu cuerpo y el tiempo.',
    author: 'Dispenza',
  },
  {
    text: 'El 95% del día funcionamos en piloto automático. El cambio real requiere consciencia activa.',
    author: 'Dispenza',
  },
  {
    text: 'Cuando combinas una intención clara con una emoción elevada, produces un nuevo estado del ser.',
    author: 'Dispenza',
  },
  {
    text: 'La meditación es el ensayo mental de tu futuro. Ensaya quién vas a ser antes de serlo.',
    author: 'Dispenza',
  },
  {
    text: 'El estrés es tratar de controlar lo incontrolable. Suelta y confía en el proceso.',
    author: 'Dispenza',
  },
  {
    text: 'Si quieres un nuevo resultado, tendrás que romper el hábito de ser tú mismo.',
    author: 'Dispenza',
  },
];

export const protocolQuotes: WisdomQuote[] = [
  {
    text: 'No haces cosas. Confirmas quién eres.',
    author: 'Protocol',
  },
  {
    text: 'El dolor de la disciplina pesa gramos. El dolor del arrepentimiento pesa toneladas.',
    author: 'Protocol',
  },
  {
    text: 'La visión sin acción es un sueño. La acción sin visión es una pesadilla.',
    author: 'Protocol',
  },
  {
    text: 'Tu Anti-Visión es tu combustible. Tu Visión es tu destino.',
    author: 'Protocol',
  },
  {
    text: 'Cada día es un Boss Fight. Cada tarea completada es un golpe al enemigo.',
    author: 'Protocol',
  },
  {
    text: 'Los hábitos son el algoritmo de la identidad.',
    author: 'Protocol',
  },
  {
    text: 'El piloto automático te lleva al pasado. La consciencia te lleva al futuro.',
    author: 'Protocol',
  },
  {
    text: 'No esperes motivación. Actúa primero, la motivación vendrá después.',
    author: 'Protocol',
  },
  {
    text: 'Un día perfecto al día cambia tu vida en un año.',
    author: 'Protocol',
  },
  {
    text: 'El mejor momento para empezar fue ayer. El segundo mejor momento es ahora.',
    author: 'Protocol',
  },
];

// Combinar todas las citas
export const allQuotes: WisdomQuote[] = [
  ...navalQuotes,
  ...dispenzaQuotes,
  ...protocolQuotes,
];

/**
 * Obtener una cita aleatoria
 */
export const getRandomQuote = (): WisdomQuote => {
  const randomIndex = Math.floor(Math.random() * allQuotes.length);
  return allQuotes[randomIndex];
};

/**
 * Obtener una cita aleatoria de un autor específico
 */
export const getRandomQuoteByAuthor = (author: WisdomQuote['author']): WisdomQuote => {
  const authorQuotes = allQuotes.filter((q) => q.author === author);
  const randomIndex = Math.floor(Math.random() * authorQuotes.length);
  return authorQuotes[randomIndex];
};

/**
 * Obtener múltiples citas aleatorias sin repetir
 */
export const getRandomQuotes = (count: number): WisdomQuote[] => {
  const shuffled = [...allQuotes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
