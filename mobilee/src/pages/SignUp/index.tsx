import React, { useRef, useCallback, useState } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';
import formatCEP from '../../utils/formatCEP';
import formatPhone from '../../utils/formatPhone';

import Input from '../../components/Input';
import Button from '../../components/Button';

// import logoImg from '../../assets/logo.png';

import {
  Container,
  Logo,
  Title,
  BackToSignInButton,
  BackToSignInText,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  occupation: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [cep, setCEP] = useState('');
  const [phone, setPhone] = useState('');

  const emailInputRef = useRef<TextInput>(null);
  const cityInputRef = useRef<TextInput>(null);
  const passInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      console.log('data', data);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          city: Yup.string().required('Cidade obrigatória'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No minimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        data.occupation = 'cliente';
        delete data.a;
        delete data.cep;

        console.log('data', data);
        await api.post('/users', data);

        Alert.alert('Cadastro realizado', 'Você já pode realizar o login');

        navigation.goBack();
      } catch (err) {
        console.log('err', err.message);
        console.log('err', err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao cadastrar, tente novamente.',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
        // keyboardShouldPersistTaps="handled"
        // contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Logo>Logo</Logo>
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  cityInputRef.current?.focus();
                }}
              />
              <Input
                ref={cityInputRef}
                autoCapitalize="words"
                name="city"
                icon="map-pin"
                placeholder="Cidade"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passInputRef.current?.focus();
                }}
              />
              <Input
                ref={passInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Input
                ref={passInputRef}
                secureTextEntry
                name="a"
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Input
                ref={cityInputRef}
                autoCapitalize="words"
                name="a"
                icon="map-pin"
                placeholder="Celular"
                onChangeText={(text) => setPhone(formatPhone(text))}
                value={phone}
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={cityInputRef}
                autoCapitalize="words"
                name="cep"
                icon="map-pin"
                placeholder="CEP"
                onChangeText={(text) => setCEP(formatCEP(text))}
                value={cep}
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={cityInputRef}
                autoCapitalize="words"
                name="a"
                icon="map-pin"
                placeholder="Bairro"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={cityInputRef}
                autoCapitalize="words"
                name="a"
                icon="map-pin"
                placeholder="Estado"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={cityInputRef}
                autoCapitalize="words"
                name="a"
                icon="map-pin"
                placeholder="Rua"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Criar Conta
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignInButton
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para login</BackToSignInText>
      </BackToSignInButton>
    </>
  );
};

export default SignUp;
