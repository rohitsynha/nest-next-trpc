import { trpc } from "@client/app/trpc"
import { useState } from "react"

export default function Chat() {
    const [input, setInput] = useState("")
    const [resp, setResp] = useState("")
    const handleClick = async (event) => {
      const response = await trpc.aiChat.query({"queryText": input})
      setResp(response as string)
    }
    return (
      <div>

                <label htmlFor="first">Input</label>
                <input type="text" id="input" name="input" value={input} required onChange={(event) => setInput(event.target.value)} />

                <button type="submit" onClick={handleClick}>Submit</button>

                <p>{resp}</p>

      </div>
    )
  }