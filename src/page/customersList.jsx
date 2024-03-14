import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link  } from 'react-router-dom';
export default class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      isLoading: false,
      showModal: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchCustomers();
  }


  fetchCustomers() {
    this.setState({ isLoading: true });
    fetch('http://localhost:5000/api/customers') 
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) =>

        this.setState({
          customers: data,
          isLoading: false,
        })
      )
      .catch((error) =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  render() {
    const { customers, isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <h2>Customer List</h2>
          { customers.length > 0 ?
            customers.map((customer) => (
            <span key={customer.id}>
            <Link to={'/update-customer/&customersid='+customer.adharNumber}>
              <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action href="#link1">
                  <p>Name: {customer.name}, Email: {customer.email}, Plan: {customer.planName}</p>
                </ListGroup.Item>
              </ListGroup>
              </Link>
            </span>
          ))
            :""}
      </div>
    );
  }
}

