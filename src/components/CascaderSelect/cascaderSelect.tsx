import React, { FC, InputHTMLAttributes, SelectHTMLAttributes } from 'react'
import useSelectData from '../../hooks/useSelectData'
import classNames from 'classnames'

interface ISelectProps {
  /** 是否禁用 */
  disabled?: boolean
  /** 默认值 */
  defaultValue?: string
  onChange: Function
}

interface IState {
  dataSource: any
}

type InputProps = ISelectProps & InputHTMLAttributes<HTMLElement>
type SelectProps = ISelectProps & SelectHTMLAttributes<HTMLElement>
export type ICascaderSelectProps = Partial<InputProps & SelectProps>

const CascaderSelect: FC<ICascaderSelectProps> = props => {
  const { dataSource, state } = useSelectData({
    url:
      'https://raw.githubusercontent.com/modood/Administrative-divisions-of-China/master/dist/pcas-code.json',
  })
  const {
    disabled,
    defaultValue,
    placeholder,
    onChange,
    className,
    ...otherProps
  } = props
  const classes = classNames('cascader-select', className)
  console.log(dataSource, state)
  return (
    <span className={classNames('cascader-select-span')}>
      <input
        placeholder={placeholder}
        disabled={disabled}
        className={classes}
        {...otherProps}
      ></input>
      
      {/* 数据展示框 */}
      <div className={classNames('cascader-select-container')}>
        <input
          className={classNames('cascader-select')}
          placeholder="请选择行政区域"
        />
        <div></div>
      </div>
    </span>
  )
}

CascaderSelect.defaultProps = {
  onChange: () => {},
  placeholder: '请选择行政区域',
}

export default CascaderSelect
