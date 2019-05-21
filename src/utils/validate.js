/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
function isEmail(email) {
  return /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(email)
}

/**
 * @param {string || number} mobile
 * @returns {Boolean}
 */
function isMobile(mobile) {
  return /^1(3|4|5|7|8)\d{9}$/.test(mobile)
}

/**
 * @param {string|| number} cardid
 * @returns {Boolean}
 */
function isCardId(cardid) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(cardid)
}

/** 用户名正则，4到16位（字母，数字，下划线，减号）
 * @param {string|| number} username
 * @returns {Boolean}
 */
function isUserName(username) {
  return /^[a-zA-Z0-9_-]{4,16}$/.test(username)
}

/** 校验密码：只能输入6-20个字母、数字、下划线
 * @param {string || number}  pwd
 * @returns {Boolean}
 */
function isPasswd(pwd) {
  return /^(\w){6,20}$/.test(pwd)
}

/** 校验邮政编码
 * @param {string}
 * @returns {Boolean}
 */
function isPostalCode(s) {
  return /^[a-zA-Z0-9 ]{3,12}$/.test(s)
}

const validate = {
  isExternal,
  isMobile,
  isEmail,
  isCardId,
  isUserName,
  isPasswd,
  isPostalCode
}

export default validate
