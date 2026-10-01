import { StyleSheet, Text, View } from 'react-native'

import type { ToastEntry, GlassTokens, SolidTokens } from '../types/toast'
import { SIZE_METRICS } from '../constants/defaults'
import { ToastIcon } from './icons'

/** Icon + title + description block of a toast. */
export function ToastContent(props: {
  toast: ToastEntry
  tokens: GlassTokens | SolidTokens
  animatedIcon: boolean
}) {
  const { toast, tokens, animatedIcon } = props
  const metrics = SIZE_METRICS[toast.size]
  const accent = tokens.accents[toast.type]
  const Icon = toast.icon

  return (
    <View style={styles.row}>
      {Icon ? (
        <View style={[styles.iconSlot, { width: metrics.icon, height: metrics.icon }]}>
          <Icon type={toast.type} size={metrics.icon} color={accent} />
        </View>
      ) : (
        <View style={[styles.iconSlot, { width: metrics.icon, height: metrics.icon }]}>
          <ToastIcon type={toast.type} size={metrics.icon} color={accent} animated={animatedIcon} />
        </View>
      )}

      <View style={[styles.texts, { gap: metrics.gap }]}>
        {toast.title !== '' && (
          <Text style={[styles.title, { color: tokens.text, fontSize: metrics.title }]} numberOfLines={2}>
            {toast.title}
          </Text>
        )}
        {toast.description !== '' && (
          <Text style={[styles.description, { color: tokens.textMuted, fontSize: metrics.description }]} numberOfLines={3}>
            {toast.description}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  texts: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontWeight: '600',
  },
  description: {
    fontWeight: '400',
    lineHeight: undefined,
  },
})
