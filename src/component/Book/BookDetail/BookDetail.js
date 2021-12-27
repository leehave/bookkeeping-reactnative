import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    StyleSheet,
    Share
} from 'react-native';
import BaseContainer from '~/common/Base/BaseContainer'
import BookHeader from './BookHeader'
import BookTable from './BookTable'
import BookBottom from './BookBottom'
import BDRightItem from './BDRightItem'
import DeviceStorage from '~/utils/DeviceStorage'


export default class BookDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            model: null
        };
        this.table = React.createRef()
    }

    componentDidMount = () => {
        DeviceEventEmitter.addListener(EVENT.REPLACE_BOOK_EVENT, this.getData);
        console.log(this.props.navigation, this.props.route, 'detail')
        this.getData(this.props.route.params.model)
    };


    componentWillUnmount = () => {
        DeviceEventEmitter.removeListener(EVENT.REPLACE_BOOK_EVENT, this.getData)
    }

    getData = (model)=>{
        // this.table.setModel(this.props.route.params.model)
        // console.log(this.table,'tabnl')
        this.setState({
            model: model
        })
    }
    
    _shareFunc = async () => {
      try {
        const result = await Share.share({
          message:
            '分享本APP',
        });
  
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    }

    _hasContentRight = ()=>{
        return (
            <BDRightItem onPress={this._shareFunc}/>
        )
    }

    // 编辑
    _onEditPress = ()=>{
        const { navigation,route } = this.props
        navigation.navigate('Book', {'mode': route.params.model})
    }

    _navigateBack = () => {
      console.log('click back')
      this.props.navigation.goBack()
    }

    // 删除
    _onRemovePress = async ()=>{
        const { params } = this.props.route
        await DeviceStorage.removeBook(params.model)
        DeviceEventEmitter.emit(EVENT.REMOVE_BOOK_EVENT)
        setTimeout(() => {
            this.props.navigation.goBack()
        }, 0);
    }

    render() {
        const { params } = this.props.route
        return (
            <BaseContainer 
                navigation={this.props.navigation} 
                hasLeft={false}
                hasTitle={false} 
                hasRight={true}
                onBackPress={this._navigateBack}
                hasContentRight={this._hasContentRight}
            >
                <BookHeader model={this.state.model ? this.state.model : params.model}/>
                <BookTable ref={this.table}/>
                <BookBottom 
                    onEditPress={this._onEditPress} 
                    onRemovePress={this._onRemovePress}
                />
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    
});