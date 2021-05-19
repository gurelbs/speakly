import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Speakly from './Speakly';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

ReactDOM.render(
    <StylesProvider jss={jss}>
      <Speakly />
    </StylesProvider>,
    document.getElementById('root')
);