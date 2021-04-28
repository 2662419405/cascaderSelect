import React, { FC, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import { IDataSourceProps } from '../../hooks/useSelectData'

interface ISelectDataProps {
  dataSource?: IDataSourceProps[]
  getCascaderLevel?: Function
  getCascaderSelect?: Function
}

const SelectData: FC<ISelectDataProps> = ({
  dataSource,
  getCascaderLevel,
  getCascaderSelect,
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
   * @param {number} index 单链数据层级
   */
  const _handlerChangeTopData = (index: number) => {
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
      return item.name.indexOf(e.target.value) != -1
    })
    setFilterData(filterSelectData || [])
  }

  /**
   * 通过code获取单链全部数据
   * @param code 地区Code
   */
  const _getSelectValue__ = (code: string) => {}

  /**
   * 通过code获取当前层级的数据
   * @param code 地区Code
   */
  const _getLevelValue__ = (code: string) => {}

  // 显示的可选数据源
  let showData: IDataSourceProps[] = []
  filterData.length > 0 ? (showData = filterData) : (showData = levelData)

  useEffect(() => {
    setLevelData(dataSource || [])
  }, [dataSource])

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
          placeholder="请选择行政区域"
          value={inputValue}
          onChange={_handlerChangeInput}
        />
      </span>
      <div>
        {/* 顶部联动 */}
        <div className={classNames('cascader-focus-container')}>
          {(selectValue || []).map((item: IDataSourceProps, index: number) => {
            return (
              <span
                className={classNames([
                  'cascader-focus-span',
                  'cascader-pointer',
                ])}
                key={item.code}
                onClick={() => {
                  _handlerChangeTopData(index)
                }}
              >
                {item.name}
              </span>
            )
          })}
          {levelData && levelData.length > 0 && (
            <span className={classNames(['cascader-focus-span'])}>请选择</span>
          )}
        </div>
        {/* 选中区展示 */}
        {showData.map((item: IDataSourceProps) => {
          return (
            <span
              className={classNames('cascader-default-span')}
              key={item.code}
              onClick={() => _handlerChangeLevel(item)}
            >
              {item.name}
            </span>
          )
        })}
      </div>
    </>
  )
}
export default SelectData
