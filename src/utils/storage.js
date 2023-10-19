// 权证信息
const INFO_KEY = 'hm_shopping_info'
const defaultInfo = {
  userId: '',
  token: ''
}
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 搜索页面历史数据
const SEARCHHISTORY = 'searchHistory'
export const getHistory = () => {
  const result = localStorage.getItem(SEARCHHISTORY)
  return result ? JSON.parse(result) : []
}
export const setHistory = (newList) => {
  localStorage.setItem(SEARCHHISTORY, JSON.stringify(newList))
}
export const removeHistory = () => {
  localStorage.removeItem(SEARCHHISTORY)
}
