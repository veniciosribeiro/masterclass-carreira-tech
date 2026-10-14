import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BussolaPricing } from '../src/components/bussola/BussolaPricing';
import { CHECKOUT_URL } from '../src/components/bussola/bussolaConfig';
import { sendEvent } from '../src/utils/metaPixel';

vi.mock('../src/utils/metaPixel', () => ({ sendEvent: vi.fn() }));

const originalLocation = window.location;
let navegou: string | null;

beforeEach(() => {
  navegou = null;
  vi.useFakeTimers();
  vi.mocked(sendEvent).mockResolvedValue({ eventID: 'ev-1' });
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      ...originalLocation,
      get href() {
        return 'https://site.teste/bussola';
      },
      set href(v: string) {
        navegou = v;
      },
    },
  });
});
afterEach(() => {
  vi.useRealTimers();
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: originalLocation,
  });
});

const cta = () =>
  screen.getByRole('link', { name: /Entrar na turma inaugural/ });

describe('checkout da Bússola (BussolaPricing)', () => {
  it('o botão leva ao checkout da Cakto', () => {
    render(<BussolaPricing />);
    expect(cta()).toHaveAttribute('href', CHECKOUT_URL);
    expect(CHECKOUT_URL).toMatch(/^https:\/\/pay\.cakto\.com\.br\//);
  });

  it('o clique é interceptado: não navega na hora', () => {
    render(<BussolaPricing />);
    const naoCancelado = fireEvent.click(cta());
    expect(naoCancelado).toBe(false); // preventDefault foi chamado
    expect(navegou).toBeNull();
  });

  it('dispara InitiateCheckout com o produto e o valor da turma inaugural', () => {
    render(<BussolaPricing />);
    fireEvent.click(cta());
    expect(sendEvent).toHaveBeenCalledTimes(1);
    expect(sendEvent).toHaveBeenCalledWith('InitiateCheckout', {
      content_name: 'Turma inaugural',
      value: 297,
      currency: 'BRL',
    });
  });

  it('só redireciona depois de 1,5 s (tempo para o evento sair)', () => {
    render(<BussolaPricing />);
    fireEvent.click(cta());
    vi.advanceTimersByTime(1499);
    expect(navegou).toBeNull();
    vi.advanceTimersByTime(1);
    expect(navegou).toBe(CHECKOUT_URL);
  });

  it('redireciona mesmo se o evento falhar (a venda não depende do rastreio)', () => {
    vi.mocked(sendEvent).mockRejectedValue(new Error('events API fora'));
    render(<BussolaPricing />);
    fireEvent.click(cta());
    vi.advanceTimersByTime(1500);
    expect(navegou).toBe(CHECKOUT_URL);
  });
});
