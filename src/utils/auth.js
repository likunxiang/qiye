import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const AdminId = 'Admin-Id'

const DeptId = 'Dept-Id'

const ExpiresInKey = 'Admin-Expires-In'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getAdminId() {
  return Cookies.get(AdminId)
}

export function setAdminId(userid) {
  return Cookies.set(AdminId, userid)
}

export function removeAdminId() {
  return Cookies.remove(AdminId)
}

export function getDeptId() {
  return Cookies.get(DeptId)
}

export function setDeptId(deptId) {
  return Cookies.set(DeptId, deptId)
}

export function removeDeptId() {
  return Cookies.remove(DeptId)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time)
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey)
}
