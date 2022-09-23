import React from 'react';
import { Typography } from 'antd';
import { Divider } from 'antd';
import { Input } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import { AutoComplete } from 'antd';
import styles from '../styles/Header.module.css'
import DropButton from './DropButton'

import {setLocation, fetchOptions} from '../store/locationSlice'

import {useOptionsSelector, useAppDispatch} from '../hooks'

const Header: React.FC = function() {

  const dispatch = useAppDispatch()
  const options = useOptionsSelector()

  const [value, setValue] = React.useState('')

  const onChange = (data: string): void => {
    setValue(data);
  };

  const onSearch = (searchText: string) : void => {
      if(searchText.length > 0) dispatch(fetchOptions(searchText))
  };

  const onSelect = (data: string) => {
    const selected = options.filter(el => el?.value === data)
    dispatch(setLocation(selected[0]))
  };




  const now = new Date()

  const date = now.toDateString().split(' ')

  return (
    <>
      <div className={styles.content}>
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
        className={styles.input}
        bordered={false}
        />
        </AutoComplete>
        </div>
      </div>
      <Divider style={{ marginBottom: '16px' }} />
    </>
  )
}

export default Header