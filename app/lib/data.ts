export const getDataExercise1 = async () => {
    const res = await fetch('http://demo7835163.mockable.io/exercise1', { cache: 'no-store' })
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
}

export const getDataExercise2 = async () => {
    const res = await fetch('http://demo7835163.mockable.io/exercise2', { cache: 'no-store' })
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json()
}