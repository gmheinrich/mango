import { Range } from "../components/range"
import { getDataExercise1 } from "../lib/data";

export default async function Page() {
  const { min, max } = await getDataExercise1()

  return (
    <>
      <h1>Exercise 1</h1>
      <div className="flex w-[800px] justify-center items-center p-10">
        <Range min={min} max={max} />
        {/* <Range min={1} max={100} /> */}
      </div>
    </>
    )
  }