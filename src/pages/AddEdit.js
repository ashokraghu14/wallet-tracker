import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import useForm from '../hooks/useForm.js';
import validate from '../validation/validateWallet.js'
import axios from "axios";
import '../App.css';
import { formatData } from '../data/utils.js';
import InputText from '../components/InputText.js';

export default function AddEdit() {

  const {handleChange, handleSubmit, values, setValues, errors} = useForm(submit, validate);

  function submit(){
    const wallet = formatData(values);
    if (wallet._id) {
      axios.post(`http://localhost:4000/wallettracker/update/${wallet._id}`, wallet)
          .then(res => console.log(res.data));
    } else {
      axios.post('http://localhost:4000/wallettracker/add', wallet)
          .then(res => console.log(res.data));
    }
  }

  useEffect(() => {
    const id = window.location.hash.split("/")[1];
    if (id !== "undefinded") {
      axios.get(`http://localhost:4000/wallettracker/fetchWallet/${id}`)
          .then(res => setValues(res.data));
    }
  }, [])


  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            placeholder="YYYY-MM-DD"
            className={errors.date ? "form-control field-error" : "form-control"}
            name="date"
            value={values.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-4">
          <InputText
            label="Description"
            id="description"
            name="description"
            value={values.description}
            handleChange={handleChange}
            errors={errors.description}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-4">
          <InputText
            label="Income/Expense"
            id="income"
            name="income"
            value={values.income}
            handleChange={handleChange}
            errors={errors.income}
          />
        </div>
        <div className="form-group col-md-4">
          <InputText
            label="Enter amount"
            id="amount"
            name="amount"
            value={values.amount}
            handleChange={handleChange}
            errors={errors.amount}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary">{window.location.hash.split("/")[1] ? "Update the Wallet" : "Create New Wallet"}</button>
        </div>
      </div>
    </form>
  );
}
