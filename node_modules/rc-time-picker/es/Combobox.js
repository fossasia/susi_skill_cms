import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';

var formatOption = function formatOption(option, disabledOptions) {
  var value = '' + option;
  if (option < 10) {
    value = '0' + option;
  }

  var disabled = false;
  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value: value,
    disabled: disabled
  };
};

var Combobox = function (_Component) {
  _inherits(Combobox, _Component);

  function Combobox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Combobox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Combobox.__proto__ || Object.getPrototypeOf(Combobox)).call.apply(_ref, [this].concat(args))), _this), _this.onItemChange = function (type, itemValue) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          defaultOpenValue = _this$props.defaultOpenValue,
          use12Hours = _this$props.use12Hours;

      var value = (_this.props.value || defaultOpenValue).clone();

      if (type === 'hour') {
        if (use12Hours) {
          if (_this.isAM()) {
            value.hour(+itemValue % 12);
          } else {
            value.hour(+itemValue % 12 + 12);
          }
        } else {
          value.hour(+itemValue);
        }
      } else if (type === 'minute') {
        value.minute(+itemValue);
      } else if (type === 'ampm') {
        var ampm = itemValue.toUpperCase();
        if (use12Hours) {
          if (ampm === 'PM' && value.hour() < 12) {
            value.hour(value.hour() % 12 + 12);
          }

          if (ampm === 'AM') {
            if (value.hour() >= 12) {
              value.hour(value.hour() - 12);
            }
          }
        }
      } else {
        value.second(+itemValue);
      }
      onChange(value);
    }, _this.onEnterSelectPanel = function (range) {
      _this.props.onCurrentSelectPanelChange(range);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Combobox, [{
    key: 'getHourSelect',
    value: function getHourSelect(hour) {
      var _props = this.props,
          prefixCls = _props.prefixCls,
          hourOptions = _props.hourOptions,
          disabledHours = _props.disabledHours,
          showHour = _props.showHour,
          use12Hours = _props.use12Hours;

      if (!showHour) {
        return null;
      }
      var disabledOptions = disabledHours();
      var hourOptionsAdj = void 0;
      var hourAdj = void 0;
      if (use12Hours) {
        hourOptionsAdj = [12].concat(hourOptions.filter(function (h) {
          return h < 12 && h > 0;
        }));
        hourAdj = hour % 12 || 12;
      } else {
        hourOptionsAdj = hourOptions;
        hourAdj = hour;
      }

      return React.createElement(Select, {
        prefixCls: prefixCls,
        options: hourOptionsAdj.map(function (option) {
          return formatOption(option, disabledOptions);
        }),
        selectedIndex: hourOptionsAdj.indexOf(hourAdj),
        type: 'hour',
        onSelect: this.onItemChange,
        onMouseEnter: this.onEnterSelectPanel.bind(this, 'hour')
      });
    }
  }, {
    key: 'getMinuteSelect',
    value: function getMinuteSelect(minute) {
      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          minuteOptions = _props2.minuteOptions,
          disabledMinutes = _props2.disabledMinutes,
          defaultOpenValue = _props2.defaultOpenValue,
          showMinute = _props2.showMinute;

      if (!showMinute) {
        return null;
      }
      var value = this.props.value || defaultOpenValue;
      var disabledOptions = disabledMinutes(value.hour());

      return React.createElement(Select, {
        prefixCls: prefixCls,
        options: minuteOptions.map(function (option) {
          return formatOption(option, disabledOptions);
        }),
        selectedIndex: minuteOptions.indexOf(minute),
        type: 'minute',
        onSelect: this.onItemChange,
        onMouseEnter: this.onEnterSelectPanel.bind(this, 'minute')
      });
    }
  }, {
    key: 'getSecondSelect',
    value: function getSecondSelect(second) {
      var _props3 = this.props,
          prefixCls = _props3.prefixCls,
          secondOptions = _props3.secondOptions,
          disabledSeconds = _props3.disabledSeconds,
          showSecond = _props3.showSecond,
          defaultOpenValue = _props3.defaultOpenValue;

      if (!showSecond) {
        return null;
      }
      var value = this.props.value || defaultOpenValue;
      var disabledOptions = disabledSeconds(value.hour(), value.minute());

      return React.createElement(Select, {
        prefixCls: prefixCls,
        options: secondOptions.map(function (option) {
          return formatOption(option, disabledOptions);
        }),
        selectedIndex: secondOptions.indexOf(second),
        type: 'second',
        onSelect: this.onItemChange,
        onMouseEnter: this.onEnterSelectPanel.bind(this, 'second')
      });
    }
  }, {
    key: 'getAMPMSelect',
    value: function getAMPMSelect() {
      var _props4 = this.props,
          prefixCls = _props4.prefixCls,
          use12Hours = _props4.use12Hours,
          format = _props4.format;

      if (!use12Hours) {
        return null;
      }

      var AMPMOptions = ['am', 'pm'] // If format has A char, then we should uppercase AM/PM
      .map(function (c) {
        return format.match(/\sA/) ? c.toUpperCase() : c;
      }).map(function (c) {
        return { value: c };
      });

      var selected = this.isAM() ? 0 : 1;

      return React.createElement(Select, {
        prefixCls: prefixCls,
        options: AMPMOptions,
        selectedIndex: selected,
        type: 'ampm',
        onSelect: this.onItemChange,
        onMouseEnter: this.onEnterSelectPanel.bind(this, 'ampm')
      });
    }
  }, {
    key: 'isAM',
    value: function isAM() {
      var value = this.props.value || this.props.defaultOpenValue;
      return value.hour() >= 0 && value.hour() < 12;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          prefixCls = _props5.prefixCls,
          defaultOpenValue = _props5.defaultOpenValue;

      var value = this.props.value || defaultOpenValue;
      return React.createElement(
        'div',
        { className: prefixCls + '-combobox' },
        this.getHourSelect(value.hour()),
        this.getMinuteSelect(value.minute()),
        this.getSecondSelect(value.second()),
        this.getAMPMSelect(value.hour())
      );
    }
  }]);

  return Combobox;
}(Component);

Combobox.propTypes = {
  format: PropTypes.string,
  defaultOpenValue: PropTypes.object,
  prefixCls: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  showHour: PropTypes.bool,
  showMinute: PropTypes.bool,
  showSecond: PropTypes.bool,
  hourOptions: PropTypes.array,
  minuteOptions: PropTypes.array,
  secondOptions: PropTypes.array,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  onCurrentSelectPanelChange: PropTypes.func,
  use12Hours: PropTypes.bool
};


export default Combobox;