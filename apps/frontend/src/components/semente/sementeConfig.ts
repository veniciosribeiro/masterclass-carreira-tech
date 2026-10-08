export const WEBINAR_DATE_LABEL_1 = 'WEBINÁRIO GRATUITO PARA DESENVOLVEDORES';
export const WEBINAR_DATE_LABEL_2 = 'ao vivo • 15 de outubro • 20h';
export const WEBINAR_COMMUNITY_LINK =
  'https://chat.whatsapp.com/HnRvQdjQoc6D8xu6rj3R98';

// Pesquisa com inscritos (Formbricks). O e-mail e o nome entram como respostas
// pré-preenchidas das duas primeiras perguntas (IDs abaixo), para ligar cada
// resposta ao lead. Nunca vão na URL da página de obrigado: essa URL é lida
// pelo Pixel e iria parar na Meta com dado pessoal.
const SURVEY_BASE_URL =
  'https://survey.foconoobjetivo.com/s/cmuoad5ok000901pds4kurc2k';
const SURVEY_EMAIL_QUESTION_ID = 'ys8rmlszunb5hy4zzu9u9rq2';
const SURVEY_NAME_QUESTION_ID = 'dm8cj9csdv7ifx88loxwub2r';

// Chave do sessionStorage em que o formulário deixa o lead recém-inscrito
// para a página de obrigado (a navegação entre elas é uma recarga completa).
export const SEMENTE_LEAD_STORAGE_KEY = 'semente_lead';

export function buildSurveyUrl(name: string, email: string): string {
  const params = new URLSearchParams({
    [SURVEY_EMAIL_QUESTION_ID]: email,
    [SURVEY_NAME_QUESTION_ID]: name,
    nome: name,
  });
  return `${SURVEY_BASE_URL}?${params.toString()}`;
}
