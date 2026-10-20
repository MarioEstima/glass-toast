# Glass Toast 0.3.2 — validação da versão

Esta versão corrige o erro do Reanimated/Worklets que podia aparecer durante a animação e o fechamento dos toasts:

```text
[Worklets] Tried to synchronously call a Remote Function
```

Os callbacks de estilos animados e de conclusão da animação agora são marcados explicitamente como worklets. Isso permite que o Babel plugin os prepare corretamente no bundle da biblioteca, mesmo quando o bundler altera o nome de uma importação.

## Verificações realizadas

- `npm run typecheck` — passou.
- `npm run lint` — passou.
- `npm run build` — passou; o bundle de produção mantém as diretivas `worklet`.
- `npm run pack:check` — passou; o pacote inclui a correção e este documento.
- Validação local com React Native Reanimated 4.6.0 e React Native Worklets 0.12.1.

Este repositório é uma biblioteca e não inclui um aplicativo consumidor, emulador ou configuração de testes E2E. Portanto, a instalação em um app Android/iOS não foi validada ponta a ponta aqui. A versão corrige o problema reportado e passou nas verificações listadas; isso não significa garantia de ausência de qualquer outro bug em todos os apps e configurações.

## Configuração no aplicativo

Use uma versão do Reanimated compatível com a versão do React Native do seu app. Reanimated 4 requer a dependência `react-native-worklets`, a Nova Arquitetura e o plugin de Worklets no Babel. Configure o plugin por último.

```js
// babel.config.js — Reanimated 4
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-worklets/plugin'],
}
```

Para Reanimated 3, use o plugin legado:

```js
// babel.config.js — Reanimated 3
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
}
```

Depois de alterar dependências nativas ou a configuração do Babel, reconstrua o app nativo e reinicie o Metro limpando o cache. No Expo, use `npx expo start --clear`; em projetos React Native CLI, reinicie o Metro com `--reset-cache` e gere uma nova build nativa.

## Instalação

```bash
npm install glass-toast@0.3.2
```

Referências oficiais: [Worklets](https://docs.swmansion.com/react-native-reanimated/docs/guides/worklets/), [migração para Reanimated 4](https://docs.swmansion.com/react-native-reanimated/docs/guides/migration-from-3.x/) e [solução de problemas](https://docs.swmansion.com/react-native-reanimated/docs/guides/troubleshooting/).
