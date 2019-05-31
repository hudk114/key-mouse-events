/**
 * env.js用于判断是否可以使用新特性
 * 老版本浏览器支持的一些功能在新版标准里已被取消
 * 在某些浏览器（如ipad上的safari）中，部分老版本标准已经不支持
 * 所以会先判断最新api
 */

// 使用env.key or env.keyCode
export const keyEventPropName = (function () {
  // TODO
  // return 'key';
  return 'keyCode';
})();
