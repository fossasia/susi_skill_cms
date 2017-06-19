// import EditableCell from '../components/common/EditableCell';
import { Input, Form, Select, Col, DatePicker } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import moment from 'moment';

// hyphen humps
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, function () {
    return arguments[1].toUpperCase()
  })
}

// hump turn character
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// Date formatting
Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length===1
        ? o[k]
        : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format;
}

function makeChildren (fathers, children, fKeyName, fValueName, cKeyName, cValueName, fatherKey = 'id', childrenKey = 'MASTERID',) {

  return fathers.map((father) => {
    father['children'] = [];
    father['label'] = father[fKeyName];
    father['value'] = father[fValueName];
    children.forEach(child => {
      if (father[fatherKey]===child[childrenKey]) {
        child['label'] = child[cKeyName];
        child['value'] = child[cValueName];
        father['children'].push(child)
      }
    })
    return father;
  })

}


function makePropsToFields (Fields, data) {
  let obj = {};
  Fields.forEach(item => {
    switch (item.type || 'text') {
      case 'text':
      case 'select':
        obj[item.key] = { value: data[item.key] }
        break;
      case 'datetime':
      case 'date':
        obj[item.key] = { value: moment(data[item.key]) }
        break;
      default:
        break;

    }
  });
  return obj;
}
