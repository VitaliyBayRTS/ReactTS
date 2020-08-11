import React, { FunctionComponent } from 'react';
import preloader from '../../../assets/img/preloader.gif';
import s from './Preloader.module.scss';

interface propsInterface {

}

let Preloader: FunctionComponent<propsInterface> = (props) => {
    return <div>
        <img src={preloader} className={s.preloaderImg} alt=""/>
    </div>
}

export default Preloader;