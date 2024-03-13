import { useState } from 'react'

export const useField = (type, formActions = null) => {
    
  const [value, setValue] = useState('')

  const onChange = (event) => {

    const value = event.target?.value ? event.target.value : event

    setValue(value)
  }

  const onClick = (event) => {
    const { contentHook, authorHook, infoHook } = formActions

    contentHook.onChange('')
    authorHook.onChange('')
    infoHook.onChange('')
  }

  switch(type) {
    case 'button':
        return {
            type,
            onClick
        }
    default:
        return {
            type,
            value,
            onChange
          }
  }
}