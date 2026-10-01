import { useEffect, useState } from 'react'
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { ToastProvider, toast, useToast, useSystemColorScheme } from './index'
import type {
  IconBadgeStyle,
  StackGap,
  StackMode,
  ToastAnimation,
  ToastPosition,
  ToastScheme,
  ToastSize,
  ToastVariant,
  ToastWidth,
} from './types/toast'

type ThemePref = 'system' | 'light' | 'dark'

const POSITIONS: ToastPosition[] = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right']
const SIZES: ToastSize[] = ['sm', 'md', 'lg']
const VARIANTS: ToastVariant[] = ['toast', 'notification', 'popover', 'glass']
const STACK_MODES: StackMode[] = ['stack', 'list']
const STACK_GAPS: StackGap[] = ['tight', 'normal', 'loose']
const THEMES: ThemePref[] = ['system', 'light', 'dark']
const ANIMATIONS: ToastAnimation[] = ['spring', 'bounce', 'slide', 'fade']
const WIDTHS: ToastWidth[] = ['hug', 'full']
const BADGES: IconBadgeStyle[] = ['solid', 'soft', 'bare']

type DemoOptions = { position: ToastPosition; size: ToastSize; variant: ToastVariant; dismissible: boolean }

function makeDemos(opts: DemoOptions): Array<{ label: string; hint: string; show: () => string }> {
  const base = { position: opts.position, size: opts.size, variant: opts.variant, dismissible: opts.dismissible }
  return [
    {
      label: '✓ Success',
      hint: 'toast.success()',
      show: () => toast.success('Payment confirmed', { ...base, description: 'Receipt sent to your email.' }),
    },
    {
      label: '✕ Error',
      hint: 'toast.error()',
      show: () => toast.error('Upload failed', { ...base, description: 'Check your connection and try again.' }),
    },
    {
      label: '! Warning',
      hint: 'toast.warning()',
      show: () => toast.warning('Storage almost full', { ...base, description: 'Only 400 MB left.' }),
    },
    {
      label: 'i Info',
      hint: 'toast.info()',
      show: () => toast.info('New version available', { ...base, description: 'Update to get the latest features.' }),
    },
    {
      label: '◇ Default',
      hint: 'toast.show()',
      show: () => toast.show({ ...base, title: 'Syncing…', description: 'This toast has no type accent.' }),
    },
    {
      label: '⏻ Persistent',
      hint: 'duration: 0',
      show: () =>
        toast.info('Stays until dismissed', {
          ...base,
          description: 'duration: 0 — press the ✕.',
          duration: 0,
        }),
    },
    {
      label: '★ Got it',
      hint: 'action',
      show: () =>
        toast.show({
          ...base,
          title: 'Hit / to explore Experts',
          type: 'info',
          duration: 0,
          action: { label: 'GOT IT', onPress: () => toast.success('Nice!') },
        }),
    },
    {
      label: '↵ Pressable',
      hint: 'onPress',
      show: () =>
        toast.show({
          ...base,
          title: 'New message from Ana',
          description: 'Tap to open the chat.',
          type: 'info',
          duration: 6000,
          onPress: () => toast.success('Opening chat…'),
        }),
    },
  ]
}

function useDemoState() {
  const [position, setPosition] = useState<ToastPosition>('top')
  const [size, setSize] = useState<ToastSize>('md')
  const [variant, setVariant] = useState<ToastVariant>('toast')
  const [stackMode, setStackMode] = useState<StackMode>('stack')
  const [stackGap, setStackGap] = useState<StackGap>('normal')
  const [theme, setTheme] = useState<ThemePref>('system')
  const [animation, setAnimation] = useState<ToastAnimation>('spring')
  const [width, setWidth] = useState<ToastWidth>('full')
  const [iconBadge, setIconBadge] = useState<IconBadgeStyle>('solid')
  const [dismissible, setDismissible] = useState(true)
  const [animatedIcon, setAnimatedIcon] = useState(true)

  return {
    position, setPosition,
    size, setSize,
    variant, setVariant,
    stackMode, setStackMode,
    stackGap, setStackGap,
    theme, setTheme,
    animation, setAnimation,
    width, setWidth,
    iconBadge, setIconBadge,
    dismissible, setDismissible,
    animatedIcon, setAnimatedIcon,
  }
}

/* ------------------------------ page palette ------------------------------ */

