// Política de Privacidade: caminho, versão e controlador num lugar só. A versão
// vai junto de cada aceite do formulário (webinar_registrations), então mude-a
// sempre que o texto da política mudar.
export const PRIVACY_POLICY_PATH = '/politica-de-privacidade';
export const PRIVACY_POLICY_VERSION = '2026-10-14';
export const PRIVACY_POLICY_UPDATED_LABEL = '14 de outubro de 2026';

// Controladora é a empresa que vende e fatura (a mesma do rodapé de "/"), não
// quem assina o contrato da VPS: o provedor de hospedagem é só operador.
export const PRIVACY_CONTROLLER = {
  name: 'Media Labs',
  document: 'CNPJ 16.577.628/0001-94',
  dpo: 'Venicios Ribeiro',
  email: 'contato@foconoobjetivo.com',
};
