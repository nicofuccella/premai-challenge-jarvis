import { useEffect, useRef, useState } from "react"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type UseTypewriterReturnType = {
  result: string
  isAnimationFinished: boolean
}

type TypewriterState = {
  resultArray: string[]
  setResultArray: (resultArray: string[]) => void
  addWord: (word: string) => void
  isAnimationFinished: boolean
  setIsAnimationFinished: (isAnimationFinished: boolean) => void
}

const useTypewriter = (text: string, animate: boolean): UseTypewriterReturnType => {
  const [useTypewriterState] = useState(() => create<TypewriterState>()(
    immer(
      (set) => ({
        resultArray: [],
        setResultArray: (resultArray): void => {
          set(state => {
            state.resultArray = resultArray
          })
        },
        addWord: (word): void => {
          set(state => {
            state.resultArray.push(word)
          })
        },
        isAnimationFinished: false,
        setIsAnimationFinished: (isAnimationFinished): void => {
          set(state => {
            state.isAnimationFinished = isAnimationFinished
          })
        }
      })
    )
  ))

  const resultArray = useTypewriterState((state) => state.resultArray)
  const setResultArray = useTypewriterState((state) => state.setResultArray)
  const addWord = useTypewriterState((state) => state.addWord)
  const isAnimationFinished = useTypewriterState((state) => state.isAnimationFinished)
  const setIsAnimationFinished = useTypewriterState((state) => state.setIsAnimationFinished)

  const current = useRef<string[]>(text.trim().split(" ").reverse())

  useEffect(() => {
    if (!animate) {
      setIsAnimationFinished(true)
      setResultArray([text.trim().split(" ").join(" ")])
      return
    }

    setIsAnimationFinished(false)
    setResultArray([])

    const interval = setInterval(() => {
      if (current.current.length === 0) {
        setIsAnimationFinished(true)
        clearInterval(interval)
      }

      addWord(current.current.pop() ?? " ")
    }, 750)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    result: resultArray.join(" ").trim(),
    isAnimationFinished
  }
}

export default useTypewriter