import React, {Component} from 'react';
import {ScrollView, DeviceEventEmitter, StyleSheet,View, SafeAreaView, SectionList} from 'react-native';
import HomeGlobal from './HomeGlobal';
import BaseContainer from '~/common/Base/BaseContainer';
import HomeNavigation from './HomeNavigation';
import HomeHeader from './HomeHeader';
import HomeTable from './Table/HomeTable';
import DeviceStorage from '~/utils/DeviceStorage';

const scrollH =
  SCREEN_HEIGHT - NAVIGATION_HEIGHT - HOME_HEADER_H - STATUS_TABBAR_HEIGHT;
export default class Home extends Component {
  constructor(props) {
    const date = new Date();
    console.log(date, 'currentYear')
    super(props);
    this.state = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      models1: [],
      models2: [],
      models3: [],
      enabled: true,
      refreshing: false
    }
    // this.scroll = React.createRef()
  }

  componentDidMount = () => {
    DeviceStorage.initialization();
    DeviceEventEmitter.addListener(EVENT.ADD_BOOK_EVENT, this.getData);
    DeviceEventEmitter.addListener(EVENT.REMOVE_BOOK_EVENT, this.getData);
    DeviceEventEmitter.addListener(EVENT.REPLACE_BOOK_EVENT, this.getData);
    this.getData();
    // setTimeout(() => {
    //   this.scroll.scrollTo({x: 0, y: scrollH, animated: false});
    // }, 0);
  };

  componentWillUnmount = () => {
    // DeviceEventEmitter.removeListener(EVENT.ADD_BOOK_EVENT, this.getData);
    // DeviceEventEmitter.removeListener(EVENT.REMOVE_BOOK_EVENT, this.getData);
    // DeviceEventEmitter.removeListener(EVENT.REPLACE_BOOK_EVENT, this.getData);
  };

  getData = async () => {
    var models = await DeviceStorage.getBook(this.state.year, this.state.month);
    console.log(JSON.stringify(models), "home getDate")
    this.setState({
      models2: models,
    });
  };

  // 点击
  _onPress = (item, index, section) => {
    this.props.navigation.navigate('BookDetail', {model: item});
  };

  // 操作(删除)
  _onActionShow = async rowKey => {
    const section = parseInt(rowKey.split('.')[0]);
    const row = parseInt(rowKey.split('.')[1]);
    const model = this.state.models2[section].data[row];
    // 删除
    await DeviceStorage.removeBook(model);
    // 通知
    DeviceEventEmitter.emit(EVENT.REMOVE_BOOK_EVENT, {});
  };

  // 改变时间
  _onChangeDate = (year, month) => {
    this.setState({
      year: parseInt(year),
      month: parseInt(month),
    });
    setTimeout(() => {
      DeviceEventEmitter.emit(EVENT.ADD_BOOK_EVENT, {});
    }, 300);
  };

  // 下拉
  _pullRefresh = async () => {
    var year = this.state.year;
    var month = this.state.month;
    if (this.state.month == 12) {
      year += 1;
      month = 1;
    } else {
      month += 1;
    }
    var models = await DeviceStorage.getBook(year, month);
    this.setState({
      models1: models,
      year: year,
      month: month,
      refreshing: true
    });

    // this.refs.scroll.scrollTo({x: 0, y: 0, animated: true});
    setTimeout(() => {
      this.setState({models2: models, refreshing: false});
      // this.refs.scroll.scrollTo({x: 0, y: scrollH, animated: false});
    }, 1000);
  };

  // 上拉
  _pullUpRefresh = async () => {
    var year = this.state.year;
    var month = this.state.month;
    if (this.state.month == 1) {
      year -= 1;
      month = 12;
    } else {
      month -= 1;
    }
    var models = await DeviceStorage.getBook(year, month);
    this.setState({
      models3: models,
      year: year,
      month: month,
    });

    // this.refs.scroll.scrollTo({x: 0, y: scrollH * 2, animated: true});
    setTimeout(() => {
      this.setState({models2: models});
      // this.refs.scroll.scrollTo({x: 0, y: scrollH, animated: false});
    }, 300);
  };

  // 导航栏
  hasTitleComponent = () => {
    return <HomeNavigation />;
  };

  render() {
    return (
      <BaseContainer
        navigation={this.props.navigation}
        hasLeft={true}
        hasTitle={false}
        hasTitleComponent={this.hasTitleComponent}>
        <HomeHeader
          year={this.state.year}
          month={this.state.month}
          models={this.state.models2}
          onChangeDate={this._onChangeDate}
        />
          {/* <ScrollView
            ref={"scroll"}
            contentContainerStyle={styles.scroll}
            scrollEnabled={this.state.enabled}> */}
            {/* <HomeTable models={this.state.models1} refreshing={this.state.refreshing} /> */}
            <HomeTable
              models={this.state.models2}
              refreshing={this.state.refreshing}
              pullRefresh={this._pullRefresh}
              actionRow={this._onActionShow}
              onPress={this._onPress}
            />
            {/* <HomeTable models={this.state.models3} /> */}
          {/* </ScrollView> */}
      </BaseContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    backgroundColor: '#fff',
    width: SCREEN_WIDTH,
    height: scrollH,
  },
});
