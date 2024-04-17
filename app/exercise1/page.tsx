import { Range } from "../components/range"

export default function Page() {
  return (
    <>
      <h1>Exercise 1</h1>
      <div className="flex w-[800px] justify-center items-center p-10">
        <Range min={10.99} max={70.99} />
      </div>
    </>
    )
  }