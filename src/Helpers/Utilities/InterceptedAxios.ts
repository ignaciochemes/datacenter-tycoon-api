import axios from 'axios';

const InterceptedAxios = axios.create();

export default InterceptedAxios;