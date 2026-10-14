import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SementeForm } from '../src/components/semente/SementeForm';
import { SEMENTE_LEAD_STORAGE_KEY } from '../src/components/semente/sementeConfig';
import { PRIVACY_POLICY_VERSION } from '../src/utils/privacyPolicy';
import { registerForWebinar } from '../src/services/apiClient';
import { getExternalId, sendEvent } from '../src/utils/metaPixel';

vi.mock('../src/services/apiClient', () => ({ registerForWebinar: vi.fn() }));
vi.mock('../src/utils/metaPixel', () => ({
  getExternalId: vi.fn(),
  sendEvent: vi.fn(),
}));

const assign = vi.fn();
const originalLocation = window.location;

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      ...originalLocation,
      assign,
      href: 'https://site.teste/webinario-carreira-tech',
    },
  });
  vi.mocked(getExternalId).mockResolvedValue('ext-1');
  vi.mocked(registerForWebinar).mockResolvedValue({ registered: true });
  vi.mocked(sendEvent).mockResolvedValue({ eventID: 'ev-1' });
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterEach(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: originalLocation,
  });
  assign.mockReset();
});

const campos = () => ({
  nome: screen.getByPlaceholderText('Seu nome'),
  email: screen.getByPlaceholderText('Seu melhor e-mail'),
  aceite: screen.getByRole('checkbox'),
  enviar: screen.getByRole('button'),
});

async function preencher(
  user: ReturnType<typeof userEvent.setup>,
  nome: string,
  email: string,
  aceitar = true
) {
  const c = campos();
  await user.type(c.nome, nome);
  await user.type(c.email, email);
  if (aceitar) await user.click(c.aceite);
}

