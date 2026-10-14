import { describe, expect, it } from 'vitest';
import {
  WEBINAR_COMMUNITY_LINK,
  WEBINAR_DATE_LABEL_1,
  WEBINAR_DATE_LABEL_2,
  WEBINAR_DATE_SHORT,
  buildSurveyUrl,
} from '../src/components/semente/sementeConfig';

describe('buildSurveyUrl (link da pesquisa na página de obrigado)', () => {
  const parse = (url: string) => new URL(url);

  it('aponta para a pesquisa do Formbricks do webinário', () => {
    const url = parse(buildSurveyUrl('Maria Silva', 'maria@exemplo.com'));
    expect(url.origin).toBe('https://survey.foconoobjetivo.com');
    expect(url.pathname).toBe('/s/cmuoad5ok000901pds4kurc2k');
  });

  it('pré-preenche e-mail e nome nas duas primeiras perguntas e no campo oculto "nome"', () => {
    const url = parse(buildSurveyUrl('Maria Silva', 'maria@exemplo.com'));
    expect(url.searchParams.get('ys8rmlszunb5hy4zzu9u9rq2')).toBe(
      'maria@exemplo.com'
    );
    expect(url.searchParams.get('dm8cj9csdv7ifx88loxwub2r')).toBe(
      'Maria Silva'
    );
    expect(url.searchParams.get('nome')).toBe('Maria Silva');
  });

  it('preserva acentos, espaços e "+" no e-mail (codificação correta)', () => {
    const url = parse(
      buildSurveyUrl('José da Conceição', 'jose+bussola@exemplo.com')
    );
    expect(url.searchParams.get('ys8rmlszunb5hy4zzu9u9rq2')).toBe(
      'jose+bussola@exemplo.com'
    );
    expect(url.searchParams.get('nome')).toBe('José da Conceição');
    // o "+" literal do e-mail viaja como %2B, senão viraria espaço no destino
    expect(buildSurveyUrl('José', 'a+b@exemplo.com')).toContain(
      'a%2Bb%40exemplo.com'
    );
  });
});

describe('constantes da página do webinário', () => {
  it('o link da comunidade é o grupo do WhatsApp', () => {
    expect(WEBINAR_COMMUNITY_LINK).toMatch(
      /^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+$/
    );
  });

  it('data e hora do webinário são as mesmas em todos os rótulos (quinta, 15/10, 20h)', () => {
    expect(WEBINAR_DATE_SHORT).toMatch(/15\/10/);
    expect(WEBINAR_DATE_SHORT).toMatch(/20H/i);
    expect(WEBINAR_DATE_LABEL_2).toMatch(/15 de outubro/);
    expect(WEBINAR_DATE_LABEL_2).toMatch(/20h/);
    expect(WEBINAR_DATE_LABEL_1).toMatch(/gratuito/i);
  });
});
