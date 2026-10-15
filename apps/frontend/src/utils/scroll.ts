/**
 * Rola suavemente até uma seção específica da página
 * @param sectionId - ID do elemento HTML de destino
 *
 * As seções abaixo da dobra usam content-visibility: auto (classe
 * `defer-render`), cuja altura é só uma estimativa até serem renderizadas: uma
 * rolagem suave por cima delas termina antes do alvo. Antes de rolar, a
 * classe `render-all` no <html> faz todas renderizarem de verdade.
 */
export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    document.documentElement.classList.add('render-all');
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
