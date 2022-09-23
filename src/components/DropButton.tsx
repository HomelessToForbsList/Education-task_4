import { DownOutlined, EnvironmentOutlined } from '@ant-design/icons';

import { Dropdown, Menu, message, Space } from 'antd';
import React, { useMemo } from 'react'


import { setLocation } from '../store/locationSlice'

import { useAppDispatch, useListSelector} from '../hooks'
import { MenuClickEventHandler } from 'rc-menu/lib/interface';


const DropButton: React.FC = function() {

  const list = useListSelector()

  const dispatch = useAppDispatch()

  interface IMenu{
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    type?: 'item',
  }


  const menuItems: IMenu[] = useMemo(() => {
    function getItem(
      label: React.ReactNode,
      key: React.Key,
      icon?: React.ReactNode,
      type?: 'item',
    ): IMenu {
      return {
        key,
        icon,
        label,
        type,
      } as IMenu;
    }
    const items = []
    if (list.length > 0) {
      list.forEach(el => items.push(getItem(
          el.value,
          el.lat + ' ' + el.lon,
          <EnvironmentOutlined />,
      )))
    }
    else items.push(getItem('No saved locations', '123' ))
    return items
  }, [list])

  const handleMenuClick: MenuClickEventHandler = (info ) => {
    if(menuItems[0]?.label !== 'No saved locations'){
      const chosenItem = menuItems.find(el => el.key === info.key)!
    message.info(chosenItem.label);
    const location = list.find(el => el.value === chosenItem.label)!
    dispatch(setLocation(location))
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={ menuItems }
    />
  );


  return (
    <div style={{ marginRight: '20px' }}>
      <Dropdown overlay={menu}>
          <Space>
            Saved locations
            <DownOutlined />
          </Space>
      </Dropdown>
    </div>
  )
}


export default DropButton;

