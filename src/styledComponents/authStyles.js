import styled from 'styled-components';
import { colors } from '../utils';

const authStyles = {
  // fieldStyle: {
  //   height: '37px',
  //   borderRadius: 4,
  //   border: '1px solid #ced4da',
  //   fontSize: 16,
  //   padding: '0px 10px',
  //   width: '272px',
  //   marginTop: '10px',
  // },
  fieldStyle: styled.div`
    height: 37px,
    borderRadius: 4,
    border: 1px solid #ced4da,
    fontSize: 16,
    padding: 0px 10px,
    width: 272px,
    marginTop: 10px,
`,
  passwordFieldStyle: {
    height: '37px',
    borderRadius: 4,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '0px 10px',
    width: '250px',
    marginTop: '10px',
  },
  inputStyle: {
    height: '35px',
    marginBottom: '10px',
    webkitTextFillColor: 'unset',
  },
  inputPasswordStyle: {
    height: '35px',
    marginBottom: '10px',
    marginRight: '50px',
    width: '90%',
    webkitTextFillColor: 'unset',
  },
  bodyStyle: {
    padding: 0,
    textAlign: 'center',
  },
  closingStyle: {
    position: 'absolute',
    zIndex: 1200,
    fill: '#444',
    width: '26px',
    height: '26px',
    right: '10px',
    top: '10px',
    cursor: 'pointer',
  },
  emailStyle: {
    height: '35px',
    borderRadius: 4,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '0px 10px',
    width: '294px',
    marginTop: '10px',
  },
  containerStyle: {
    width: '100%',
    textAlign: 'center',
    padding: '10px',
  },
  underlineFocusStyle: {
    color: colors.header,
  },
};

export default authStyles;
