import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>组件库开发</h1>
        <p>1. 省市级联动组件开发</p>
        <p>注意：所有代码获取数据,全部在控制台打印的~</p>
      </>
    )
  },
  { info: { disable: true } }
)
