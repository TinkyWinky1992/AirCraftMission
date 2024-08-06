import React from 'react';
import ReactDOMServer from 'react-dom/server';


export const render = (Component: React.FC<{ sizeRem: number }>, sizeRem: number) => {
  return ReactDOMServer.renderToStaticMarkup(<Component sizeRem={sizeRem} />);
};