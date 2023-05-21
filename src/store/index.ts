import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

interface ChekboxesState {
  disableEnter: boolean
  minifyOnPaste: boolean
  setDisableEnter: (disableEnter: boolean) => void
  setMinifyOnPaste: (minifyOnPaste: boolean) => void
}

export const checkboxesStore = createStore<ChekboxesState>()(
  persist(
    (set) => ({
      disableEnter: false,
      minifyOnPaste: true,
      setDisableEnter: (disableEnter: boolean) => {
        set({ disableEnter })
      },
      setMinifyOnPaste: (minifyOnPaste: boolean) => {
        set({ minifyOnPaste })
      },
    }),
    {
      name: 'checkboxes',
    },
  ),
)

interface InputTokensState {
  inputTokens: number
  setInputTokens: (inputTokens: number) => void
}

export const inputTokensStore = createStore<InputTokensState>()((set) => ({
  inputTokens: 0,
  setInputTokens: (inputTokens: number) => {
    set({ inputTokens })
  },
}))
