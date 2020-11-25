import React, { useCallback, useRef, useState, useEffect } from 'react';
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

interface SubService {
  id: string;
  sub_service: string;
  active: boolean;
}

interface ListServiceType {
  active: boolean;
  created_at: Date;
  id: string;
  service_type: string;
  sub_service: any;
}

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

  const [listServiceType, setListServiceType] = useState<ListServiceType[]>([]);
  const [subService, setSubService] = useState();

  const [serviceType, setServiceType] = useState();

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

  const handleChangeServiceType = (event: any, service_type: string) => {
    setServiceType({
      ...serviceType,
      [service_type]: event.target.checked,
    });
  };

  const handleChangeSubService = (event: any, sub_services: string) => {
    setSubService({
      ...subService,
      [sub_services]: event.target.checked,
    });
  };

  useEffect(() => {
    async function getListServiceType() {
      const response = await api.get('/service/listServicesType');
      setListServiceType(response.data);
    }

    getListServiceType();
  }, []);

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
                {listServiceType.map((service) => {
                  // console.log('service', service);
                  const item = JSON.parse(service.sub_service);
                  console.log('item', item);
                  return (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        marginTop: 10,
                      }}
                      key={service.id}
                    >
                      <div>
                        <CheckBox
                          label={service.service_type}
                          checked={
                            !!serviceType && serviceType[service.service_type]
                          }
                          onChange={(event: any) =>
                            handleChangeServiceType(event, service.service_type)
                          }
                          name={service.service_type}
                        />
                      </div>
                      {!!serviceType && serviceType[service.service_type] && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 10,
                          }}
                        >
                          <div>
                            <CheckBox
                              label={item.sub_services}
                              checked={
                                !!subService && subService[item.sub_services]
                              }
                              onChange={(event: any) =>
                                handleChangeSubService(event, item.sub_services)
                              }
                              name={item.sub_services}
                            />
                          </div>
                          {!!subService && subService[item.sub_services] && (
                            <div>
                              <Input
                                name="price"
                                type="number"
                                icon={FiUser}
                                placeholder="Preço do serviço"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
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
