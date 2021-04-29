import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { IDataSourceProps } from '../../hooks/useSelectData'
import CascaderSelect from './cascaderSelect'

/**
 * 基础测试用例
 */
export const CascaderSelectComponent = () => {
  const [code, setCode] = useState<string>()
  const [value, setValue] = useState<string>()
  return (
    <>
      <span>
        1. (所有代码获取数据,全部在控制台打印的~, 通过标签记录哪个组件的数据局)
      </span>
      <div style={{ margin: '10px 0' }}>
        <CascaderSelect />
      </div>
      <span>2. 自定义描述信息</span>
      <div style={{ margin: '10px 0' }}>
        <CascaderSelect placeholder="自定义描述信息" />
      </div>
      <span>
        3. 通过其他组件输入数据, 如果输入的数据不存在,
        则会显示前面层级匹配的元素, 例如: 2199会显示为辽宁省
      </span>
      <br />
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            setCode(value)
          }
        }}
      />
      <div style={{ margin: '10px 0' }}>
        <CascaderSelect
          getAllData={(data: IDataSourceProps[]) => {
            console.log('3. 组件全部数据', data)
          }}
          getCascaderLevel={(data: IDataSourceProps[]) => {
            console.log('3. 当前选中层级全部数据', data)
          }}
          getCascaderSelect={(data: IDataSourceProps[]) => {
            console.log('3. 选中的链路数据', data)
          }}
          value={code}
          placeholder="自定义描述信息"
        />
      </div>
      <span>4. 默认值方法透出数据</span>
      <div style={{ margin: '10px 0' }}>
        <CascaderSelect
          getAllData={(data: IDataSourceProps[]) => {
            console.log('4. 组件全部数据', data)
          }}
          getCascaderLevel={(data: IDataSourceProps[]) => {
            console.log('4. 当前选中层级全部数据', data)
          }}
          getCascaderSelect={(data: IDataSourceProps[]) => {
            console.log('4. 选中的链路数据', data)
          }}
          defaultValue={'2201'}
          placeholder="自定义描述信息"
        />
      </div>
    </>
  )
}

/**
 * 异常状态级联列表
 */
export const AbnormalCascaderSelect = () => {
  return (
    <>
      <span>加载失败数据loading状态</span>
      <br />
      <div style={{ margin: '10px 0' }}>
        <CascaderSelect apiUrl="https://raw.githubusercontent.com1/modood/Administrative-divisions-of-China/master/dist/pcas-code.json" />
      </div>
      <span>加载失败数据error状态</span>
      <br />
      <div style={{ margin: '10px 0' }}>
        <CascaderSelect
          setRefreshData={() => {
            console.log('重新发起请求')
          }}
          apiUrl="111"
        />
      </div>
    </>
  )
}

/**
 * 禁止使用测试用例
 */
export const CascaderSelectDisabled = () => (
  <>
    <span>禁止选择</span>
    <div style={{ margin: '10px 0' }}>
      <CascaderSelect disabled={true} />
    </div>
    <span>禁止选择,带有默认值</span>
    <div style={{ margin: '10px 0' }}>
      <CascaderSelect disabled={true} defaultValue="230202" />
    </div>
  </>
)

/**
 * 默认值测试用例
 */
export const CascaderSelectDefault = () => (
  <>
    <span>带有默认值:23</span>
    <div style={{ margin: '10px 0' }}>
      <CascaderSelect defaultValue="23" />
    </div>
    <span>带有默认值:2302</span>
    <div style={{ margin: '10px 0' }}>
      <CascaderSelect defaultValue="2302" />
    </div>
    <span>带有默认值:230202</span>
    <div style={{ margin: '10px 0' }}>
      <CascaderSelect defaultValue="230202" />
    </div>
    <span>带有默认值:230202001</span>
    <div style={{ margin: '10px 0' }}>
      <CascaderSelect defaultValue="230202001" />
    </div>
    <span>错误默认值:209122</span>
    <div style={{ margin: '10px 0' }}>
      <CascaderSelect defaultValue="209122" />
    </div>
  </>
)

storiesOf('CascaderSelect 级联选择', module)
  .add('基础的 CascaderSelect', CascaderSelectComponent)
  .add('禁用的 CascaderSelect', CascaderSelectDisabled)
  .add('异常的 CascaderSelect', AbnormalCascaderSelect)
  .add('带默认值的 CascaderSelect', CascaderSelectDefault)
