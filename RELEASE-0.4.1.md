# Glass Toast 0.4.1 — largura customizada centralizada

A opção `width` agora aceita `"full"`, `"hug"`, um valor numérico em dp ou uma porcentagem, por exemplo `"92%"`. Larguras numéricas e percentuais permanecem alinhadas à posição escolhida para o toast: centro, esquerda ou direita.

```tsx
<ToastProvider width="92%">
  <App />
</ToastProvider>
```

O valor também pode ser passado por toast:

```tsx
toast.success('Salvo', { width: '92%' })
```

Os temas claro e escuro e as demais opções da versão 0.4.0 permanecem disponíveis.

## Instalação

```bash
npm install glass-toast@0.4.1
```
