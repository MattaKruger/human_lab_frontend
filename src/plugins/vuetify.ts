/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#0d0d0d',
          secondary: '#cddc39',
          accent: '#1A237E',
          error: '#f44336',
          warning: '#ffc107',
          info: '#e91e63',
          success:'#8bc34a',
          background:'#009688'
        }
      }
    }
  }
});