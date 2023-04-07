import { LoginPage } from '@pages/home/modules/login'
import { initNavigation } from '@pages/index'

const container = document.querySelector('#root')

if (!container) {
  throw new Error('Element #root not found')
}

container.innerHTML = LoginPage()

initNavigation()
