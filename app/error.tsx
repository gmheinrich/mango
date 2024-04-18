'use client'

export default function Error(error: Error) {
    console.error(error)
    return <h1>Something went wrong!</h1>
  }