import { DownOutlined, EnvironmentOutlined } from '@ant-design/icons';

import { Dropdown, Menu, message, Space } from 'antd';
import React from 'react';

import { useDispatch } from 'react-redux'
import { setLocation } from '../store/locationSlice'



function DropButton() {

  let menuItems = [{ label: 'No saved locations' }]
  const list = JSON.parse(localStorage.getItem('locations'))

  const dispatch = useDispatch()

  const handleMenuClick = (e) => {
    const chosenItem = menuItems.filter(el => el.key === e.key)
    message.info(chosenItem[0].label);
    const location = list.filter(el => el.value === chosenItem[0].label)
    dispatch(setLocation(location[0]))
  };

  if (list !== null) {
    menuItems = list.map(el => {
      return {
        label: el.value,
        key: el.lat + ' ' + el.lon,
        icon: <EnvironmentOutlined />
      }
    })
  }

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={menuItems}
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