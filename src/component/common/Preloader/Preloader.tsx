import React, { FunctionComponent } from 'react';
import preloader from '../../../assets/img/preloader.gif';

interface propsInterface {

}

let Preloader: FunctionComponent<propsInterface> = (props) => {
    return <div>
        <img src={preloader} alt=""/>
    </div>
}

export default Preloader;