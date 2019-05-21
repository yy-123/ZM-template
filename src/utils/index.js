/*
 * @Author: YOYO  2019-5-15 1
 * @Last Modified by: yy 2019-5-15
 */

/** 时间转为年月日时分秒星期
 * @param {(Object|string|number)} time
 * @param {string} cFormat  年 月 日 小时 分钟 秒 星期几
 * @returns {string}
 * @example  parseTime(19576682237, '{y}-{m}-{d}-{a}')
 * @example  parseTime('Jan 16, 2019 2:49:47 PM' ,'{y}')
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// getYear
function getYear() {
  return new Date().getFullYear()
}

/** 接收时间戳转为需要的相关时间单位
 * @param {number} time
 * @param {string} option
 * @returns {string}
 * @example  formatTime(19576682237, '{y}-{m}-{d}')
 */
function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分')
  }
}

/** 获取url中的param值转为obj
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/** 将指定的代码对象解析出key数组
 * @param  {Object} codeMapObject
 * @returns {array}
 */
function getCodeMapArr(codeMapObject) {
  const arr = []
  for (const item in codeMapObject) {
    const obj = codeMapObject[item]
    obj.key = obj.key + ''
    arr.push(obj)
  }
  return arr
}

/**
 * @param {object} codeMap
 * @param {string} field
 * @param {string} key
 */
function getValueForFieldKey(codeMap, field, key) {
  if (key != null && key !== '') {
    return codeMap[field][key].value
  } else {
    return ''
  }
}

const utils = {
  parseTime,
  formatTime,
  getYear,
  param2Obj,
  getCodeMapArr,
  getValueForFieldKey
}

export default utils
