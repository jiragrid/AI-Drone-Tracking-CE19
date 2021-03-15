import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  Paper,
} from '@material-ui/core';
import LeftNavbar from '../component/LeftNavbar';
import AppBar from '../component/AppBar';

function AppContainer({ children }) {
  const [isOpenLeftNav, setIsOpenLeftNav] = useState(false);

  const toggleLeftNav = () => setIsOpenLeftNav(!isOpenLeftNav);

  return (
    <div className="w-100">
      <Head>
        <title>AI Sugarcane Disease Analysis</title>
        <link rel="shortcut icon" href="/images/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <AppBar onToggleLeftNav={toggleLeftNav} />
      <LeftNavbar isOpen={isOpenLeftNav} onClose={toggleLeftNav} />
      <main className="m-5">
        {children}
      </main>
    </div>
  )
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppContainer