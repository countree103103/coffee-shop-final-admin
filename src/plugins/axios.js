"use strict";

import Vue from "vue";
import axios from "axios";
import { SERVER_ADDRESS } from "../config";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: SERVER_ADDRESS,
  // timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

axios.defaults.withCredentials = true;
axios.defaults.baseURL = SERVER_ADDRESS;

export default axios;
