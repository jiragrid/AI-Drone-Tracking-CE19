import React, { useEffect } from 'react';
import Axios from 'axios'

export default function Page() {
  const fetchData = async () => {
    try {
      const { data } = await Axios.get('http://localhost:5000/test')
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
