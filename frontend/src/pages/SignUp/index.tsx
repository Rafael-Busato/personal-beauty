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
import CheckBox from '../../components/CheckBox';

import { Container, Content, AnimationContainer, Background } from './styles';

// interface IAddress {
//   city: string;
//   neighborhood: string;
//   state: string;
//   zipCode: string;
//   address: string;
// }

interface SignUpFormData {
  name: string;
  city: string;
  email: string;
  password: string;

  bank: string;
  phone: string;
  occupation: string;
  zipCode: string;
  neighborhood: string;
  state: string;
  address: string;
  number: string;
  agency: string;
  account: string;
  document: string;
  fullname: string;
  serviceType: object;
  subService: object;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);

  const [subService, setSubService] = useState({
    corte: false,
    unha: false,
  });

  const [serviceType, setServiceType] = useState({
    cabeleleiro: false,
    manicure: false,
  });

  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    city: '',
    email: '',
    password: '',
    bank: '',
    phone: '',
    occupation: '',
    zipCode: '',
    neighborhood: '',
    state: '',
    address: '',
    number: '',
    agency: '',
    account: '',
    document: '',
    fullname: '',
    serviceType: {},
    subService: {},
  });

  const handleNext = (data: any) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeServiceType = (event: any) => {
    setServiceType({
      ...serviceType,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeSubService = (event: any) => {
    setSubService({
      ...subService,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      setFormData({ ...formData, ...data });

      if (activeStep <= 2) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        return;
      }

      if (activeStep === 3) {
        formData.serviceType = serviceType;
        formData.subService = subService;
        try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            // name: Yup.string().required('Nome obrigatório'),
            // email: Yup.string()
            //   .required('E-mail obrigatório')
            //   .email('Digite um e-mail válido'),
            // password: Yup.string().min(6, 'No mínimo 6 dígitos'),
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

          await schema.validate(formData, {
            abortEarly: false,
          });

          await api.post('/users', formData);

          history.push('/');
          addToast({
            type: 'success',
            title: 'Cadastro realizado!',
            description: 'Você já pode fazer seu login no Personal Beauty!',
          });
        } catch (err) {
          console.log('erro ', err);
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
      }
    },
    [addToast, history, formData, serviceType, subService, activeStep],
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
                <StepLabel>Dados pessoais</StepLabel>
              </Step>
              <Step>
                <StepLabel>Endereço</StepLabel>
              </Step>
              <Step>
                <StepLabel>Conta de recebimento</StepLabel>
              </Step>
              <Step>
                <StepLabel>Tipo de Serviços</StepLabel>
              </Step>
            </Stepper>

            {activeStep === 0 && (
              <>
                <Input name="name" icon={FiUser} placeholder="Nome" />
                <Input name="email" icon={FiMail} placeholder="E-mail" />
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
                <Input name="state" icon={FiUser} placeholder="Estado" />
                <Input name="city" icon={FiUser} placeholder="Cidade" />
                <Input name="neighborhood" icon={FiUser} placeholder="Bairro" />
                <Input name="address" icon={FiUser} placeholder="Rua" />
                <Input name="number" icon={FiUser} placeholder="Número" />
              </>
            )}

            {activeStep === 2 && (
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
            {activeStep === 3 && (
              <>
                <div>
                  <div>
                    <CheckBox
                      label="Cabeleleiro"
                      checked={serviceType.cabeleleiro}
                      onChange={handleChangeServiceType}
                      id="scales"
                      name="cabeleleiro"
                    />
                  </div>
                  {serviceType.cabeleleiro && (
                    <div style={{ display: 'flex' }}>
                      <div>
                        <CheckBox
                          label="Corte"
                          checked={subService.corte}
                          onChange={handleChangeSubService}
                          id="scales"
                          name="corte"
                        />
                      </div>
                      {subService.corte && (
                        <div>
                          <Input name="name" icon={FiUser} placeholder="Nome" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            <div>
              {activeStep <= 2 && <Button type="submit">Avançar</Button>}
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Voltar
              </Button>
              {activeStep === 3 && <Button type="submit">Cadastrar</Button>}
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
