# Planneta — Protótipo Interativo (IHC · Pacote 3)

Protótipo interativo em código (Web responsivo + APK Android) do aplicativo **Planneta**, desenvolvido para o **Pacote 3** da disciplina de **Interação Humano-Computador (IHC)** na Universidade Federal de São Carlos (UFSCar).

> **Planneta** — *"Sua rotina, do seu jeito. Sem e-mail e sem complicação."*

---

## Contexto do Projeto

- **Instituição:** UFSCar — Bacharelado em Ciência da Computação
- **Disciplina:** Interação Humano-Computador (IHC) — Oferta 2026/2 (Turma A)
- **Docente:** Profa. Vânia Neris
- **Entrega:** Pacote 3 — Prototipação em código (Web e APK Android)

Este protótipo integra o processo iterativo e incremental de design adotado ao longo da disciplina:

| Pacote | Etapa | Artefatos principais |
| :---: | :--- | :--- |
| **1** | Clarificação do Problema de Design | Benchmark, Personas e Cenários |
| **2** | Concepção e Prototipação | Design Participativo (Sketches), Requisitos, Mapas de Design Rationale, Protótipo no Figma e Design System |
| **3** | **Prototipação em Código *(este repositório)*** | **Protótipo interativo executável (Web + APK Android) das telas do Pacote 2 e vídeo de demonstração** |
| **4** | Avaliação | Avaliação Heurística (Heurísticas de Nielsen) e Teste de Usabilidade sobre o protótipo do Pacote 3 |
| **5** | Redesign | Revisão e ajustes das telas no Figma com base nos achados da avaliação |

