# ⏱️ Chronos Pomodoro

**Chronos Pomodoro** é uma aplicação de produtividade baseada na técnica
Pomodoro, desenvolvida com React. O objetivo é ajudar usuários a gerenciar
melhor seu tempo de trabalho e descanso, promovendo foco e eficiência.

---

## 🚀 Funcionalidades

- Temporizador Pomodoro personalizável
- Histórico de sessões
- Configurações de tempo de foco, pausa curta e longa
- Explicação sobre a técnica Pomodoro
- Navegação amigável com React Router

---

## 🧭 Rotas da Aplicação

| Rota              | Componente      | Descrição                                      |
| ----------------- | --------------- | ---------------------------------------------- |
| `/`               | `Home`          | Tela principal com o cronômetro Pomodoro       |
| `/history`        | `History`       | Histórico de sessões realizadas                |
| `/settings`       | `Settings`      | Página para personalizar tempos e preferências |
| `/about-pomodoro` | `AboutPomodoro` | Explicação sobre a técnica Pomodoro            |
| `*`               | `NotFound`      | Página de erro 404 para rotas inexistentes     |

---

## 🛠️ Tecnologias Utilizadas

- **React**
- **React Router DOM**
- **TypeScript**
- **CSS Modules**
- **LocalStorage** para persistência dos dados

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/chronos-pomodoro.git

# Entre no diretório do projeto
cd chronos-pomodoro

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
