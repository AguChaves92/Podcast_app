import { useContext } from 'react'

import { MyContext } from '../context/context'

export const useContextProvider = () => {
  return useContext(MyContext)
}
