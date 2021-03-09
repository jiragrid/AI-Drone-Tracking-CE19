import React, { useEffect } from 'react';
import Axios from 'axios'

export default function Page() {
  const fetchData = async () => {
    try {
      const { data } = await Axios.get('http://0.0.0.0:5000/test')
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
