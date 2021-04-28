import React, {
  FC,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useState,
} from 'react'
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
  onChange: Function
  // 获取选中层级的全部数据
  getCascaderLevel?: Function
  // 获取链式全部数据
  getCascaderSelect?: Function
}

interface IState {
  dataSource: any
}

type InputProps = ISelectProps & InputHTMLAttributes<HTMLElement>
type SelectProps = ISelectProps & SelectHTMLAttributes<HTMLElement>
export type ICascaderSelectProps = Partial<InputProps & SelectProps>

let apiUrl =
  'https://raw.githubusercontent.com/modood/Administrative-divisions-of-China/master/dist/pcas-code.json'

const CascaderSelect: FC<ICascaderSelectProps> = props => {
  const [focus, setFocus] = useState<boolean>(false)
  const [showValue, setShowValue] = useState<string>('')
  const { dataSource, state } = useSelectData({
    url: apiUrl,
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
    selectValue?.forEach((item: IDataSourceProps) => {
      str += item.name + '/'
    })
    setShowValue(str)
    props.getCascaderSelect && props.getCascaderSelect()
  }

  const {
    disabled,
    defaultValue,
    placeholder,
    onChange,
    className,
    ...otherProps
  } = props
  const classes = classNames('cascader-select', className)

  return (
    <span className={classNames('cascader-select-main')}>
      <span className={classNames('cascader-select-span')}>
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
            focus && 'cascader-focus-icon',
          ])}
        />
      </span>
      {/* 数据展示框 */}
      <div className={classNames('cascader-select-container')}>
        <Select
          dataSource={dataSource}
          getCascaderLevel={props.getCascaderLevel}
          getCascaderSelect={_getCascaderSelect}
        />
      </div>
    </span>
  )
}

CascaderSelect.defaultProps = {
  onChange: () => {},
  placeholder: '请选择行政区域',
}

export default CascaderSelect
