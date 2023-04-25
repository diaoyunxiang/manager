import request from '@/utils/request'
export function getUserInfo(current, pageSize) {
  return request({
    url: `/api/users/all-users/${current}/${pageSize}`,
    method: 'get'
  })
}
export function change(data) {
  return request({
    url: '/api/users/user',
    method: 'put',
    data
  })
}
export function deleteUser({ _id }) {
  return request({
    url: `/api/users/user/${_id}`,
    method: 'delete'
  })
}
// 获取所有图片
export function getAllPicture() {
  return request({
    url: '/api/ads/all-ads',
    method: 'get'
  })
}
// 添加广告
export function addAds(data) {
  return request({
    url: '/api/ads/ad',
    method: 'post',
    data
  })
}
// 删除广告
export function deleteAds(data) {
  return request({
    url: `/api/ads/ad/${data}`,
    method: 'delete',
    data
  })
}
