import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Button } from '@repo/ui'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="flex gap-4">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold">Administrator Quadrant</h1>
        <div className="card">
          <p className="mb-4">
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
          <Button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </Button>
        </div>
        <p className="read-the-docs text-gray-500">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default App
