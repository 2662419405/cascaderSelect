/**
 * 按照位数分割字符串
 */
 const splitArr = (str: string, n = 2) => {
  let result = []
  for (let i = 0, l = str.length; i < l / n; i++) {
    let _numberStr = str.slice(n * i, n * (i + 1))
    result.push(_numberStr)
  }
  if (result.length === 5) {
    result[3] = result[3].concat(result[4])
    result.length = 4
  }
  return result
}

/**
 * 校验数据长度
 */
const checkValueLength = (str:string) =>{
    if(str && (str.length === 2 ||
      str.length === 4 ||
      str.length === 6 ||
      str.length === 8 ||
      str.length === 9)){
        return true
    }else{
      return false
    }
}

export { splitArr, checkValueLength }
