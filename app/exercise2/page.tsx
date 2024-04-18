import { Range } from "../components/range/range"
import { getDataExercise2 } from "../lib/data"

export default async function Page() {
  const { rangeValues } = await getDataExercise2()
  //[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
  return (
    <>
      <h1>Exercise 2</h1>
      <div className="flex w-[800px] justify-center items-center p-10">
        <Range range={rangeValues} rangeType />
      </div>  
    </>
  )
}