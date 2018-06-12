import React, { Component } from 'react';
import PropTypes from 'prop-types';
import initials from 'initials';
import addPx from 'add-px';
import contrast from 'contrast';

const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

class CircleImage extends Component {
  render() {
    let {
      borderRadius = '100%',
      src,
      srcset,
      name,
      color,
      colors = defaultColors,
      size,
      style,
      className,
    } = this.props;

    if (!name) {
      throw new Error('CircleImage requires a name');
    }

    const abbr = initials(name);
    size = addPx(size);

    const imageStyle = {
      display: 'block',
      borderRadius,
    };

    const innerStyle = {
      lineHeight: size,
      textAlign: 'center',
      overflow: 'initial',
      marginRight: 10,
      borderRadius,
    };

    if (size) {
      imageStyle.width = innerStyle.width = innerStyle.maxWidth = size;
      imageStyle.height = innerStyle.height = innerStyle.maxHeight = size;
    }

    let inner,
      classes = [className, 'CircleImage'];
    if (src || srcset) {
      inner = (
        <img
          className="CircleImage--img"
          style={imageStyle}
          src={src}
          srcSet={srcset}
          alt={name}
        />
      );
    } else {
      let background;
      if (color) {
        background = color;
      } else {
        // pick a deterministic color from the list
        let i = sumChars(name) % colors.length;
        background = colors[i];
      }

      innerStyle.backgroundColor = background;

      inner = abbr;
    }

    if (innerStyle.backgroundColor) {
      classes.push(`CircleImage--${contrast(innerStyle.backgroundColor)}`);
    }

    return (
      <div aria-label={name} className={classes.join(' ')} style={style}>
        <div className="CircleImage--inner" style={innerStyle}>
          {inner}
        </div>
      </div>
    );
  }
}

CircleImage.propTypes = {
  borderRadius: PropTypes.string,
  src: PropTypes.string,
  srcset: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  colors: PropTypes.array,
  size: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default CircleImage;
