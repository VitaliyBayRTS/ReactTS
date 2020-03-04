import React from 'react';
import state from './redux/state';
import {rerenderEntireTree} from './redux/render';

rerenderEntireTree(state);