import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { user } from '../api';
import colors from '../styles/colors';

const SignUp = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    id: '',
    password: '',
  });

  const onChange = ({ target: { id, value } }: { target: { id: string; value: string } }) => {
    setInputValues(prev => ({ ...prev, [id]: value }));
  };

  const { mutate } = useMutation(() => user.signup(inputValues), {
    onSuccess: () => {
      alert('회원가입 완료');
      navigate('/signin');
    },
    onError: error => {
      console.log(inputValues);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    },
  });

  return (
    <Container>
      <Title>회원가입</Title>
      <Input id='id' type='text' onChange={onChange} placeholder='아이디' autoComplete='off' />
      <Input id='password' type='password' onChange={onChange} placeholder='비밀번호' />
      <SignUpButton onClick={() => mutate()}>회원가입</SignUpButton>
      <SignInButton onClick={() => navigate('/signin')}>로그인</SignInButton>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  position: absolute;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
  color: ${colors.black};
`;

const Input = styled.input<{ id: string }>`
  width: 450px;
  height: 50px;
  border-radius: 7px;
  border: 1px solid ${colors.main};
  margin-bottom: 40px;
  ${({ id }) => `background-image: url('/images/${id}.png');`}
  background-repeat: no-repeat;
  background-position: 20px center;
  text-indent: 50px;
  font-size: 16px;
  transition: 0.3s;
  outline-color: ${colors.black};
`;

const SignUpButton = styled.button`
  border: none;
  width: 450px;
  height: 50px;
  border-radius: 7px;
  background-color: ${colors.main};
  color: ${colors.white};
  font-size: 16px;
  transition: 0.3s;
  margin-bottom: 20px;
  &:hover {
    filter: brightness(110%);
  }
  &:active {
    filter: brightness(90%);
  }
`;

const SignInButton = styled.button`
  border: none;
  background: none;
  color: ${colors.main};
  font-size: 16px;
`;
