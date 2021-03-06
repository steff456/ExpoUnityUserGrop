import React, { Component } from 'react';
import {Container, Row, Col, Button,Form, FormGroup, Label, Input} from 'reactstrap';
import './auth.css';
import axios from 'axios';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {valueCorreo: '',
                  valuePass: ''};

    this.toggle_form = this.toggle_form.bind(this);
    this.handleChangeCorreo = this.handleChangeCorreo.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeCorreo(event) {
    this.setState({valueCorreo: event.target.value});
  }
    handleChangePass(event) {
    this.setState({valuePass: event.target.value});
  }

     toggle_form = (event) => {
       event.preventDefault();
      axios.get('http://localhost:3001/participantes',{ params:{
        correo: this.state.valueCorreo,
        pass: this.state.valuePass
      }})
      .then(response => {
        console.log('axioos: ', response)
        if(response.data.length===0)
        {
          alert('No existe el correo, o la contaseña está mal')
        }
        else{
        this.props.handleSubmit(response)
        return response
        }

      })
      .catch(function (error) {
        console.log(error);
      })
    }

  //MACHETAZO NO SE INCLUYE ACA SINO EN PADRE
    handleSubmit(event) {

    //fetch(`http://localhost:3001/participantes?correo=${this.state.valueCorreo}&pass=${this.state.valuePass}`,{mode:'no-cors'})
   //.then((response) => {
   // console.log('componentDidUpdate')
    //console.log(response)
   //})
      event.preventDefault();
      axios.get('http://localhost:3001/participantes',{ params:{
        correo: this.state.valueCorreo,
        pass: this.state.valuePass
      }})
      .then(response => {
        console.log('axioos: ', response.data)
        return response
      })
      .then(function(response){

        console.log("second callback response> ",response)
      })
      .catch(function (error) {
        console.log(error);
      })
  
  }

  componentDidUpdate(){
   if(this.state.valueCorreo!=='' && this.state.valuePass!==''){
   
  }}


  render() {
    return (
      <Container className='popup'>
        <div className='popup_inner'>
        <Row>
              <Col lg="12">
                <h1 >  <b>{this.props.text}</b></h1>
              </Col>
        </Row>
        <Container className='formulario'>
        <Form onSubmit={this.toggle_form}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-1">Correo</Label>
          <Input value={this.state.valueCorreo} onChange={this.handleChangeCorreo} type="email" name="email" id="exampleEmail" placeholder="abc@gmail.com" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-1">Contraseña</Label>
          <Input value={this.state.valuePass} onChange={this.handleChangePass} type="password" name="password" id="examplePassword" placeholder="Constraseña!" />
        </FormGroup>
        <Button className="sendFormbtn">Submit</Button>
      </Form>
      </Container>

        <Button className="cierre"onClick={this.props.closePopup}>Cerrar</Button>
        </div>
      </Container>
    );
  }
}

class Auth extends Component {
  constructor(props) {
    super(props);
     this.togglePopup = this.togglePopup.bind(this);
     this.formSubmit = this.formSubmit.bind(this);  
        this.state = {
      showPopup: false,
      data:''
    };
   
    }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
      formSubmit = (filterValue) =>  {
        console.log('formu submiit')
        this.setState({showPopup:false,
                      data: filterValue.data});
        console.log(this.state)
      
    }

/*
formSubmit(e){
 e.preventDefault();
 this.formSubmit = this.formSubmit.bind(this)
   axios.get('http://localhost:3001/participantes',{ params:{
        correo: e.target[0].value,
        pass: e.target[1].value
      }})
      .then(response => {
       console.log('axioos: ', response.data)
        return response
      })
      .then(function(response){
        console.log("second callback response> ",response)
          this.setState({showPopup:false,
                         data:response.data})
      })
      .catch(function (error) {
        console.log(error);
      })

}
*/
  
  render() {
    return (
      <Container className='containerAuth'>
        <Row>
              <Col lg="12">
                <h4>  <b>Eres miembro de alguna Expo?</b></h4>
              </Col>
            </Row>
              <Row>
              <Col lg="12">
                <p>Inicia sesisión :) </p>
              </Col>
            </Row>

            <Button outline color="secondary" onClick={this.togglePopup}>Oprime aquí para iniciar sesisón</Button>
              {this.state.showPopup ? 
          <Popup
            text='Autentíquese'
            closePopup={this.togglePopup.bind(this)}
            handleSubmit={this.formSubmit.bind(this)}
          />
          : null
        }
            <Row>
            </Row>
     </Container>
    );
  }
}

export default Auth;