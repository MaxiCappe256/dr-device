import React from 'react'

export default function Error({ message }) {
  return (
    <p className="text-sm text-red-500">{message}</p>
  )
}
