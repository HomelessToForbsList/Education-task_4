import React from 'react';
import { Typography } from 'antd';
import { Divider } from 'antd';
import { Input } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import { AutoComplete } from 'antd';

import DropButton from './DropButton'

import {useSelector, useDispatch} from 'react-redux'
import {setLocation, fetchOptions} from '../store/locationSlice'

function Header() {

  const dispatch = useDispatch()
  const options = useSelector(state => state.location.options)

  const [value, setValue] = React.useState('')

  const onChange = (data) => {
    setValue(data);
  };

  const onSearch = (searchText) => {
      if(searchText.length > 0) dispatch(fetchOptions(searchText))
  };

  const onSelect = (data) => {
    const selected = options.filter(el => el.value === data)
    dispatch(setLocation(selected[0]))
  };




  const now = new Date()

  const date = now.toDateString().split(' ')

  return (
    <div>
      <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Title level={3} style={{ padding: '0 10px', color: '#183051' }}>
          {date[2]+' '+date[1]+' '+date[3]}
        </Typography.Title>
        <div style={{ display: 'flex', alignItems: 'center'}}>
        <DropButton/>
        <AutoComplete 
        options={options}
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        onSelect={onSelect}
        style={{height: '32px'}}
        >
          <Input
        prefix={<SearchOutlined style={{color:'#9B9AA0'}} />}
        placeholder="Search location here"
        style={{ maxWidth: '300px',height: '32px', backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
        bordered={false}
        />
        </AutoComplete>
        </div>
      </div>
      <Divider style={{ marginBottom: '16px' }} />
    </div>
  )
}

export default Header