import React, {
  FC,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useState,
} from 'react'
import PropTypes from 'prop-types'
// 第三方依赖包
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// 内部文件加载
import Select from './selectData'
import useSelectData from '../../hooks/useSelectData'

import { IDataSourceProps } from '../../hooks/useSelectData'

interface ISelectProps {
  /** 是否禁用 */
  disabled?: boolean
  /** 默认值 */
  defaultValue?: string
  /** 搜索提示信息 */
  searchplaceholder?: string
  /** 受控值 */
  value?: string
  /** 请求api数据接口 */
  apiUrl?: string
  /** 清空选择框 */
  hasClear?: boolean
  /** 获取全部数据 */
  getAllData?: Function
  /** 获取选中层级的全部数据 */
  getCascaderLevel?: Function
  /** 获取链式全部数据 */
  getCascaderSelect?: Function
  /** 重新请求接口触发 */
  setRefreshData?: Function
}

type InputProps = ISelectProps & InputHTMLAttributes<HTMLElement>
type SelectProps = ISelectProps & SelectHTMLAttributes<HTMLElement>
export type ICascaderSelectProps = Partial<InputProps & SelectProps>

const CascaderSelect: FC<ICascaderSelectProps> = props => {
  const {
    disabled,
    defaultValue,
    placeholder,
    className,
    value,
    searchplaceholder,
    setRefreshData,
    getCascaderLevel,
    getCascaderSelect,
    apiUrl,
    getAllData,
    hasClear,
    ...otherProps
  } = props

  const [focus, setFocus] = useState<boolean>(false)
  const [getData, setGetData] = useState<boolean>(false)
  const [enterChild, setEnterChild] = useState<boolean>(false)
  const [showValue, setShowValue] = useState<string>('')
  const { dataSource, state } = useSelectData({
    url: apiUrl || '',
    getData,
  })

  /**
   * 获取和失去焦点的css样式动画
   */
  const handlerSetFocus = () => {
    focus ? setFocus(false) : setFocus(true)
  }

  /**
   * 展示数据 && 透出到最顶层
   * @param {Array} 全部链接数据
   *
   */
  const _getCascaderSelect = (selectValue: IDataSourceProps[]) => {
    let str = ''
    selectValue?.forEach((item: IDataSourceProps, index: number) => {
      str += item.name
      index === selectValue.length - 1 || (str += ' / ')
    })
    setShowValue(str)
    getCascaderSelect && getCascaderSelect(selectValue || [])
  }

  /**
   * 重新加载数据请求
   */
  const refechData = () => {
    if (state === 'error') {
      setGetData(!getData)
      setRefreshData && setRefreshData()
    }
  }

  const classes = classNames(
    'cascader-select',
    className,
    disabled && `cascader-select-disabled`
  )

  return (
    <span className={classNames('cascader-select-main')}>
      <span
        className={classNames([
          'cascader-select-span',
          disabled && `cascader-select-disabled`,
          (focus || enterChild) && 'cascader-select-focus-span',
        ])}
      >
        <input
          placeholder={placeholder}
          disabled={disabled}
          className={classes}
          onFocus={handlerSetFocus}
          onBlur={handlerSetFocus}
          readOnly
          autoComplete="off"
          {...otherProps}
          value={showValue}
        ></input>
        <FontAwesomeIcon
          icon="chevron-down"
          className={classNames([
            'cascader-select-icon',
            (focus || enterChild) && 'cascader-focus-icon',
          ])}
        />
      </span>
      {/* 数据展示框 */}
      <div
        className={classNames([
          'cascader-select-container',
          (focus || enterChild) && 'cascader-select-container-focus',
        ])}
        onMouseEnter={() => {
          setEnterChild(true)
        }}
        onMouseLeave={() => {
          setEnterChild(false)
        }}
      >
        <Select
          placeholder={placeholder}
          searchplaceholder={searchplaceholder}
          dataSource={dataSource}
          defaultValue={defaultValue}
          value={value}
          state={state}
          getCascaderLevel={getCascaderLevel}
          getAllData={getAllData}
          getCascaderSelect={_getCascaderSelect}
          refechData={refechData}
        />
      </div>
    </span>
  )
}

/** 默认值 */
CascaderSelect.defaultProps = {
  getAllData: () => {},
  getCascaderLevel: () => {},
  getCascaderSelect: () => {},
  setRefreshData: () => {},
  placeholder: '请选择行政区域',
  searchplaceholder: '请搜索行政区域',
  apiUrl:
    'https://raw.githubusercontent.com/modood/Administrative-divisions-of-China/master/dist/pcas-code.json',
}

/** 数据类型 */
CascaderSelect.propTypes = {
  getAllData: PropTypes.func,
  getCascaderLevel: PropTypes.func,
  getCascaderSelect: PropTypes.func,
  setRefreshData: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  searchplaceholder: PropTypes.string,
  apiUrl: PropTypes.string,
}

export default CascaderSelect
