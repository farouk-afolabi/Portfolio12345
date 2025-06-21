import { Global, css } from '@emotion/react';
import { theme } from './theme';

export const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }


  html, body, #root {
    height: 100%;
  }
    
      html {
        scroll-behavior: smooth;
      }

      body {
        font-family: ${theme.fonts.body};
        font-size: ${theme.fontSizes.base};
        color: ${theme.colors.text};
        background-color: ${theme.colors.background};
        line-height: 1.6;
        transition: ${theme.transitions.default};
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: ${theme.fonts.heading};
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: ${theme.spacing.md};
      }

      a {
        color: ${theme.colors.primary};
        text-decoration: none;
        transition: ${theme.transitions.default};

        &:hover {
          color: ${theme.colors.secondary};
        }
      }

      button {
        cursor: pointer;
        border: none;
        background: none;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      section {
        padding: ${theme.spacing.xl} 0;
      }

      .container {
        width: 100%;
         min-height: 100vh;
        margin: 0 auto;
        padding: 0 ${theme.spacing.md};
      }
    `}
  />
); 