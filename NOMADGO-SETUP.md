# Guia: aplicar as correções do glass-toast no NomadGo

> Correções incluídas a partir da versão **0.4.3** da lib:
> 1. Ícone do toast visível (`react-native-svg` passou de peer dependency opcional → obrigatória).
> 2. Badge colado na borda esquerda do toast (antes ficava afastado pelo padding horizontal do surface).
>
> É **obrigatório** atualizar a versão da lib no NomadGo com o build novo de `dist/` — o app consome `dist/index.js`, então não adianta só reinstalar o pacote antigo.

---

## Política de dependências das correções

Para manter essas correções sem quebrar o build do app (acoes acima dos limites desta lib):

- **NÃO** adicionar nenhuma `dependencies` nova ao app NomadGo por causa da lib. O fix do ícone já está coberto pela mudança do `react-native-svg` para peer dependency obrigatória — nada além do que o npm já instala automaticamente junto com a lib deve entrar no app.
- **NÃO** trocar de lib de ícones. O lucide continua sendo o ícone oficial do glass-toast; instalar outra lib de ícones no app poderia arrastar dependências não necessárias e conflitar com o `react-native-svg`.
- **NÃO** fazer downgrade das versões desses pacotes no app. Se precisar reduzir, reduza só a **menor** versão que ainda satisfaça os peer ranges declarados (`react-native-svg >= 15`, `react-native-reanimated >= 3.17`). Menos que isso quebra a lib silenciosamente.
- Se o app tiver `overrides`/`resolutions` no `package.json` para algum desses pacotes, **remova o override** ao correr dos passos abaixo — override manual de peer dependencies mascara o problema e recria o bug do ícone invisível depois de qualquer `npm install`.

---

## 1. Atualizar a glass-toast dentro do NomadGo

O projeto do app (NomadGo) **não está neste repositório** — rode estes comandos na pasta raiz do NomadGo.

### Opção A — publicar nova versão (recomendado para produção)

```bash
# No repo da glass-toast:
npm run test        # typecheck + lint + build + pack:check
npm version patch   # ex. 0.4.4
npm publish
```

```bash
# No NomadGo:
npm install glass-toast@<nova-versao>
```

### Opção B — testar localmente antes de publicar (dev)

```bash
# No repo da glass-toast:
npm run build
npm pack            # gera glass-toast-0.4.3.tgz
```

```bash
# No NomadGo:
npm install /caminho/para/glass-toast-0.4.3.tgz
```

---

## 2. Instalar a peer dependency de ícones (a causa real do ícone invisível)

Causa: os ícones internos da lib vinham de `lucide-react-native`, que renderiza via `react-native-svg` nativo. Na lib antiga, `react-native-svg` era peer **opcional**, então o npm nunca o instalou no NomadGo — sem o módulo nativo linkado, o `<Svg>` não pinta nada e o glifo fica invisível (o badge e os textos renderizam normalmente porque são Views).

Com a lib atualizada, o npm já resolve `react-native-svg` automaticamente. Confira depois do passo 1:

```bash
# No NomadGo:
npm ls react-native-svg        # deve aparecer ^15.x, sem "(unmet peer)" ou "(missing)"
npm install react-native-svg   # rode so se o npm ls falhar
```

---

## 3. Rebuild do nativo (obrigatório — só `npm install` não basta)

### iOS

```bash
# No NomadGo:
cd ios
pod install
cd ..

# ou, se usar Expo / react-native 0.7x com autolink:
npx pod-install
```

Depois limpe o cache do Metro e rode o dev server:

```bash
npx react-native start --reset-cache
# em outro terminal:
npx react-native run-ios
```

Se o build nativo reclamar de módulo duplicado ou linker, limpe o Xcode:

```bash
cd ios
xcodebuild clean
cd ..
```

### Android (se aplicável)

```bash
# No NomadGo:
npx react-native run-android
# se o Gradle não recompilar os módulos nativos:
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

---

## 4. Checklist de verificação no app

Rode um toast de teste e confira:

- [ ] **Ícone visível** dentro do badge (check/X/triângulo/info/sino conforme o `type`).
- [ ] **Badge colado na borda esquerda**, sem espaço entre a borda e o badge.
- [ ] Badge **centralizado verticalmente** no toast.
- [ ] Ícone **centralizado dentro** do badge.
- [ ] Badge/texto/toast com **mesmo tamanho** de antes (nada esticado ou deslocado).
- [ ] Gap entre badge e texto (`marginRight: 12`) ainda presente.

Se algo falhar, priorize a investigação nesta ordem:

1. `npm ls react-native-svg` no NomadGo — confirmação mais rápida (fica desalinhado se o passo 3 não rodou, ex. esqueceu do `pod install`).
2. Versão do `react-native-svg` — precisa ser `>= 15` (peer range da lib).
3. Cache do Metro — re rode com `--reset-cache` (passo 3).
4. Build nativo — confirme no log do `pod install` que `RNSVG`/`react-native-svg` foi linkado.
5. Logs do dev server/Xcode — procure `RNSVG` ausente, mismatch de versão nativa ou erro de módulo não registrado.
