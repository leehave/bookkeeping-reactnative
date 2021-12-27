'use strict';

import React from 'react';
import ListView from 'deprecated-react-native-listview';
import Pullable from '../local/Pullable';

export default class PullListView extends Pullable {

    getScrollable = () => {
        return (
            <ListView
                ref={(c) => this.scroll = c}
                {...this.props}/>
        );
    }
}
