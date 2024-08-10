import { TextareaForm } from './elements/Editor'
import './App.css'
import Header from './elements/Header'
import { ThemeProvider } from "./components/theme-provider"
function App() {

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header/>
      <TextareaForm/>
      </ThemeProvider>
    </>
  )
}

export default App
