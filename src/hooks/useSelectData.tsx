import { useState, useEffect } from 'react'
import Axios from 'axios'

export interface IDataSourceProps {
  code: string
  name: string
  children?: IDataSourceProps[]
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
      }
    })
    return newData
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
