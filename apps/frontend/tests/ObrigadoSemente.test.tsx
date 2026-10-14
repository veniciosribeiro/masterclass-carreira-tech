import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ObrigadoSemente } from '../src/components/semente/ObrigadoSemente';
import {
  SEMENTE_LEAD_STORAGE_KEY,
  WEBINAR_COMMUNITY_LINK,
  buildSurveyUrl,
} from '../src/components/semente/sementeConfig';

vi.mock('../src/components/analytics/MetaPixel', () => ({
  MetaPixel: () => null,
}));

const renderizar = () =>
  render(
    <MemoryRouter>
      <ObrigadoSemente />
    </MemoryRouter>
  );

describe('página de obrigado do webinário', () => {
  it('com o lead na sessão mostra o link personalizado da pesquisa e o do grupo', () => {
    sessionStorage.setItem(
      SEMENTE_LEAD_STORAGE_KEY,
      JSON.stringify({ name: 'Maria Silva', email: 'maria@exemplo.com' })
    );
    renderizar();
    const pesquisa = screen.getByRole('link', { name: 'Responder agora' });
    expect(pesquisa).toHaveAttribute(
      'href',
      buildSurveyUrl('Maria Silva', 'maria@exemplo.com')
    );
    expect(pesquisa).toHaveAttribute('target', '_blank');
    expect(pesquisa.getAttribute('rel')).toContain('noopener');
    expect(
      screen.getByRole('link', { name: 'Entrar no Grupo' })
    ).toHaveAttribute('href', WEBINAR_COMMUNITY_LINK);
  });

  it('sem lead na sessão (acesso direto) omite a pesquisa e destaca o grupo', () => {
    renderizar();
    expect(
      screen.queryByRole('link', { name: 'Responder agora' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('Entre no grupo agora')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Entrar no Grupo' })
    ).toHaveAttribute('href', WEBINAR_COMMUNITY_LINK);
  });

  it('lead incompleto ou corrompido na sessão não quebra a página nem gera link vazio', () => {
    sessionStorage.setItem(
      SEMENTE_LEAD_STORAGE_KEY,
      JSON.stringify({ name: 'Maria Silva' })
    );
    renderizar();
    expect(
      screen.queryByRole('link', { name: 'Responder agora' })
    ).not.toBeInTheDocument();
  });

  it('JSON inválido na sessão também é tolerado', () => {
    sessionStorage.setItem(SEMENTE_LEAD_STORAGE_KEY, '{nao-e-json');
    renderizar();
    expect(
      screen.getByRole('link', { name: 'Entrar no Grupo' })
    ).toBeInTheDocument();
  });

  it('nome e e-mail não aparecem na URL da página (a URL é lida pelo Pixel)', () => {
    sessionStorage.setItem(
      SEMENTE_LEAD_STORAGE_KEY,
      JSON.stringify({ name: 'Maria Silva', email: 'maria@exemplo.com' })
    );
    renderizar();
    expect(window.location.href).not.toMatch(/maria|silva/i);
  });
});
