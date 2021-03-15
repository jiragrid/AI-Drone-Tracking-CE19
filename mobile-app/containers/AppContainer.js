import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

function AppContainer({ children }) {
  return (
    <div>
      <Head>
        <title>AI Sugarcane Disease</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <main>{children}</main>
    </div>
  )
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppContainer