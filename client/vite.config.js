import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// server: {
//   proxy: {
//     '/socket.io': {
//       target: 'http://localhost:3000',
//       ws: true
//     }
//   }
// }
export default defineConfig({
  plugins: [react()]
})
