import 'swiper/css';

import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';

const CustomStyles = createGlobalStyle`
  body {
    background-color: ${theme`colors.gray.900`};
    overflow-x: hidden;
    ${tw`antialiased`}
    
    a:hover {
      color: ${theme`colors.gray.500`};
    }
  }
`;

function GlobalStyles() {
  return (
    <>
      <BaseStyles />
      <CustomStyles />
    </>
  );
}

export default GlobalStyles;
