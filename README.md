# Masterclass Test-Drive Da Carreira Tech

Landing page oficial da **Masterclass "Test-Drive da Carreira Tech"**, ministrada por Venicios Ribeiro.

O objetivo do projeto é oferecer um "test-drive" prático para quem deseja ingressar na área de tecnologia, ajudando a identificar o perfil ideal e evitar frustrações antes de investir tempo e dinheiro em cursos caros.

## 🚀 Tecnologias

-   [React](https://reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Vite](https://vitejs.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Google Gemini AI](https://deepmind.google/technologies/gemini/) (Integração para geração de relatórios e análises de perfil)

## 🛠️ Instalação e Execução

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

1.  **Instale as dependências:**

    ```bash
    npm install
    ```

2.  **Configuração de Variáveis de Ambiente:**

    Crie um arquivo `.env.local` na raiz do projeto e adicione sua chave da API do Gemini (necessária para as funcionalidades de IA):

    ```env
    VITE_GEMINI_API_KEY=sua_chave_aqui
    ```

3.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

    O projeto estará rodando em `http://localhost:5173`.

## 📂 Estrutura do Projeto

-   `components/`: Componentes da landing page (Hero, Authority, Pricing, PDFReportCard, etc.).
-   `services/`: Integrações com APIs externas.
-   `utils/`: Funções utilitárias e helpers.

---

Desenvolvido para ajudar futuros devs a tomarem a decisão certa.
