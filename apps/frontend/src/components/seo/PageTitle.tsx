import { useEffect } from 'react';

interface PageTitleProps {
  title: string;
}

/**
 * Ajusta o título da aba do navegador para a página atual.
 * Necessário porque a SPA tem uma única index.html — sem isso,
 * todas as rotas mostram o mesmo <title> estático.
 */
export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};
