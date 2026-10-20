# Glass Toast 0.4.2 — altura compacta

Esta versão restaura a altura compacta padrão dos toasts. Padding vertical extra só é aplicado quando configurado em `dimensions.paddingVertical`.

A largura customizada continua aceitando porcentagens e números, por exemplo `width="92%"`, e os tipos desta versão incluem esses valores.

```tsx
<ToastProvider width="92%">
  <App />
</ToastProvider>
```

Se o TypeScript ainda rejeitar `"92%"`, confirme que o app instalou `glass-toast@0.4.2` e reinicie o servidor TypeScript do editor.

## Instalação

```bash
npm install glass-toast@0.4.2
```
