// 过滤需要保存的路由tag

const whiteList = ['/login', '/404', '/401']

export function isTags(path) {
  return !whiteList.includes(path)
}
