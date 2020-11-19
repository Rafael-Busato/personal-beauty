import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { Stepper, Step, StepLabel } from '@material-ui/core';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AnimationContainer, Background } from './styles';

interface IAddress {
  city: string;
  neighborhood: string;
  state: string;
  zipCode: string;
  address: string;
}

interface SignUpFormData {
  name: string;
  city: string;
  email: string;
  password: string;
  phone: string;
  occupation: string;
  profession: string;
  address: IAddress;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      console.log('data', data);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          // phone: Yup.string().required('Celular obrigatório'),
          // occupation: Yup.string().required('Profissão obrigatória'),
          // zipCode: Yup.string().required('CEP obrigatório'),
          // city: Yup.string().required('Cidade obrigatória'),
          // neighborhood: Yup.string().required('Bairro obrigatório'),
          // state: Yup.string().required('Estado obrigatório'),
          // address: Yup.string().required('Rua obrigatória'),
          // number: Yup.string().required('Número obrigatória'),
          // bank: Yup.string().required('Banco obrigatório'),
          // agency: Yup.string().required('Agência obrigatória'),
          // account: Yup.string().required('Conta obrigatória'),
          // document: Yup.string().required('Documento obrigatório'),
          // fullname: Yup.string().required('Nome completo obrigatória'),
        });

        data.occupation = 'Manicure';

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no Personal Beauty!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <h1>Logo</h1>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Stepper activeStep={activeStep} alternativeLabel>
              <Step>
                <StepLabel>Conta de recebimento</StepLabel>
              </Step>
              <Step>
                <StepLabel>Endereço</StepLabel>
              </Step>
              <Step>
                <StepLabel>Dados pessoais</StepLabel>
              </Step>
            </Stepper>

            {activeStep === 0 && (
              <>
                <Input name="bank" icon={FiUser} placeholder="Banco" />
                <Input name="agency" icon={FiUser} placeholder="Agência" />
                <Input name="account" icon={FiUser} placeholder="Conta" />
                <Input
                  name="document"
                  hasMask
                  icon={FiUser}
                  placeholder="CPF"
                  mask="999.999.999-99"
                />
                <Input
                  name="fullname"
                  icon={FiUser}
                  placeholder="Nome Completo"
                />
              </>
            )}

            {activeStep === 1 && (
              <>
                <Input
                  name="zipCode"
                  icon={FiUser}
                  placeholder="CEP"
                  hasMask
                  mask="99999-999"
                />
                <Input name="neighborhood" icon={FiUser} placeholder="Bairro" />
                <Input name="state" icon={FiUser} placeholder="Estado" />
                <Input name="address" icon={FiUser} placeholder="Rua" />
                <Input name="number" icon={FiUser} placeholder="Número" />
              </>
            )}

            {activeStep === 2 && (
              <>
                <Input name="name" icon={FiUser} placeholder="Nome" />
                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input name="city" icon={FiUser} placeholder="Cidade" />
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
                />
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Confirmar Senha"
                />
                {/* <Input name="phone" icon={FiMail} placeholder="Celular" /> */}
                {/* <Input
                  name="occupation"
                  icon={FiMail}
                  placeholder="Profissão"
                /> */}
                <input
                  name="occupation"
                  type="checkbox"
                  // checked={this.state.isGoing}
                  // onChange={this.handleInputChange}
                />
                <select name="occupation" id="occupation">
                  <option value="Cabeleireiro">Cabeleireiro</option>
                  <option value="Barbeiro">Barbeiro</option>
                  <option value="Manicure">Manicure</option>
                  <option value="Pedicure">Pedicure</option>
                </select>
              </>
            )}

            <div>
              {activeStep <= 1 && (
                <Button onClick={handleNext} type="button">
                  Avançar
                </Button>
              )}
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Voltar
              </Button>
              {activeStep === 2 && <Button type="submit">Cadastrar</Button>}
            </div>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
