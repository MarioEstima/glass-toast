# Glass Toast 0.4.3 — sem borda

Esta versão remove a borda do toast. A superfície (`GlassSurface`) agora é desenhada com `borderWidth: 0`, sem contorno, e o destaque sobre o fundo vem apenas da sombra suave (iOS `shadow*`, Android `elevation` e `boxShadow`), que continua se ajustando automaticamente aos temas claro e escuro.

Nenhuma API, prop, tipo ou comportamento de stack/animação mudou — apenas o visual do toast.

```bash
npm install glass-toast@0.4.3
```
