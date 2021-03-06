'use strict';
import React from 'react';
// import ListView from 'deprecated-react-native-listview';
import { FlatList } from 'react-native'
import Pullable from '../local/Pullable';

export default class PullFlatList extends Pullable {

    getScrollable = () => {
        return (
            <FlatList
                ref={(c) => this.scroll = c}
                {...this.props}/>
        );
    }
}
