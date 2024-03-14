import React, { Component } from 'react';
import axios from 'axios';
import './main.css'
import  { Navigate  } from 'react-router-dom';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    var date = curr.toISOString().substring(0,10);
    this.state = {
      name: '',
      dob: '',
      email: '',
      adharNumber: '',
      assignedMobileNumber: '',
      planName: '',
      registrationDate:date,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleDataChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Adjust the URL to your API endpoint
      const response = await axios.post('http://localhost:5000/api/customers', this.state);
      alert('Customer registered successfully!');

      this.setState({
        name: '',
        dob: '',
        email: '',
        adharNumber: '',
        assignedMobileNumber: '',
        planName: '',
      });
      window.location.href = "/customers-list";
    } catch (error) {
      console.error('There was an error registering the customer:', error);
      alert('Failed to register customer.');
    }
  };

handleDataChangeIdentityDataNumber = (event) => {
  event.preventDefault();
  const re = /^[0-9\b]+$/;
  if (event.target.value === '' || re.test(event.target.value)) {
    if(event.target.value.length > 12 ){

    }else{
      this.setState({
          adharNumber:event.target.value,
        });
    }
  }
}

handleDataChangeNumber = (event) => {
  event.preventDefault();
  const re = /^[0-9\b]+$/;
  if (event.target.value === '' || re.test(event.target.value)) {
    if(event.target.value.length > 10 ){

    }else{
      this.setState({
          assignedMobileNumber: event.target.value,
        });
    }
  }
}

  render() {
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
  <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div className="wrapper wrapper--w680">
            <div className="card card-4">
                <div className="card-body">
                    <h2 className="title">Registration Form</h2>
                    <form method="POST" onSubmit={this.handleSubmit}>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Name</label>
                                    <input className="input--style-4" required type="text" name="name" value={this.state.name} onChange={this.handleDataChange}/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">DOB</label>
                                    <div className="input-group-icon">
                                        <input className="input--style-4" required type="date" name="dob" value={this.state.dob} onChange={this.handleDataChange}/>
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                        <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Email</label>
                                    <input className="input--style-4" required type="email" name="email" value={this.state.email} onChange={this.handleDataChange}/>
                                </div>
                            </div>
                            
                                <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Adhar Number(12 Digit)</label>
                                    <input className="input--style-4" required type="text" minLength="12" maxLength="12" name="adharNumber" value={this.state.adharNumber} onChange={this.handleDataChangeIdentityDataNumber}/>
                                </div>
                              </div>
                            </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Registration Date</label>
                                    <input className="input--style-4" required type="date" value={this.state.registrationDate} disabled name="registrationDate"/>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">Assigned Mobile Number(10 Digit)</label>
                                    <input className="input--style-4" required type="text" minLength="10" maxLength="10" name="assignedMobileNumber" value={this.state.assignedMobileNumber} onChange={this.handleDataChangeNumber}/>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-4">
                                <div className="input-group">
                                    <label className="label">Plan</label>
                                    <select className="selectClass" name="planName" value={this.state.planName} onChange={this.handleDataChange} required>
                                      <option>Select Plan</option>
                                      {
                                        planDetails.map((detailsplan,index) => (
                                          <option value={detailsplan.name}>{detailsplan.name+'/'+detailsplan.cost+'/'+detailsplan.validity}</option>
                                        ))
                                      }
                                    </select>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="p-t-15">
                            <button className="btn btn--radius-2 btn--blue" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