type PagePalette = {
  text: string
  textMuted: string
  hint: string
  panelBg: string
  panelBorder: string
  chipBg: string
  chipBorder: string
  chipText: string
  accent: string
  accentSoft: string
  accentBorder: string
}

/** Opaque pastel page palette, mirroring the toast tokens. */
function pagePalette(scheme: ToastScheme): PagePalette {
  const dark = scheme === 'dark'
  return {
    text: dark ? '#E9EAF5' : '#33355A',
    textMuted: dark ? 'rgba(233, 234, 245, 0.6)' : 'rgba(51, 53, 90, 0.58)',
    hint: dark ? 'rgba(233, 234, 245, 0.42)' : 'rgba(51, 53, 90, 0.44)',
    panelBg: dark ? '#26233A' : '#FFFFFF',
    panelBorder: dark ? '#383452' : '#ECE9F1',
    chipBg: dark ? '#332F4A' : '#F4F2FB',
    chipBorder: dark ? '#413C5E' : '#E5E1F0',
    chipText: dark ? '#DEDBF0' : '#4A4458',
    accent: '#6C63D9',
    accentSoft: dark ? '#373352' : '#EDEBFB',
    accentBorder: dark ? '#4B4480' : '#D9D5F5',
  }
}

/* ------------------------------- playground ------------------------------- */

function Playground(props: { demo: ReturnType<typeof useDemoState>; scheme: ToastScheme }) {
  const demo = props.demo
  const scheme = props.scheme
  const toastApi = useToast()
  const p = pagePalette(scheme)
  const demos = makeDemos({
    position: demo.position,
    size: demo.size,
    variant: demo.variant,
    dismissible: demo.dismissible,
  })

  const showBurst = () => {
    for (let i = 1; i <= 3; i += 1) {
      setTimeout(() => {
        toast.show({
          title: `Toast ${i} de 3`,
          description: 'Stacking demo — ve o efeito de profundidade.',
          type: i === 2 ? 'success' : i === 3 ? 'error' : 'info',
          position: demo.position,
          size: demo.size,
          variant: demo.variant,
          dismissible: demo.dismissible,
        })
      }, i * 260)
    }
  }

  const panel = [styles.panel, { backgroundColor: p.panelBg, borderColor: p.panelBorder }]

  const sectionTitle = (label: string) => (
    <View style={styles.titleRow}>
      <View style={[styles.titleDot, { backgroundColor: p.accent }]} />
      <Text style={[styles.panelTitle, { color: p.textMuted }]}>{label}</Text>
    </View>
  )

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: p.text }]}>
          liquid <Text style={{ color: p.accent }}>glass</Text>
        </Text>
        <View style={[styles.badge, { backgroundColor: p.accentSoft, borderColor: p.accentBorder }]}>
          <Text style={[styles.badgeText, { color: p.accent }]}>glass-toast · v0.2.0 playground</Text>
        </View>
      </View>

      <View style={panel}>
        {sectionTitle('DEMOS')}
        <View style={styles.wrap}>
          {demos.map((item) => (
            <View key={item.label} style={styles.demoCell}>
              <Chip label={item.label} palette={p} onPress={item.show} />
              <Text style={[styles.demoHint, { color: p.hint }]}>{item.hint}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.wrap, styles.spacerTop]}>
          <Chip label="⚡ Burst ×3 (stack)" palette={p} accent onPress={showBurst} />
          <Chip label="Limpar tudo" palette={p} onPress={() => toastApi.dismissAll()} />
        </View>
      </View>

      <View style={panel}>
        {sectionTitle('POSIÇÃO')}
        <View style={styles.wrap}>
          {POSITIONS.map((pos) => (
            <Chip key={pos} label={pos} palette={p} selected={demo.position === pos} onPress={() => demo.setPosition(pos)} />
          ))}
        </View>
        <Text style={[styles.hint, { color: p.hint }]}>Os demos acima usam a posição selecionada aqui.</Text>
      </View>

      <View style={panel}>
        {sectionTitle('TAMANHO · VARIANTE')}
        <View style={styles.wrap}>
          {SIZES.map((s) => (
            <Chip key={s} label={s} palette={p} selected={demo.size === s} onPress={() => demo.setSize(s)} />
          ))}
          {VARIANTS.map((v) => (
            <Chip key={v} label={v} palette={p} selected={demo.variant === v} onPress={() => demo.setVariant(v)} />
          ))}
        </View>
      </View>

      <View style={panel}>
        {sectionTitle('TEMA')}
        <View style={styles.wrap}>
          {THEMES.map((t) => (
            <Chip key={t} label={t} palette={p} selected={demo.theme === t} onPress={() => demo.setTheme(t)} />
          ))}
        </View>
        <Text style={[styles.hint, { color: p.hint }]}>
          Pastéis opacos no claro e no escuro — "system" segue o SO/browser.
        </Text>
      </View>

      <View style={panel}>
        {sectionTitle('ANIMAÇÃO · LARGURA · BADGE')}
        <View style={styles.wrap}>
          {ANIMATIONS.map((a) => (
            <Chip key={a} label={a} palette={p} selected={demo.animation === a} onPress={() => demo.setAnimation(a)} />
          ))}
        </View>
        <View style={styles.wrap}>
          {WIDTHS.map((w) => (
            <Chip key={w} label={w} palette={p} selected={demo.width === w} onPress={() => demo.setWidth(w)} />
          ))}
          {BADGES.map((b) => (
            <Chip key={b} label={`badge: ${b}`} palette={p} selected={demo.iconBadge === b} onPress={() => demo.setIconBadge(b)} />
          ))}
        </View>
      </View>

      <View style={panel}>
        {sectionTitle('STACK (DEPTH)')}
        <View style={styles.wrap}>
          {STACK_MODES.map((m) => (
            <Chip key={m} label={m} palette={p} selected={demo.stackMode === m} onPress={() => demo.setStackMode(m)} />
          ))}
          {STACK_GAPS.map((g) => (
            <Chip key={g} label={`gap: ${g}`} palette={p} selected={demo.stackGap === g} onPress={() => demo.setStackGap(g)} />
          ))}
        </View>
        <Text style={[styles.hint, { color: p.hint }]}>Experimenta o "Burst ×3" com stack vs list.</Text>
      </View>

      <View style={panel}>
        {sectionTitle('OPÇÕES')}
        <View style={styles.wrap}>
          <Chip label="dismissible" palette={p} selected={demo.dismissible} onPress={() => demo.setDismissible((v) => !v)} />
          <Chip label="animated icon" palette={p} selected={demo.animatedIcon} onPress={() => demo.setAnimatedIcon((v) => !v)} />
        </View>
      </View>

      <Text style={[styles.footer, { color: p.hint }]}>
        {'ToastProvider → toast.show({ position, size, variant, action, animation, ... })'}
      </Text>
    </ScrollView>
  )
}

