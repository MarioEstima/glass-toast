import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { ToastProvider, toast, useToast } from './index'
import type {
  StackGap,
  StackMode,
  ToastPosition,
  ToastSize,
  ToastVariant,
} from './types/toast'

type ThemePref = 'system' | 'light' | 'dark'

const POSITIONS: ToastPosition[] = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right']
const SIZES: ToastSize[] = ['sm', 'md', 'lg']
const VARIANTS: ToastVariant[] = ['toast', 'notification', 'popover', 'glass']
const STACK_MODES: StackMode[] = ['stack', 'list']
const STACK_GAPS: StackGap[] = ['tight', 'normal', 'loose']
const THEMES: ThemePref[] = ['system', 'light', 'dark']

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
  const [dismissible, setDismissible] = useState(true)
  const [animatedIcon, setAnimatedIcon] = useState(true)

  return {
    position, setPosition,
    size, setSize,
    variant, setVariant,
    stackMode, setStackMode,
    stackGap, setStackGap,
    theme, setTheme,
    dismissible, setDismissible,
    animatedIcon, setAnimatedIcon,
  }
}

function Playground(props: { demo: ReturnType<typeof useDemoState> }) {
  const demo = props.demo
  const toastApi = useToast()
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

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>liquid glass</Text>
        <Text style={styles.subtitle}>glass-toast playground · v0.1.0</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Demos</Text>
        <View style={styles.wrap}>
          {demos.map((item) => (
            <View key={item.label} style={styles.demoCell}>
              <Chip label={item.label} onPress={item.show} />
              <Text style={styles.demoHint}>{item.hint}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.wrap, styles.spacerTop]}>
          <Chip label="⚡ Burst ×3 (stack)" onPress={showBurst} accent />
          <Chip label="Limpar tudo" onPress={() => toastApi.dismissAll()} />
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Posição</Text>
        <View style={styles.wrap}>
          {POSITIONS.map((p) => (
            <Chip key={p} label={p} selected={demo.position === p} onPress={() => demo.setPosition(p)} />
          ))}
        </View>
        <Text style={styles.hint}>Os demos acima usam a posição selecionada aqui.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Tamanho · Variante</Text>
        <View style={styles.wrap}>
          {SIZES.map((s) => (
            <Chip key={s} label={s} selected={demo.size === s} onPress={() => demo.setSize(s)} />
          ))}
          {VARIANTS.map((v) => (
            <Chip key={v} label={v} selected={demo.variant === v} onPress={() => demo.setVariant(v)} />
          ))}
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Tema</Text>
        <View style={styles.wrap}>
          {THEMES.map((t) => (
            <Chip key={t} label={t} selected={demo.theme === t} onPress={() => demo.setTheme(t)} />
          ))}
        </View>
        <Text style={styles.hint}>
          "system" segue o prefers-color-scheme do SO/browser.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Stack (liquid glass depth)</Text>
        <View style={styles.wrap}>
          {STACK_MODES.map((m) => (
            <Chip key={m} label={m} selected={demo.stackMode === m} onPress={() => demo.setStackMode(m)} />
          ))}
          {STACK_GAPS.map((g) => (
            <Chip key={g} label={`gap: ${g}`} selected={demo.stackGap === g} onPress={() => demo.setStackGap(g)} />
          ))}
        </View>
        <Text style={styles.hint}>Experimenta o "Burst ×3" com stack vs list.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Opções</Text>
        <View style={styles.wrap}>
          <Chip label="dismissible" selected={demo.dismissible} onPress={() => demo.setDismissible((v) => !v)} />
          <Chip label="animated icon" selected={demo.animatedIcon} onPress={() => demo.setAnimatedIcon((v) => !v)} />
        </View>
      </View>

      <Text style={styles.footer}>{'ToastProvider → toast.show({ position, size, variant, ... })'}</Text>
    </ScrollView>
  )
}

function Chip(props: { label: string; onPress: () => void; selected?: boolean; accent?: boolean }) {
  const { label, onPress, selected, accent } = props
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected, accent && styles.chipAccent]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  )
}

export default function App() {
  const demo = useDemoState()

  return (
    <ToastProvider
      position={demo.position}
      size={demo.size}
      variant={demo.variant}
      theme={demo.theme}
      stackMode={demo.stackMode}
      stackGap={demo.stackGap}
      animatedIcon={demo.animatedIcon}
      duration={4200}
      maxToasts={4}
      inset={14}
      blur={22}
    >
      <Playground demo={demo} />
    </ToastProvider>
  )
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    padding: 24,
    gap: 18,
    maxWidth: 860,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    gap: 4,
    paddingTop: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.6,
  },
  panel: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(128,128,140,0.35)',
    padding: 16,
    gap: 10,
  },
  panelTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.55,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  spacerTop: {
    marginTop: 4,
  },
  demoCell: {
    alignItems: 'center',
    gap: 2,
  },
  demoHint: {
    fontSize: 10,
    opacity: 0.45,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(128,128,140,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipSelected: {
    backgroundColor: '#2f6fed',
    borderColor: '#2f6fed',
  },
  chipAccent: {
    borderColor: '#8b5cf6',
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  hint: {
    fontSize: 12,
    opacity: 0.5,
  },
  footer: {
    fontSize: 11,
    opacity: 0.4,
    textAlign: 'center',
    paddingVertical: 16,
  },
})
