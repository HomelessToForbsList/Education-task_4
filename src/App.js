import './App.css';
import React from 'react';

import { Layout } from 'antd';

import Main from './components/Main';
import SideSection from './components/SideSection';

import {useSelector, useDispatch} from 'react-redux'
import {setLocation} from './store/locationSlice'
import {fetchChartData} from './store/chartDataSlice'
import {fetchData} from './store/dataSlice'

function App() {

  const location = useSelector(state => state.location.location)
  const dispatch = useDispatch()


  React.useEffect(() => {
    if (localStorage.getItem('locations')) {
      let locations = JSON.parse(localStorage.getItem('locations'))
      dispatch(setLocation(locations[locations.length -1]))
    }
  }, [])

  React.useEffect(() => {
    if (location.value) {
      dispatch(fetchData(location))
      dispatch(fetchChartData(location))
    }
  }, [location])



  return (
    <div className='App' style={{display: 'flex', alignItems: 'center', height: '100%'}}>
      <Layout className='wrapper' style={{
      margin: '0 auto',
      height: '800px',
      maxWidth: '1100px',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
    }}>
      <Layout className='content' style={{ height: '100%', display: 'flex', backgroundColor: '#fff', padding: '0 15px' }}>
        <Main/>
      </Layout>
      <Layout
        className='sider'
        style={{
          height: '100%',
          minWidth: 350,
          backgroundImage: 'linear-gradient(to right bottom, #454f76, #3b456a, #303c5f, #263354, #1c2a49, #182748, #142547, #0f2246, #11254e, #132756, #172a5e, #1b2c66)'
        }}>
        <SideSection />
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
