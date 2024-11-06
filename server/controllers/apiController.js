require('dotenv').config();
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BASIQ_API_KEY = process.env.BASIQ_API_KEY;

let access_token; 
const basiq_user_id = "c31ec381-8294-465c-ae21-67f9df0362f1"

const apiController = {
  // Function to execute the entire API flow
  executeFlow: async (req, res) => {
    try {
      // Step 1: Generate Auth Token
      console.log('Starting auth flow');
      const encodedParams = new URLSearchParams();
      encodedParams.set('scope', 'SERVER_ACCESS');

      const options = {
        method: 'POST',
        url: 'https://au-api.basiq.io/token',
        headers: {
          'accept': 'application/json',
          'basiq-version': '3.0',
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${BASIQ_API_KEY}`,
        },
        data: encodedParams,
      };
      const response = await axios(options);
      access_token = response.data.access_token;

      // Step 2: Check if the user has a basiq_user_id in Supabase DB
      console.log('Checking Supabase for basiq_user_id');
      const { data, error: supabaseError } = await supabase
      .from('users')
      .select('basiq_user_id');

      if (supabaseError) {
        if (supabaseError.code === 'PGRST116') {
          console.log('No basiq_user_id found in Supabase');
        } else {
          console.error('Error checking Supabase:', supabaseError);
        }
      }

      // Step 3: If basiq_user_id exists, call getBasiqUser; otherwise, call createBasiqUser
      if (basiq_user_id) {
        await apiController.getBasiqUser(access_token, basiq_user_id, req, res);
      } else {
        console.log('Basiq user not found. Creating...');
        await apiController.createBasiqUser(access_token);
      }
        await apiController.getAccount(access_token, basiq_user_id);
        await apiController.getTransactions(access_token, basiq_user_id);
        res.status(200).send(transactions)
      } catch (error) {
        console.error('Error:', error);
        res.status(400).send('Execute flow error')
      };
  },

  // Function to get consents
  getConsents: async (access_token, basiq_user_id, req, res) => {
    try{
      const options = {
        method: 'GET',
        url: `https://au-api.basiq.io/users/${basiq_user_id}/consents`,
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${access_token}`
        }
      };
      const response = await axios.request(options)
      res.status(200).send('getConsents successful')
    } catch (error) {
      console.error('getConsents error', error)
      res.status(400).send('getConsents error')
    }
  },

  // Function to get account
  getAccount: async (access_token, basiq_user_id, req, res) => {
  try {
    const options = {
      method: 'GET',
      url: `https://au-api.basiq.io/users/${basiq_user_id}/accounts/6cbd3f54-3623-4a7e-a73a-8cbb351b3487/`,
      headers: {accept: 'application/json', authorization: `Bearer ${access_token}`}
    };

    const response = await axios.request(options);
    account = response.data
    } catch (error) {
      console.error('getAccount error:', error);
    }
  },

  //function to get transactions
  getTransactions: async (access_token, basiq_user_id, req, res) => {
    try {
      const options = {
        method: 'GET',
        url: `https://au-api.basiq.io/users/${basiq_user_id}/transactions?filter=account.id.eq('6cbd3f54-3623-4a7e-a73a-8cbb351b3487')`,
        params: {limit: '250'},
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${access_token}`
        }
      };
      const response = await axios.request(options);
      transactions = response.data
      } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  },

  //function to post auth link
  postAuthLink: async (access_token, basiq_user_id, req, res) => {
    const options = {
      method: 'POST',
      url: `https://au-api.basiq.io/users/${basiq_user_id}/auth_link`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${access_token}`
      },
      data: { mobile: '+61412460636' }
    };

    try {
      const response = await axios.request(options);
      const authLinkData = response.data;
    } catch (error) {
      console.error(error);
    }
  },

  //function to get basiq user info from Basiq API
  getBasiqUser: async (access_token, basiq_user_id, req, res) => {
    try {
      console.log('Getting Basiq user');
      const options = {
        method: 'GET',
        url: `https://au-api.basiq.io/users/${basiq_user_id}`,
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${access_token}`
        }
      };
      const response = await axios.request(options);
    } catch (error) {
      console.error('Error:', error);
    }
  },

  //function to create Basiq user with hardcoded values
  createBasiqUser: async (access_token, req, res) => {
    try {
      console.log('Starting createBasiqUser function');

      const options = {
        method: 'POST',
        url: 'https://au-api.basiq.io/users',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${access_token}`
        },
        data: { email: 'gavin@hooli.com', firstName: 'Gavin', lastName: 'Belson' }
      };
      const response = await axios(options);

      const new_basiq_user_id = response.data.id;

      // Store basiq_user_id in Supabase
      const { data, error } = await supabase
        .from('users')
        .insert({basiq_user_id: new_basiq_user_id})
        .select()
      if (error) {
        console.error('Error storing basiq_user_id in Supabase:', error);
      } if (data){
        console.log(data)
        console.log('Successfully stored basiq_user_id in Supabase');
      }
      console.log('After createBasiqUser request');
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

module.exports = apiController;
