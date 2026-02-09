/**
 * Rola suavemente até uma seção específica da página
 * @param sectionId - ID do elemento HTML de destino
 */
export const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
