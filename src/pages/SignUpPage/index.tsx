import React from 'react';
import { ContainerForm } from '../../components/ContainerForm';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperComponent';

export function SignUp(){
  return (
    <WrapperContent>
      <ContainerForm>
        <Form type='signup'/>
      </ContainerForm>
    </WrapperContent>
  )
}

