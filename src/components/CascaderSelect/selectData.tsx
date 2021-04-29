import React, { FC, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import { splitArr, checkValueLength } from '../../utils'
import { IDataSourceProps } from '../../hooks/useSelectData'

interface ISelectDataProps {
  dataSource?: IDataSourceProps[]
  defaultValue?: string
  value?: string
  getCascaderLevel?: Function
  getCascaderSelect?: Function
  getAllData?: Function
  refechData?: Function
  searchplaceholder?: string
  placeholder?: string
  state?: string
}

const SelectData: FC<ISelectDataProps> = ({
  dataSource,
  defaultValue,
  value,
  getAllData,
  getCascaderLevel,
  getCascaderSelect,
  searchplaceholder,
  placeholder,
  state,
  refechData,
}) => {
  const [inputValue, setInputValue] = useState<string>() // 搜索受控
  const [selectValue, setSelectValue] = useState<IDataSourceProps[]>([]) // 单链全部数据
  const [levelData, setLevelData] = useState<any>([]) // 当前层级全部数据
  const [filterData, setFilterData] = useState<IDataSourceProps[]>([]) // 过滤数据
  /**
   * 设置当前层级，清空其他状态，追加单链数据
   * @param levelChildren 选中的元素
   */
  const _handlerChangeLevel = (levelChildren: IDataSourceProps) => {
    setLevelData(levelChildren.children || []) // 设置当前层级
    setSelectValue([...selectValue, levelChildren])
    setFilterData([])
    setInputValue('')
  }

  /**
   * 设置顶部数据源
   * @param {object} index 单链数据层级
   */
  const _handlerChangeTopData = (item: IDataSourceProps) => {
    if (item?.code?.length <= 9) {
      let code = ''
      switch (item.code.length) {
        case 4:
          code = item.code.slice(0, 2)
          break
        case 6:
          code = item.code.slice(0, 4)
          break
        case 8:
          code = item.code.slice(0, 6)
          break
        case 9:
          code = item.code.slice(0, 6)
          break
        default:
          break
      }
      _getLevelValue__(code)
      _getSelectValue__(code)
    }
    setFilterData([])
    setInputValue('')
  }

  /**
   * 搜索数据源
   * @param e Event对象
   */
  const _handlerChangeInput = (e: any) => {
    setInputValue(e.target.value)
    // 过滤当前层级数据源
    let filterSelectData = levelData.filter((item: IDataSourceProps) => {
      return item.name.indexOf(e.target.value) !== -1
    })
    setFilterData(filterSelectData || [])
  }

  /**
   * 通过code获取单链全部数据
   * @param code 地区Code
   */
  const _getSelectValue__ = (code: string) => {
    let codeList = splitArr(code)
    let j = codeList.length // 循环结束条件
    let i = 0
    let selectCacheList: IDataSourceProps[] = []
    let cacheList = dataSource
    while (j > 0) {
      let num = 2
      i === 3 ? (num = 3) : (num = 2)
      cacheList?.forEach((item) => {
        if (item?.code?.slice(i * 2, i * 2 + num).indexOf(codeList[i]) !== -1) {
          cacheList = item.children
          selectCacheList.push(item)
        }
      })
      j--
      i++
    }
    setSelectValue(selectCacheList)
  }

  /**
   * 通过code获取当前层级的数据
   * @param code 地区Code
   */
  const _getLevelValue__ = (code: string) => {
    let codeList = splitArr(code)
    let j = codeList.length // 循环结束条件
    let i = 0
    let cacheList = dataSource
    let selectCacheList: IDataSourceProps[] = []
    while (j > 0) {
      let num = 2
      i === 3 ? (num = 3) : (num = 2)
      cacheList?.forEach((item) => {
        if (item?.code?.slice(i * 2, i * 2 + num).indexOf(codeList[i]) !== -1) {
          cacheList = item.children
          selectCacheList.push(item)
        }
      })
      j--
      i++
    }
    if (selectCacheList.length === 0) {
      setLevelData(dataSource || [])
    } else {
      setLevelData(selectCacheList[selectCacheList.length - 1].children || [])
    }
  }

  // 显示的可选数据源
  let showData: IDataSourceProps[] = []
  filterData.length > 0 ? (showData = filterData) : (showData = levelData)

  useEffect(() => {
    setLevelData(dataSource || []) // 设置当前层级
    getAllData && getAllData(dataSource || [])
    if (defaultValue && checkValueLength(defaultValue)) {
      _getLevelValue__(defaultValue)
      _getSelectValue__(defaultValue)
    } else if (value && checkValueLength(value)) {
      _getLevelValue__(value)
      _getSelectValue__(value)
    }
  }, [dataSource, value, defaultValue])

  /**
   * 修改数据向顶层抛出
   */
  useEffect(() => {
    getCascaderLevel && getCascaderLevel(levelData)
    getCascaderSelect && getCascaderSelect(selectValue)
  }, [selectValue, levelData])
  return (
    <>
      <span className={classNames('cascader-input-container')}>
        <FontAwesomeIcon
          icon="search"
          className={classNames(['cascader-input-icon'])}
        />
        <input
          className={classNames('cascader-input-select')}
          placeholder={searchplaceholder || placeholder}
          value={inputValue}
          onChange={_handlerChangeInput}
        />
      </span>
      <div>
        {/* 顶部联动 */}
        <div className={classNames('cascader-focus-container')}>
          {(selectValue || []).map((item: IDataSourceProps) => {
            return (
              <span
                className={classNames([
                  'cascader-focus-span',
                  'cascader-pointer',
                ])}
                key={item.code}
                onClick={() => {
                  _handlerChangeTopData(item)
                }}
              >
                {item.name}
              </span>
            )
          })}
          <span className={classNames(['cascader-focus-span'])}>请选择</span>
        </div>
        {/* 选中区展示 */}
        {showData.length === 0 && (state === 'loading' || state === 'error') ? (
          <div className={classNames(['cascader-loading'])}>
            {state === 'loading' && (
              <>
                <FontAwesomeIcon
                  icon="spinner"
                  className={classNames(['cascader-loading-icon'])}
                  style={{ marginRight: '5px' }}
                />
                <span>加载中</span>
              </>
            )}
            {state === 'error' && (
              <>
                <FontAwesomeIcon
                  onClick={() => {
                    refechData && refechData()
                  }}
                  icon="undo"
                  className={classNames(['cascader-pointer'])}
                  style={{ marginRight: '5px' }}
                />
                <span>数据加载失败</span>
              </>
            )}
          </div>
        ) : (
          showData.map((item: IDataSourceProps) => {
            return (
              <span
                className={classNames('cascader-default-span')}
                key={item.code}
                onClick={() => _handlerChangeLevel(item)}
              >
                {item.name}
              </span>
            )
          })
        )}
      </div>
    </>
  )
}

SelectData.defaultProps = {
  defaultValue: '',
}

export default SelectData
