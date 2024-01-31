import './index.css'

import { ThemeProvider } from './components/theme-provider'
import { Button } from './components/ui/button'

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="@finote">
      <div>
        <Button>Click me</Button>
      </div>
    </ThemeProvider>
  )
}
