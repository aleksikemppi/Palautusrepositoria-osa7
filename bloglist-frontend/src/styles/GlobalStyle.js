import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }

  a {
    text-decoration: none;
    color: #007BFF;
  }

  a:hover {
    text-decoration: underline;
  }

  h1, h2, h3 {
    margin: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
`;

export default GlobalStyle;
