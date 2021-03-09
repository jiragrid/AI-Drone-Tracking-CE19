import React, { useEffect } from 'react';
import Axios from 'axios'
import { URL } from '../constants/url'

export default function Page() {
  
  const fetchData = async () => {
    try {
      const { data } = await Axios.get(URL)
      console.log('fetch', data)
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      Hello World !!
    </div>
  )
};
