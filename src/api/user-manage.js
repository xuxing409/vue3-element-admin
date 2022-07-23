import request from '@/utils/request'
/**
 * 获取用户列表数据
 */
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}
/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}
/**
 *  批量上传
 */
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}

/**
 * 获取用户详情
 */
export const userDetail = (id) => {
  return request({
    url: `/user-manage/detail/${id}`
  })
}
