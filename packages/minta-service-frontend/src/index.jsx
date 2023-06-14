import { createRoot } from 'react-dom/client'
// import 'app/styles/index.scss'
// import 'app/styles/global.module.scss'
import { App } from 'app'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)