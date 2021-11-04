import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'antd/dist/antd.css'

import '@assets/global.less'
import RouterEntry from './router'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterEntry />
    </ConfigProvider>
  )
}

export default App
