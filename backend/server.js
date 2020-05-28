const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const walletRoutes = express.Router();

const PORT = 4000

let Wallet = require('./wallet.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/wallet', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => console.log('MongoDB database connection established successfully'))

walletRoutes.route('/add').post((req, res) => {
  let newwallet = new Wallet(req.body);
  newwallet.save()
          .then(newwallet => {
            res.status(200).json({'newwallet': newwallet})
          })
          .catch(error => {
            res.status(400).json('adding new newwallet failed')
          });
});

walletRoutes.route('/update/:id').post((req, res) => {
  Wallet.findById(req.params.id, function(err, wallet) {
        if (!wallet)
            res.status(404).send("data is not found");
        else
            wallet.date = req.body.date;
            wallet.description = req.body.description;
            wallet.income = req.body.income;
            wallet.amount = req.body.amount;
            wallet.save().then(todo => {
                res.json('wallet updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

walletRoutes.route('/delete/:id').delete((req, res) => {
  Wallet.findByIdAndRemove(req.params.id, function(err, wallet) {
        if (!wallet){
          res.status(404).send("data is not found");
        } else {
          return res.status(200).send(wallet);
        }

    });
});

walletRoutes.route('/existingWallet').get((req, res) => {
  Wallet.find(function(err, wallet) {
    if (err) {
      console.log(err);
    } else {
	    res.json(wallet);
    }
  });
});

walletRoutes.route('/fetchWallet/:id').get((req, res) =>{
  let id = req.params.id;
    Wallet.findOne({_id: id}, function (err, wallet) {
    res.json(wallet);
  })
});

app.use('/wallettracker', walletRoutes);

app.listen(PORT, () => console.log('Server is running on port: '+ PORT))
