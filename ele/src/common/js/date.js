export function formDate(date, template) {
  // 'yyyy-dd-MM hh:mm'
  //  yy 17  yyyy 2017
  if (/(y+)/g.test(template)) {
    template = template.replace(/(y+)/g, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(template)) {
      let str = o[k] + ''
      template = template.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return template
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
