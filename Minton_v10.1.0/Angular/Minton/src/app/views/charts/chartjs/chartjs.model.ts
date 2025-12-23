import { ChartConfiguration, ChartTypeRegistry, Plugin } from 'chart.js'

// Corrected ChartType interface
export interface ChartType {
  data?: ChartConfiguration['data']
  options?: ChartConfiguration['options']
  plugins?: Plugin<keyof ChartTypeRegistry, Object>[]
  type?: ChartConfiguration['type']
}

export function hexToRGB(hex: string, alpha: number) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }
}
