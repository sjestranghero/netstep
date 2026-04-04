import './src/styles/main.css'
import { supabase } from './src/supabase.js'

async function init() {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { renderDashboard } = await import('./src/pages/dashboard.js')
    await renderDashboard()
  } else {
    window.location.hash = ''
    const { renderApp } = await import('./src/pages/home.js')
    renderApp()
  }
}

init()