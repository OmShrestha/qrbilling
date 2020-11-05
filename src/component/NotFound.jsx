import React from 'react';

const NotFound = () => {
  const greeting = ' Not found page';

  return <Headline value={greeting} />;
};

const Headline = ({ value }) => {
  return <h1>{value}</h1>;
};

export default NotFound;
