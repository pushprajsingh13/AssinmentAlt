import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateCustomer extends Component {
  constructor(props) {
    super(props);
    let params = new URLSearchParams(window.location.pathname);
    var customersid = params.get("customersid");
    this.state = {
      customers: [],
      customersidData: customersid,
      selectedCustomer: '',
      newPlanName: '',
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    fetch('http://localhost:5000/api/customers')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          customers: data,
        })
      )
      .catch((error) => {
        console.error('Error fetching customers:', error);
        this.setState({ error });
      });
  }

  handleCustomerChange = (event) => {
    this.setState({ selectedCustomer: event.target.value });
  };

  handlePlanChange = (event) => {
    this.setState({ newPlanName: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { selectedCustomer, newPlanName } = this.state;
    const customersidData = this.state.customersidData;
    const data = { customerId:customersidData , newPlanName: newPlanName };
    axios.patch(`http://localhost:5000/api/customers/aadhar/${customersidData}`, {
      newPlan: newPlanName,
    })
    .then(response => {
      console.log('Customer updated successfully:', response.data);
      alert('Customer updated successfully!');
    })
    .catch(error => {
      console.error('There was an error updating the customer:', error);
      alert('Error updating customer.');
    });
  };

  render() {
    const { customers, isLoading, error } = this.state;

    var planDetails=[
        {
          id:1,
          name:'Platinum365',
          cost:'499',
          validity:'365'
        },
        {
          id:2,
          name:'Gold180',
          cost:'299',
          validity:'180'
        },
        {
          id:3,
          name:'Silver90',
          cost:'199',
          validity:'90'
        }
      ];
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Update Customer Plan</h2>
          <div>
            <label>
              Select Customer:
              <select value={this.state.selectedCustomer} disabled onChange={this.handleCustomerChange}>
                {customers.map((customer) => (
                  <option key={customer.adharNumber} value={customer.adharNumber}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              New Plan:
              <select value={this.state.newPlanName} onChange={this.handlePlanChange}>
                <option>Select Plan</option>
                {
                  planDetails.map((detailsplan,index) => (
                    <option value={detailsplan.name}>{detailsplan.name+'/'+detailsplan.cost+'/'+detailsplan.validity}</option>
                  ))
                }
              </select>
            </label>
          </div>
          <button type="submit">Update Plan</button>
        </form>
        </div>
      );
    }
}

