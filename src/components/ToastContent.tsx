import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'

import type { GlassTokens, IconBadgeStyle, SolidTokens, ToastEntry } from '../types/toast'
import { ACTION_METRICS, SIZE_METRICS } from '../constants/defaults'
import { ToastIcon } from './icons'

type MaterialTokens = GlassTokens | SolidTokens

/** Resolves the background color of the circular icon badge. */
function badgeBackground(style: IconBadgeStyle, tokens: MaterialTokens, type: ToastEntry['type']): string | undefined {
  if (style === 'solid') return tokens.accents[type]
  if (style === 'soft') return tokens.badgeSoft[type]
  return undefined
}

/** Resolves the glyph color inside the badge. */
function glyphColor(style: IconBadgeStyle, tokens: MaterialTokens, type: ToastEntry['type']): string {
  return style === 'solid' ? '#FFFFFF' : tokens.accents[type]
}

/** Icon badge + title + description + optional action button. */
export function ToastContent(props: {
  toast: ToastEntry
  tokens: MaterialTokens
  animatedIcon: boolean
  onActionPress: (action: ToastEntry['action']) => void
}) {
  const { toast, tokens, animatedIcon, onActionPress } = props
  const metrics = SIZE_METRICS[toast.size]
  const Icon = toast.icon
  const badge = badgeBackground(toast.iconBadge, tokens, toast.type)
  const glyph = glyphColor(toast.iconBadge, tokens, toast.type)
  const actionMetrics = ACTION_METRICS[toast.size]

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.badge,
          {
            width: metrics.badge,
            height: metrics.badge,
            borderRadius: metrics.badge / 2,
            backgroundColor: badge,
            borderWidth: toast.iconBadge === 'bare' ? 0 : 1,
            borderColor: toast.iconBadge === 'soft' ? tokens.border : 'transparent',
          },
        ]}
      >
        {Icon ? (
          <Icon type={toast.type} size={metrics.icon} color={glyph} />
        ) : (
          <ToastIcon type={toast.type} size={metrics.icon} color={glyph} animated={animatedIcon} />
        )}
      </View>

      <View style={[styles.texts, { gap: metrics.gap }]}>
        {toast.title !== '' && (
          <Text
            style={[styles.title, { color: tokens.text, fontSize: metrics.title, fontFamily: toast.fontFamily || undefined }]}
            numberOfLines={2}
          >
            {toast.title}
          </Text>
        )}
        {toast.description !== '' && (
          <Text
            style={[
              styles.description,
              { color: tokens.textMuted, fontSize: metrics.description, fontFamily: toast.fontFamily || undefined },
            ]}
            numberOfLines={3}
          >
            {toast.description}
          </Text>
        )}
      </View>

      {toast.action ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={toast.action.label}
          hitSlop={6}
          onPress={() => onActionPress(toast.action)}
          style={({ pressed }) => [
            styles.action,
            pressed && styles.actionPressed,
            {
              backgroundColor: tokens.actionBg,
              borderRadius: 999,
              paddingHorizontal: actionMetrics.paddingX,
              paddingVertical: actionMetrics.paddingY,
            },
          ]}
        >
          <Text
            style={[
              styles.actionText,
              {
                color: tokens.actionText,
                fontSize: actionMetrics.fontSize,
                fontFamily: toast.fontFamily || undefined,
              },
            ]}
            numberOfLines={1}
          >
            {toast.action.label}
          </Text>
        </Pressable>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
  action: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: Platform.select({ web: 'pointer' }) as never,
  },
  actionPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  actionText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
})
