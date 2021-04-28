import { useState, useEffect } from 'react'
import Axios from 'axios'

export interface IDataSourceProps {
  code: string
  name: string
  children?: object
}

interface AxiosProps {
  url: string
  method?: 'get' | 'post'
}

function useSelectData({ url }: AxiosProps) {
  const [dataSource, setDataSource] = useState<IDataSourceProps[]>([])
  const [state, setState] = useState<string>('')

  const search = async () => {
    setState('loading')
    try {
      const result = await Axios({
        url,
      })
      setDataSource(result ? queryDataList(result.data) : [])
      setState('success')
    } catch (err) {
      setState('error')
    }
  }

  /**
   * 修改数据格式
   * @param {Array} newData 要改变的数据源
   */
  const queryDataList = (data: IDataSourceProps[]) => {
    let newData = data.map((item: IDataSourceProps) => {
      return {
        ...item,
        value: item.code,
        label: item.name,
        split: splitArr(item.code),
      }
    })
    return newData
  }

  /**
   * 按照位数分割字符串
   */
  const splitArr = (str: string) => {
    //先将str转换为数组
    let result = []
    while (str.length > 2) {
      result.push(str.slice(0, 2))
      str = str.slice(str.length - 2)
      console.log(str)
    }
    console.log(result)
    return result
  }

  useEffect(() => {
    search()
  }, [])

  return {
    dataSource,
    state,
  }
}

export default useSelectData
