import {useEffect} from 'react'

export const useTitle = (title) => {
  useEffect(()=>{
    const prevTitle = document.tittle
    document.title = title
    return ()=> document.title = prevTitle
  }, [title])
}
