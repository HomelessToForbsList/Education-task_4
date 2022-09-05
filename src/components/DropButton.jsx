import { DownOutlined, EnvironmentOutlined } from '@ant-design/icons';

import { Dropdown, Menu, message, Space } from 'antd';
import React from 'react';
import { useMemo } from 'react'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setLocation } from '../store/locationSlice'



function DropButton() {

  const list = useSelector(state => state.savedLocations.list)

  const dispatch = useDispatch()

  const handleMenuClick = (e) => {
    if(menuItems[0].label !== 'No saved locations'){
      const chosenItem = menuItems.filter(el => el.key === e.key)
    message.info(chosenItem[0].label);
    const location = list.filter(el => el.value === chosenItem[0].label)
    dispatch(setLocation(location[0]))
    }
  };

  const menuItems = useMemo(() => {
    if (list.length > 0) {
      return list.map(el => el =  {
          label: el.value,
          key: el.lat + ' ' + el.lon,
          icon: <EnvironmentOutlined />
      })
    }
    else return [{ label: 'No saved locations' }]
  }, [list])

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={menuItems.length > 0 ? menuItems : 'No saved locations'}
    />
  );

  return (
    <div style={{ marginRight: '20px' }}>
      <Dropdown overlay={menu}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            Saved locations
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}


export default DropButton;