describe('SementeForm (inscrição no webinário)', () => {
  it('mostra a caixa de aceite desmarcada, obrigatória e com o link da política', () => {
    render(<SementeForm />);
    const { aceite } = campos();
    expect(aceite).not.toBeChecked();
    expect(aceite).toBeRequired();
    const link = screen.getByRole('link', { name: 'Política de Privacidade' });
    expect(link).toHaveAttribute('href', '/politica-de-privacidade');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('sem marcar o aceite não envia nada', async () => {
    const user = userEvent.setup();
    render(<SementeForm />);
    await preencher(user, 'Maria Silva', 'maria@exemplo.com', false);
    await user.click(campos().enviar);
    expect(registerForWebinar).not.toHaveBeenCalled();
    expect(sendEvent).not.toHaveBeenCalled();
    expect(assign).not.toHaveBeenCalled();
  });

  it('com aceite: cadastra com nome/e-mail aparados, external_id, aceite e versão da política', async () => {
    const user = userEvent.setup();
    render(<SementeForm />);
    await preencher(user, '  Maria Silva  ', '  Maria@Exemplo.com ');
    await user.click(campos().enviar);
    await waitFor(() => expect(assign).toHaveBeenCalled());
    expect(registerForWebinar).toHaveBeenCalledWith(
      'Maria Silva',
      'Maria@Exemplo.com',
      'ext-1',
      {
        marketingConsent: true,
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      }
    );
  });

  it('dispara o Lead (R$ 0, BRL, origem do webinário) com a URL da página do formulário', async () => {
    const user = userEvent.setup();
    render(<SementeForm />);
    await preencher(user, 'Maria Souza Silva', 'Maria@Exemplo.com');
    await user.click(campos().enviar);
    await waitFor(() => expect(assign).toHaveBeenCalled());
    expect(sendEvent).toHaveBeenCalledWith(
      'Lead',
      { value: 0, currency: 'BRL', source: 'webinar_semente' },
      {
        eventSourceUrl: 'https://site.teste/webinario-carreira-tech',
        userData: {
          em: 'maria@exemplo.com',
          full_name: 'Maria Souza Silva',
          fn: 'Maria',
          ln: 'Silva',
        },
      }
    );
  });

  it('nome de uma palavra só: envia fn e não envia sobrenome', async () => {
    const user = userEvent.setup();
    render(<SementeForm />);
    await preencher(user, 'Madonna', 'm@exemplo.com');
    await user.click(campos().enviar);
    await waitFor(() => expect(assign).toHaveBeenCalled());
    const userData = vi.mocked(sendEvent).mock.calls[0][2]!.userData!;
    expect(userData).toMatchObject({ fn: 'Madonna' });
    expect(userData).not.toHaveProperty('ln');
  });

  it('cadastra primeiro e só então dispara o Lead; depois vai para a página de obrigado', async () => {
    const ordem: string[] = [];
    vi.mocked(registerForWebinar).mockImplementation(async () => {
      ordem.push('cadastro');
      return { registered: true };
    });
    vi.mocked(sendEvent).mockImplementation(async () => {
      ordem.push('lead');
      return { eventID: 'e' };
    });
    assign.mockImplementation(() => {
      ordem.push('navegar');
    });
    const user = userEvent.setup();
    render(<SementeForm />);
    await preencher(user, 'Maria Silva', 'maria@exemplo.com');
    await user.click(campos().enviar);
    await waitFor(() =>
      expect(assign).toHaveBeenCalledWith('/webinario-carreira-tech/obrigado')
    );
    expect(ordem).toEqual(['cadastro', 'lead', 'navegar']);
  });

  it('deixa nome e e-mail na sessão para a página de obrigado montar o link da pesquisa', async () => {
    const user = userEvent.setup();
    render(<SementeForm />);
    await preencher(user, 'Maria Silva', 'maria@exemplo.com');
    await user.click(campos().enviar);
    await waitFor(() => expect(assign).toHaveBeenCalled());
    expect(
      JSON.parse(sessionStorage.getItem(SEMENTE_LEAD_STORAGE_KEY)!)
    ).toEqual({ name: 'Maria Silva', email: 'maria@exemplo.com' });
  });

  it('Lead lento não trava o usuário: navega em até ~1,5 s mesmo sem resposta', async () => {
    vi.mocked(sendEvent).mockReturnValue(new Promise(() => undefined));
    const user = userEvent.setup();
    render(<SementeForm />);
    await preencher(user, 'Maria Silva', 'maria@exemplo.com');
    const inicio = Date.now();
    await user.click(campos().enviar);
    await waitFor(() => expect(assign).toHaveBeenCalled(), { timeout: 4000 });
    expect(Date.now() - inicio).toBeGreaterThanOrEqual(1400);
  });

  it('sessionStorage indisponível não impede a inscrição de seguir', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage bloqueado');
    });
    const user = userEvent.setup();
    render(<SementeForm />);
    await preencher(user, 'Maria Silva', 'maria@exemplo.com');
    await user.click(campos().enviar);
    await waitFor(() =>
      expect(assign).toHaveBeenCalledWith('/webinario-carreira-tech/obrigado')
    );
  });

  it('erro no cadastro: mostra a mensagem, reabilita o botão, não dispara Lead nem navega', async () => {
    vi.mocked(registerForWebinar).mockRejectedValue(new Error('500'));
    const user = userEvent.setup();
    render(<SementeForm />);
    await preencher(user, 'Maria Silva', 'maria@exemplo.com');
    await user.click(campos().enviar);
    expect(
      await screen.findByText(/Não conseguimos concluir sua inscrição/)
    ).toBeInTheDocument();
    expect(campos().enviar).toBeEnabled();
    expect(sendEvent).not.toHaveBeenCalled();
    expect(assign).not.toHaveBeenCalled();
  });

  it('durante o envio o botão fica desabilitado (sem inscrição em duplicidade)', async () => {
    let liberar!: () => void;
    vi.mocked(registerForWebinar).mockReturnValue(
      new Promise((r) => {
        liberar = () => r({ registered: true });
      })
    );
    const user = userEvent.setup();
    render(<SementeForm />);
    await preencher(user, 'Maria Silva', 'maria@exemplo.com');
    await user.click(campos().enviar);
    await waitFor(() => expect(campos().enviar).toBeDisabled());
    await user.click(campos().enviar);
    expect(registerForWebinar).toHaveBeenCalledTimes(1);
    liberar();
    await waitFor(() => expect(assign).toHaveBeenCalled());
  });
});