O protótipo foi inicialmente estruturado a partir das telas do Pacote 2 com o **Figma Make**, refinado iterativamente por meio de prompts ([documento de prompts do refinamento](https://docs.google.com/document/d/1GCg-l8q-xyp1IWaCgkX-2rFZUDzQKOoMO-whuNagDpc/edit?usp=sharing)) e empacotado como aplicativo Android (**APK**) utilizando **Capacitor**.

---

## Sobre o Planneta

O **Planneta** é um aplicativo de organização escolar voltado a estudantes (8º ano, 9º ano e 1º ano do Ensino Médio), projetado com foco em:

- **Baixa fricção na entrada:** cadastro sem necessidade de e-mail, usando apenas nome/apelido, série/ano, usuário único e senha.
- **Privacidade sob controle do estudante:** compartilhamento opcional de conquistas com responsáveis por meio de um código seguro de 6 dígitos gerado sob demanda.
- **Redução de sobrecarga cognitiva:** organização automática por prazo mais próximo e prioridade, além de **divulgação progressiva** (*progressive disclosure*) na criação de tarefas (*"Só o essencial para começar"*), mantendo subtarefas, prioridade, anexos, links e lembretes ocultos até que o usuário precise deles.

---

## Tarefas Possíveis no Protótipo Interativo

Em conformidade com os requisitos do **Pacote 3** (suporte a pelo menos 3 tarefas completas no protótipo interativo), é possível realizar os seguintes fluxos:

### 1. Cadastro / Onboarding sem e-mail e geração de código para responsáveis
1. Informar **Nome ou apelido** (até 12 caracteres, com contador em tempo real) e selecionar a **Série / ano**.
2. Definir um **Nome de usuário único** (até 20 caracteres) e uma **Senha** (com opção **Mostrar / Ocultar**).
3. *(Opcional)* Tocar em **Gerar código de 6 dígitos** no card de privacidade para gerar um código aleatório de compartilhamento com os pais.
4. Tocar em **Entrar no Planneta** (ou **Já tem uma conta? Entrar**) para acessar a tela inicial com saudação personalizada (`Olá, <nome>!`).

### 2. Criar uma nova tarefa (modo essencial ou completo)
1. Na tela inicial, tocar em **Nova tarefa**.
2. Preencher a descrição (*"O que você precisa entregar?"*, até 40 caracteres).
3. Selecionar o prazo por *chips*: **Hoje**, **Amanhã** ou **Escolher no calendário** (`Sexta-feira, 13 nov.`).
4. Selecionar uma matéria (**Matemática**, **Ciências**, **História**) ou tocar em **Nova** para cadastrar uma matéria personalizada.
5. *(Opcional)* Expandir **Adicionar detalhes e subtarefas** para:
   - Adicionar ou remover subtarefas (*"Adicionar um pequeno passo"*, até 40 caracteres);
   - Definir a **Prioridade** (**Baixa**, **Média** ou **Alta**);
   - Marcar **Anexar arquivo** e/ou **Adicionar link**;
   - Adicionar ou remover **Lembretes**.
6. Tocar em **Criar Tarefa**. A atividade é inserida na tela inicial e ordenada automaticamente por **prazo mais próximo** (`Hoje` → `Amanhã` → demais datas) e, em seguida, por **prioridade** (`Alta` → `Média` → `Baixa`).

### 3. Editar uma tarefa existente
1. Na tela inicial, tocar sobre qualquer tarefa da lista (ex.: *Prova de Matemática*, *Dever de Ciências* ou *Leitura de Português*).
2. No diálogo exibido, tocar em **Editar tarefa**.
3. Alterar descrição, prazo, matéria, subtarefas, prioridade ou lembretes.
4. Tocar em **Salvar Tarefa** para atualizar o item na lista e reordená-lo conforme o novo prazo/prioridade.

### 4. Concluir uma tarefa com confirmação e feedback
1. Na tela inicial, tocar no botão de conclusão ou no cartão de uma tarefa.
2. No diálogo modal **Concluir tarefa?**, confirmar em **Concluir tarefa** (ou cancelar para manter a atividade).
3. A tarefa é removida da lista, o contador de atividades é atualizado e uma notificação temporária (*snackbar*) confirma: *"Tarefa Concluída com sucesso"*.

### Ações auxiliares (úteis para demonstração e testes de usabilidade)
- **Alternar notificações:** botão de sino no canto superior direito da tela inicial.
- **Reiniciar aplicativo:** botão no canto superior esquerdo da tela inicial que limpa o estado em memória e retorna à tela de cadastro — útil para recomeçar sessões durante os testes de usabilidade do Pacote 4.

---

## Telas Implementadas

| Tela (`Screen`) | Descrição |
| :--- | :--- |
| `signup` — **Cadastro** | Onboarding sem e-mail, seletor de série/ano, campo de senha com visibilidade alternável e gerador de código de 6 dígitos para responsáveis. |
| `home` — **Início** | Saudação personalizada, lista de atividades ordenada por urgência/prioridade com destaque visual para prazos de `Hoje`/`Amanhã`, modal de confirmação de conclusão, *snackbar* de feedback, card de apoio e barra de navegação inferior. |
| `task` — **Nova Tarefa (Essencial)** | Formulário enxuto com descrição, seleção rápida de data e matéria (incluindo criação inline de novas matérias) e cartão de divulgação progressiva. |
| `details` — **Detalhes e Subtarefas** | Extensão do formulário de tarefa (também usada na edição) com gerenciamento de subtarefas, prioridade, anexos/links e lembretes. |

---

## Escopo e Limitações do Protótipo

Por se tratar de um protótipo interativo para validação de interface e avaliação no Pacote 4:

- **Persistência em memória:** os dados (nome, tarefas, matérias personalizadas e lembretes) não são persistidos em backend ou armazenamento local; recarregar o app ou acionar o botão de reinício restaura o estado inicial.
- **Navegação secundária:** na barra inferior, apenas a aba **Início** está ativa; **Atividades**, **Estatísticas** e **Perfil** representam a estrutura prevista do aplicativo.
- **Funcionalidades simuladas / futuras:**
  - O botão **Dividir em pequenos passos** (no card *"Dificuldade por onde começar?"*) exibe feedback explícito (*snackbar*) informando que a função ainda não foi implementada neste protótipo.
  - **Escolher no calendário** seleciona uma data de exemplo (`Sexta-feira, 13 nov.`), e **Anexar arquivo** / **Adicionar link** funcionam como seletores de estado simulados.

---

## Tecnologias Utilizadas

- **Interface Web:** React 19, TypeScript 5.7, Vite 8, Tailwind CSS 4 (`@tailwindcss/vite`)
- **Empacotamento Mobile (APK):** Capacitor 8 (`@capacitor/core`, `@capacitor/cli`, `@capacitor/android`) — Android `minSdk 24`, `compileSdk 36`, `targetSdk 36`
- **Prototipação inicial:** Figma / Figma Make
- **Ambiente reproduzível (opcional):** Nix (`shell.nix` com JDK 21, Node.js e Android SDK 34/35/36) e Mise (`.mise.toml` com Node 22 e pnpm 10.34.3)

---

## Estrutura do Repositório

```text
.
├── android/               # Projeto Android (Capacitor) para geração do APK
├── public/assets/         # Ícones SVG utilizados nas telas
├── src/
│   ├── App.tsx            # Telas (signup, home, task, details) e lógica de interação
│   ├── index.css          # Tokens visuais, tipografia (Inter) e layout responsivo
│   └── main.tsx           # Ponto de entrada React
├── .figma/                # Configuração de integração com o Figma Make
├── capacitor.config.ts    # Configuração do Capacitor (webDir: dist)
├── index.html             # HTML base da aplicação
├── package.json           # Dependências e scripts Vite/Capacitor
├── shell.nix              # Ambiente Nix com Android SDK e JDK 21 para build do APK
└── vite.config.ts         # Configuração do Vite (porta padrão 8443)
```

---

## Como Executar

### Pré-requisitos
- **Web:** Node.js 22+ e `pnpm` (ou `npm`)
- **Android (APK):** Android SDK (API 36) e JDK 21 — ou **Nix** usando o `shell.nix` incluso

### 1. Executar no navegador (modo desenvolvimento)

```bash
pnpm install
pnpm dev
```

*(Caso utilize `npm`, execute `npm install` e `npm run dev`.)*

A aplicação ficará disponível em `http://localhost:8443` (porta configurada em `vite.config.ts`, sobrescrevível pela variável `PORT`).

Para gerar o build de produção web e pré-visualizar:

```bash
pnpm build
pnpm preview
```

### 2. Gerar o APK Android (Debug)

1. Gere o bundle web e sincronize com o projeto Android:
   ```bash
   pnpm build
   npx cap sync android
   ```
2. Compile o APK com Gradle (em ambientes Nix/NixOS, execute dentro de `nix-shell`):
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
3. O APK será gerado em:
   ```text
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

---

## Referências e Links do Pacote 3

- **Prompts de refinamento (Figma Make):** [Google Docs](https://docs.google.com/document/d/1GCg-l8q-xyp1IWaCgkX-2rFZUDzQKOoMO-whuNagDpc/edit?usp=sharing)
- **Vídeo de demonstração:** *(adicionar link do vídeo demo)*
- **Protótipo no Figma (Pacote 2):** *(adicionar link do Figma, se aplicável)*
