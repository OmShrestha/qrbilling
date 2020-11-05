import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Container } from 'reactstrap';

const ItemDetails = props => {
  return (
    <Container>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Phone No</Label>
          <Input type="phone_no" name="phone_no" id="phone_no" placeholder="Phone Number" />
        </FormGroup>
        <strong>OR</strong>
        <FormGroup>
          <Label for="exampleEmail">Full Name</Label>
          <Input type="fullname" name="fullname" id="fullname" placeholder="Full Name" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Phone No</Label>
          <Input type="phone_no" name="phone_no" id="phone_no2" placeholder="Phone Number" />
        </FormGroup>
        <Button color="primary" size="lg" onClick={() => {}}>
          Proceed
        </Button>
      </Form>
    </Container>
  );
};

export default ItemDetails;
