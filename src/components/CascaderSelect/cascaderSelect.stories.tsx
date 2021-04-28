import React from 'react'
import { storiesOf } from '@storybook/react'
import CascaderSelect from './cascaderSelect'

const CascaderSelectComponent = () => (
  <>
    <CascaderSelect></CascaderSelect>
  </>
)

const CascaderSelectDisabled = () => (
  <>
    <CascaderSelect disabled={true}></CascaderSelect>
  </>
)

storiesOf('CascaderSelect 级联选择', module)
  .add('默认的 CascaderSelect', CascaderSelectComponent)
  .add('禁用的 CascaderSelect', CascaderSelectDisabled)