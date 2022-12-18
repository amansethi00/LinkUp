import React, { useEffect } from 'react';
import { Heading, VStack, Container, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { useAppContext } from '../App';
import { useNavigate } from 'react-router';
import { useFormik, Formik } from 'formik';
import { loginApi } from '../api/requests';
const Login = () => {
  const { appData } = useAppContext();
  const navigate = useNavigate();
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      //   await loginApi(values);
    },
  });
  useEffect(() => {
    if (appData?.userData?.assets) {
      navigate('/admin');
    }
  }, []);

  const onSubmitClick = async () => {
    const response = await loginApi(values.username, values.password);
    console.log('response', response);
    if (response?.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', values.username);
      navigate('/admin');
    }
  };
  return (
    <VStack padding={4}>
      <Heading>Login Page</Heading>
      <Container>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input name="username" onChange={handleChange} type="text" id="username" />
          <FormLabel htmlFor="password"> Password</FormLabel>
          <Input onChange={handleChange} type="password" name="password" id="password" />
        </FormControl>
        <Button onClick={onSubmitClick} marginTop={'2'}>
          Link me In
        </Button>
      </Container>
    </VStack>
  );
};

export default Login;