function Chip(props: { label: string; palette: PagePalette; onPress: () => void; selected?: boolean; accent?: boolean }) {
  const { label, palette, onPress, selected, accent } = props
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        { backgroundColor: palette.chipBg, borderColor: palette.chipBorder },
        accent && { backgroundColor: palette.accentSoft, borderColor: palette.accentBorder },
        selected && { backgroundColor: palette.accent, borderColor: palette.accent },
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={[styles.chipText, { color: palette.chipText }, (selected || accent) && { color: '#FFFFFF' }]}>
        {label}
      </Text>
    </Pressable>
  )
}

export default function App() {
  const demo = useDemoState()
  const systemScheme = useSystemColorScheme()
  const scheme: ToastScheme = demo.theme === 'system' ? systemScheme : demo.theme

  // The demo page itself follows the selected theme.
  useEffect(() => {
    if (Platform.OS === 'web') {
      document.documentElement.dataset.scheme = scheme
    }
  }, [scheme])

  return (
    <ToastProvider
      position={demo.position}
      size={demo.size}
      variant={demo.variant}
      theme={demo.theme}
      stackMode={demo.stackMode}
      stackGap={demo.stackGap}
      animatedIcon={demo.animatedIcon}
      animation={demo.animation}
      width={demo.width}
      iconBadge={demo.iconBadge}
      duration={4200}
      maxToasts={4}
      inset={14}
    >
      <Playground demo={demo} scheme={scheme} />
    </ToastProvider>
  )
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    padding: 28,
    gap: 20,
    maxWidth: 880,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    gap: 10,
    paddingTop: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1.2,
  },
  badge: {
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  panel: {
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  panelTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  spacerTop: {
    marginTop: 2,
  },
  demoCell: {
    alignItems: 'center',
    gap: 3,
  },
  demoHint: {
    fontSize: 10,
  },
  chip: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  hint: {
    fontSize: 12,
  },
  footer: {
    fontSize: 11,
    textAlign: 'center',
    paddingVertical: 18,
  },
})
