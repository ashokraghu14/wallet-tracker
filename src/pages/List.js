import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import useForm from '../hooks/useForm.js';
import validate from '../validation/validateWallet.js';
import { formatData } from '../data/utils.js';
import InputText from '../components/InputText.js'
import axios from "axios";

export default function List() {
  const {handleChange, values, errors} = useForm(validate);
  const [existingWallet, setExistingWallet] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/wallettracker/existingWallet')
        .then(res => {
          setExistingWallet(res.data);
        })
        .catch(err => console.log(err))
  }, []);

  const handleDelete = (param) => {
    console.log('>>>'+param);
    const id = window.location.hash.split("/")[1];
    if (id !== "undefinded") {
      axios.get(`http://localhost:4000/wallettracker/delete/${param}`)
        .then(res => {
          setExistingWallet(res.data);
        })
        .catch(err => console.log(err))
    }
    window.location = "#list";
  }



  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">date</th>
          <th scope="col">description</th>
          <th scope="col">income/expense</th>
          <th scope="col">amount</th>
          <th scope="col">summary</th>
          <th scope="col">edit/delete</th>
        </tr>
      </thead>
      {existingWallet.map((wallet, index) => {
        return <tbody key={index}>
          <tr>
            <th scope="row">{index+1}</th>
            <th scope="row">{wallet.date}</th>
            <th scope="row">{wallet.description}</th>
            <th scope="row">{wallet.income}</th>
            <th scope="row">{wallet.amount}</th>
            <th scope="row">The income is {wallet.income} amount that he spent is {wallet.amount}</th>
            <Link to={'/addedit/'+wallet._id}>Edit</Link>&nbsp;&nbsp;&nbsp;
            <button type="button" onClick={() => handleDelete(wallet._id)} class="btn btn-primary btn-sm">Delete</button>
          </tr>
        </tbody>
      })}
    </table>
  );
}
