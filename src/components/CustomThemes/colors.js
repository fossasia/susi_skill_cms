import React from 'react';
import './colors.css';

export default class Colors extends React.Component {
    constructor(props) {
        super(props);
    };
    changeBackground(e) {
        if(e.target!==e.currentTarget){
            if(this.props.name === 'backgroundColor') { // eslint-disable-line
                localStorage.setItem('backgroundColor',e.target.id);
            }
            else {
                localStorage.setItem('backgroundColor','');
            }
        }
        e.stopPropagation();
    }

    render() {

        return(
            <div onClick={this.changeBackground.bind(this)}>
            <button style={{backgroundColor:'#e25141'}} className='buttonStyle' id='#e25141' />
            <button style={{backgroundColor:'#d73964'}} className='buttonStyle' id='#d73964' />
            <button style={{backgroundColor:'#8f36aa'}} className='buttonStyle' id='#8f36aa' />
            <button style={{backgroundColor:'#5f40b0'}} className='buttonStyle' id='#5f40b0' />
            <button style={{backgroundColor:'#4053af'}} className='buttonStyle' id='#4053af' />
            <button style={{backgroundColor:'#4596ec'}} className='buttonStyle' id='#4596ec' />
            <button style={{backgroundColor:'#47a8ee'}} className='buttonStyle' id='#47a8ee' />
            <button style={{backgroundColor:'#51bad1'}} className='buttonStyle' id='#51bad1' />
            <button style={{backgroundColor:'#419388'}} className='buttonStyle' id='#419388' />
            <button style={{backgroundColor:'#67ac5b'}} className='buttonStyle' id='#67ac5b' />
            <button style={{backgroundColor:'#97c15b'}} className='buttonStyle' id='#97c15b' />
            <button style={{backgroundColor:'#d1da59'}} className='buttonStyle' id='#d1da59' />
            <button style={{backgroundColor:'#fdea60'}} className='buttonStyle' id='#fdea60' />
            <button style={{backgroundColor:'#f7c244'}} className='buttonStyle' id='#f7c244' />
            <button style={{backgroundColor:'#f29c38'}} className='buttonStyle' id='#f29c38' />
            <button style={{backgroundColor:'#ed6237'}} className='buttonStyle' id='#ed6237' />
            <button style={{backgroundColor:'#74564a'}} className='buttonStyle' id='#74564a' />
            <button style={{backgroundColor:'#657c89'}} className='buttonStyle' id='#657c89' />
            <button style={{backgroundColor:'#0e0e0e'}} className='buttonStyle' id='#0e0e0e' />
            <button style={{backgroundColor:'#ffffff'}} className='buttonStyle' id='#ffffff' />
            </div>
        );
    }

}
