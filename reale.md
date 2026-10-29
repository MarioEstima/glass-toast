# Alteração: destaque do ícone

## O que mudou

O fundo do destaque atrás do ícone agora usa sempre cinza (`rgba(128, 128, 128, 0.35)`) nos estilos `solid` e `soft`, sem depender do tema ou do tipo do toast. O estilo `bare` continua sem destaque. A cor do ícone, o texto, o fundo do toast e as animações não foram alterados.

## Como mudar a cor

Edite a constante `ICON_HIGHLIGHT` em [`src/components/ToastContent.tsx`](src/components/ToastContent.tsx):

```tsx
const ICON_HIGHLIGHT = 'rgba(128, 128, 128, 0.35)'
```

Por exemplo, para um cinza mais opaco, aumente o último valor (alfa), que vai de `0` a `1`:

```tsx
const ICON_HIGHLIGHT = 'rgba(128, 128, 128, 0.5)'
```

Para usar outro tom, altere os três primeiros valores RGB. A função `badgeBackground` aplica essa constante aos estilos `solid` e `soft`; `bare` retorna `undefined` e não desenha o círculo.
