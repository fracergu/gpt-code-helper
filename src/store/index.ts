import { createStore } from 'zustand/vanilla'

interface AppState {
  minifyOnPaste: boolean
  disableEnter: boolean
  inputTokens: number
  setMinifyOnPaste: (minifyOnPaste: boolean) => void
  setDisableEnter: (disableEnter: boolean) => void
  setInputTokens: (inputTokens: number) => void
}

const store = createStore<AppState>((set) => ({
  minifyOnPaste: localStorage.getItem('minifyOnPaste') === 'true',
  disableEnter: localStorage.getItem('disableEnter') === 'true',
  inputTokens: 0,
  setMinifyOnPaste: (minifyOnPaste: boolean) => {
    set({ minifyOnPaste })
  },
  setDisableEnter: (disableEnter: boolean) => {
    set({ disableEnter })
  },
  setInputTokens: (inputTokens: number) => {
    set({ inputTokens })
  },
}))

const persistState = (state: AppState) => {
  localStorage.setItem('minifyOnPaste', state.minifyOnPaste.toString())
  localStorage.setItem('disableEnter', state.disableEnter.toString())
}

store.subscribe(persistState)

export default store
