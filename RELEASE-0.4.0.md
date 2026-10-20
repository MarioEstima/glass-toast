# Glass Toast 0.4.0 — tema monocromático e dimensões configuráveis

A versão 0.4.0 atualiza o visual do Glass Toast para preto, branco e tons de cinza. O tema padrão (`system`) acompanha a aparência clara ou escura do dispositivo; também é possível fixar `theme="light"` ou `theme="dark"`.

As variantes com brilho e efeito de vidro foram removidas. Permanecem `toast`, `notification` e `popover`.

## Novas opções

- `dimensions` permite definir largura, largura máxima, altura mínima ou fixa, padding, tamanho do ícone e tamanho das fontes. Pode ser aplicada no `ToastProvider` ou em cada toast.
- `showCloseButton={false}` oculta o X por padrão no provider ou apenas em um toast. `dismissible: false` continua desativando o fechamento pelo usuário.

```tsx
<ToastProvider
  theme="system"
  showCloseButton={false}
  dimensions={{ width: '92%', maxWidth: 520, minHeight: 72, paddingHorizontal: 24, paddingVertical: 18, titleFontSize: 18, descriptionFontSize: 14, iconSize: 24 }}
>
  <App />
</ToastProvider>

toast.show({ title: 'Salvo', showCloseButton: true, dimensions: { width: 320, height: 80 } })
```

## Compatibilidade

A variante `glass` foi removida da união `ToastVariant`. Atualize configurações que ainda a utilizem para `toast`, `notification` ou `popover`. O restante da API de exibição permanece compatível.
