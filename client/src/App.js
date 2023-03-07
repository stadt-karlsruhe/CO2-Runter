/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        setusername: '',
        setemail: '',
        setpassword: '',
        fetchData: [],
        emailUpdate: ''
      }
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value
    this.setState({
      [nam]: val
    })
  }

  handleChange2 = (event) => {
    this.setState({
      emailUpdate: event.target.value
    })
  }

  componentDidMount() {
    axios.get("/api/get")
      .then((response) => {
        this.setState({
          fetchData: response.data
        })
      })
  }

  submit = () => {
    axios.post('/api/insert', this.state)
      .then(() => { alert('success post') })
    console.log(this.state)
    document.location.reload();
  }

  delete = (id) => {
    if (confirm("Do you want to delete? ")) {
      axios.delete(`/api/delete/${id}`)
      document.location.reload()
    }
  }

  edit = (id) => {
    axios.put(`/api/update/${id}`, this.state)
    document.location.reload();
  }
  render() {

    let card = this.state.fetchData.map((val, key) => {
      return (
        <React.Fragment>
          <Card style={{ width: '18rem' }} className='m-2'>
            <Card.Body>
              <Card.Title>{val.username}</Card.Title>
              <Card.Text>
                {val.email}
              </Card.Text>
              <input name='emailUpdate' onChange={this.handleChange2} placeholder='Update email' ></input>
              <Button className='m-2' onClick={() => { this.edit(val.user_ID) }}>Update</Button>
              <Button onClick={() => { this.delete(val.user_ID) }}>Delete</Button>
            </Card.Body>
          </Card>
        </React.Fragment>
      )
    })

    return (
      <div className='App'>
        <h1>Co2Runter</h1>
        <div className='form'>
          <input name='setusername' placeholder='Enter Username' onChange={this.handleChange} />
          <input name='setemail' placeholder='Enter Email' onChange={this.handleChange} />
          <input name='setpassword' placeholder='Enter Password' onChange={this.handleChange} />
        </div>

        <Button className='my-2' variant="primary" onClick={this.submit}>Register new User</Button> <br /><br/>

        <Container>
          <Row>
            {card}
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;