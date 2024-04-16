import { Range } from "../components/range"

export default function Page() {


    return (
        <>
            <h1>Exercise 1</h1>
            <div className="flex w-[800px] justify-center items-center p-10">
              <Range min={5.99} max={70.99} />
            </div>

            <h1>Exercise 2</h1>
            <div className="flex w-[800px] justify-center items-center p-10">
              <Range range={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]} />
            </div> 
        </>
    )
  }