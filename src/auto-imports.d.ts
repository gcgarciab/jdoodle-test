/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by unplugin-auto-import
export {}
declare global {
  const DEFAULT_JAVA: typeof import('./modules/exam/constants/defaultJava')['DEFAULT_JAVA']
  const DEFAULT_PHP: typeof import('./modules/exam/constants/defaultPhp')['DEFAULT_PHP']
  const DEFAULT_PYTHON: typeof import('./modules/exam/constants/defaultPython')['DEFAULT_PYTHON']
  const DEFAULT_TYPESCRIPT: typeof import('./modules/exam/constants/defaultTypescript')['DEFAULT_TYPESCRIPT']
  const EffectScope: typeof import('vue')['EffectScope']
  const ExamEnum: typeof import('./modules/exam/enums/examEnum')['ExamEnum']
  const NOTIFY_OPTIONS: typeof import('./common/constants/notifyOptions')['NOTIFY_OPTIONS']
  const QUESTIONS: typeof import('./modules/exam/constants/questions')['QUESTIONS']
  const QuasarOptions: typeof import('./plugins/quasar')['QuasarOptions']
  const SCRIPT_RESULT: typeof import('./mocks/data/exam')['SCRIPT_RESULT']
  const afterAll: typeof import('vitest')['afterAll']
  const afterEach: typeof import('vitest')['afterEach']
  const assert: typeof import('vitest')['assert']
  const auth: typeof import('./stores/auth')['default']
  const authRoutes: typeof import('./modules/auth/routes')['authRoutes']
  const axios: typeof import('./plugins/axios')['default']
  const axiosInstance: typeof import('./plugins/axios')['axiosInstance']
  const beforeAll: typeof import('vitest')['beforeAll']
  const beforeEach: typeof import('vitest')['beforeEach']
  const browser: typeof import('./mocks/browser')['default']
  const chai: typeof import('vitest')['chai']
  const checkFormKeyError: typeof import('./common/utils/checkFormKeyError')['default']
  const computed: typeof import('vue')['computed']
  const createApp: typeof import('vue')['createApp']
  const createPinia: typeof import('pinia')['createPinia']
  const createTestingPinia: typeof import('@pinia/testing')['createTestingPinia']
  const customRef: typeof import('vue')['customRef']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  const defineComponent: typeof import('vue')['defineComponent']
  const defineStore: typeof import('pinia')['defineStore']
  const delay: typeof import('./common/utils/delay')['default']
  const describe: typeof import('vitest')['describe']
  const effectScope: typeof import('vue')['effectScope']
  const email: typeof import('@vuelidate/validators')['email']
  const exam: typeof import('./stores/exam')['default']
  const examRequests: typeof import('./mocks/requests/exam')['examRequests']
  const examRoutes: typeof import('./modules/exam/routes')['examRoutes']
  const expect: typeof import('vitest')['expect']
  const getCurrentInstance: typeof import('vue')['getCurrentInstance']
  const getCurrentScope: typeof import('vue')['getCurrentScope']
  const getStoreState: typeof import('./common/utils/getStoreState')['default']
  const h: typeof import('vue')['h']
  const handlers: typeof import('./mocks/handlers')['default']
  const helpers: typeof import('@vuelidate/validators')['helpers']
  const inject: typeof import('vue')['inject']
  const isProxy: typeof import('vue')['isProxy']
  const isReactive: typeof import('vue')['isReactive']
  const isReadonly: typeof import('vue')['isReadonly']
  const isRef: typeof import('vue')['isRef']
  const it: typeof import('vitest')['it']
  const markRaw: typeof import('vue')['markRaw']
  const maxLength: typeof import('@vuelidate/validators')['maxLength']
  const minLength: typeof import('@vuelidate/validators')['minLength']
  const mount: typeof import('@vue/test-utils')['mount']
  const nextTick: typeof import('vue')['nextTick']
  const notifyOptions: typeof import('./common/constants/notifyOptions')['default']
  const numeric: typeof import('@vuelidate/validators')['numeric']
  const onActivated: typeof import('vue')['onActivated']
  const onBeforeMount: typeof import('vue')['onBeforeMount']
  const onBeforeRouteLeave: typeof import('vue-router')['onBeforeRouteLeave']
  const onBeforeRouteUpdate: typeof import('vue-router')['onBeforeRouteUpdate']
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount']
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate']
  const onDeactivated: typeof import('vue')['onDeactivated']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const onMounted: typeof import('vue')['onMounted']
  const onRenderTracked: typeof import('vue')['onRenderTracked']
  const onRenderTriggered: typeof import('vue')['onRenderTriggered']
  const onScopeDispose: typeof import('vue')['onScopeDispose']
  const onServerPrefetch: typeof import('vue')['onServerPrefetch']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onUpdated: typeof import('vue')['onUpdated']
  const provide: typeof import('vue')['provide']
  const randomIntFromInterval: typeof import('./common/utils/randomIntFromInterval')['default']
  const reactive: typeof import('vue')['reactive']
  const readonly: typeof import('vue')['readonly']
  const ref: typeof import('vue')['ref']
  const requests: typeof import('./plugins/axios')['requests']
  const required: typeof import('@vuelidate/validators')['required']
  const requiredIf: typeof import('@vuelidate/validators')['requiredIf']
  const resolveComponent: typeof import('vue')['resolveComponent']
  const router: typeof import('./router/index')['default']
  const routes: typeof import('./modules/exam/routes')['default']
  const sameAs: typeof import('@vuelidate/validators')['sameAs']
  const server: typeof import('./mocks/server')['default']
  const setActivePinia: typeof import('pinia')['setActivePinia']
  const shallowMount: typeof import('@vue/test-utils')['shallowMount']
  const shallowReactive: typeof import('vue')['shallowReactive']
  const shallowReadonly: typeof import('vue')['shallowReadonly']
  const shallowRef: typeof import('vue')['shallowRef']
  const showFormKeyError: typeof import('./common/utils/showFormKeyError')['default']
  const showNotify: typeof import('./common/utils/showNotify')['default']
  const shuffleList: typeof import('./common/utils/shuffleList')['default']
  const storeToRefs: typeof import('pinia')['storeToRefs']
  const suite: typeof import('vitest')['suite']
  const test: typeof import('vitest')['test']
  const toRaw: typeof import('vue')['toRaw']
  const toRef: typeof import('vue')['toRef']
  const toRefs: typeof import('vue')['toRefs']
  const toValue: typeof import('vue')['toValue']
  const triggerRef: typeof import('vue')['triggerRef']
  const unref: typeof import('vue')['unref']
  const useAttrs: typeof import('vue')['useAttrs']
  const useAuthStore: typeof import('./stores/auth')['useAuthStore']
  const useCssModule: typeof import('vue')['useCssModule']
  const useCssVars: typeof import('vue')['useCssVars']
  const useExamStore: typeof import('./stores/exam')['useExamStore']
  const useLink: typeof import('vue-router')['useLink']
  const useLoading: typeof import('./common/composables/useLoading')['useLoading']
  const useRoute: typeof import('vue-router')['useRoute']
  const useRouter: typeof import('vue-router')['useRouter']
  const useSlots: typeof import('vue')['useSlots']
  const useVuelidate: typeof import('@vuelidate/core')['useVuelidate']
  const vi: typeof import('vitest')['vi']
  const vitest: typeof import('vitest')['vitest']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const watchPostEffect: typeof import('vue')['watchPostEffect']
  const watchSyncEffect: typeof import('vue')['watchSyncEffect']
  const worker: typeof import('./mocks/browser')['worker']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { Component, ComponentPublicInstance, ComputedRef, ExtractDefaultPropTypes, ExtractPropTypes, ExtractPublicPropTypes, InjectionKey, PropType, Ref, VNode, WritableComputedRef } from 'vue'
  import('vue')
}
