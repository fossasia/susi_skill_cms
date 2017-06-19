import request from '../utils/request';
import { parseParam } from '../utils/func';

export async function login (params) {
  return request('/login', {

  })
}

export async function logout () {
  return request('/logout', {

  })
}
