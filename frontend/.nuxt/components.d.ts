
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AppFooter: typeof import("../components/AppFooter.vue")['default']
export const GlassCard: typeof import("../components/GlassCard.vue")['default']
export const HoloBadge: typeof import("../components/HoloBadge.vue")['default']
export const NavBar: typeof import("../components/NavBar.vue")['default']
export const ToolCard: typeof import("../components/ToolCard.vue")['default']
export const Alic3xAnalytics: typeof import("../components/alic3x/Analytics.vue")['default']
export const Alic3xChatInterface: typeof import("../components/alic3x/ChatInterface.vue")['default']
export const Alic3xKnowledgeBase: typeof import("../components/alic3x/KnowledgeBase.vue")['default']
export const Alic3xSettings: typeof import("../components/alic3x/Settings.vue")['default']
export const Alic3xSidebar: typeof import("../components/alic3x/Sidebar.vue")['default']
export const Alic3xTaskManager: typeof import("../components/alic3x/TaskManager.vue")['default']
export const Alic3xWebSearch: typeof import("../components/alic3x/WebSearch.vue")['default']
export const UiAlert: typeof import("../components/ui/Alert.vue")['default']
export const UiAlertDescription: typeof import("../components/ui/AlertDescription.vue")['default']
export const UiAlertTitle: typeof import("../components/ui/AlertTitle.vue")['default']
export const UiBadge: typeof import("../components/ui/Badge.vue")['default']
export const UiButton: typeof import("../components/ui/Button.vue")['default']
export const UiCard: typeof import("../components/ui/Card.vue")['default']
export const UiCardContent: typeof import("../components/ui/CardContent.vue")['default']
export const UiCardDescription: typeof import("../components/ui/CardDescription.vue")['default']
export const UiCardFooter: typeof import("../components/ui/CardFooter.vue")['default']
export const UiCardHeader: typeof import("../components/ui/CardHeader.vue")['default']
export const UiCardTitle: typeof import("../components/ui/CardTitle.vue")['default']
export const UiInput: typeof import("../components/ui/Input.vue")['default']
export const UiInputGroup: typeof import("../components/ui/InputGroup.vue")['default']
export const UiLabel: typeof import("../components/ui/Label.vue")['default']
export const UiSwitch: typeof import("../components/ui/Switch.vue")['default']
export const UiTextarea: typeof import("../components/ui/Textarea.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAppFooter: LazyComponent<typeof import("../components/AppFooter.vue")['default']>
export const LazyGlassCard: LazyComponent<typeof import("../components/GlassCard.vue")['default']>
export const LazyHoloBadge: LazyComponent<typeof import("../components/HoloBadge.vue")['default']>
export const LazyNavBar: LazyComponent<typeof import("../components/NavBar.vue")['default']>
export const LazyToolCard: LazyComponent<typeof import("../components/ToolCard.vue")['default']>
export const LazyAlic3xAnalytics: LazyComponent<typeof import("../components/alic3x/Analytics.vue")['default']>
export const LazyAlic3xChatInterface: LazyComponent<typeof import("../components/alic3x/ChatInterface.vue")['default']>
export const LazyAlic3xKnowledgeBase: LazyComponent<typeof import("../components/alic3x/KnowledgeBase.vue")['default']>
export const LazyAlic3xSettings: LazyComponent<typeof import("../components/alic3x/Settings.vue")['default']>
export const LazyAlic3xSidebar: LazyComponent<typeof import("../components/alic3x/Sidebar.vue")['default']>
export const LazyAlic3xTaskManager: LazyComponent<typeof import("../components/alic3x/TaskManager.vue")['default']>
export const LazyAlic3xWebSearch: LazyComponent<typeof import("../components/alic3x/WebSearch.vue")['default']>
export const LazyUiAlert: LazyComponent<typeof import("../components/ui/Alert.vue")['default']>
export const LazyUiAlertDescription: LazyComponent<typeof import("../components/ui/AlertDescription.vue")['default']>
export const LazyUiAlertTitle: LazyComponent<typeof import("../components/ui/AlertTitle.vue")['default']>
export const LazyUiBadge: LazyComponent<typeof import("../components/ui/Badge.vue")['default']>
export const LazyUiButton: LazyComponent<typeof import("../components/ui/Button.vue")['default']>
export const LazyUiCard: LazyComponent<typeof import("../components/ui/Card.vue")['default']>
export const LazyUiCardContent: LazyComponent<typeof import("../components/ui/CardContent.vue")['default']>
export const LazyUiCardDescription: LazyComponent<typeof import("../components/ui/CardDescription.vue")['default']>
export const LazyUiCardFooter: LazyComponent<typeof import("../components/ui/CardFooter.vue")['default']>
export const LazyUiCardHeader: LazyComponent<typeof import("../components/ui/CardHeader.vue")['default']>
export const LazyUiCardTitle: LazyComponent<typeof import("../components/ui/CardTitle.vue")['default']>
export const LazyUiInput: LazyComponent<typeof import("../components/ui/Input.vue")['default']>
export const LazyUiInputGroup: LazyComponent<typeof import("../components/ui/InputGroup.vue")['default']>
export const LazyUiLabel: LazyComponent<typeof import("../components/ui/Label.vue")['default']>
export const LazyUiSwitch: LazyComponent<typeof import("../components/ui/Switch.vue")['default']>
export const LazyUiTextarea: LazyComponent<typeof import("../components/ui/Textarea.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.21.2_@emnapi+core@1.9.2_@emnapi+runtime@1.9.2_@parcel+watcher@2.5.6_@types+node@_2f27a85eaa73e0aae1af53c909061f49/node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
