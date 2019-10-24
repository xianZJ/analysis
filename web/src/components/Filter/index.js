import React, {Component} from 'react';
import {Form, Button, Icon} from "antd";

import styles from '@/components/Filter/index.less';

const FormItem = Form.Item;
export default class Filter extends Component {
  state = {
    isShowAll: false
  };



  componentDidMount() {
    console.log('componentDidMount in Filter')
  }

  // 展开收齐功能
  onToggleState = () => {
    this.setState({
      isShowAll: !this.state.isShowAll
    })
  };

  // // 查询数据
  // onSubmit = () => {
  //     console.log('this.props onSubmit', this.props)
  // };
  //
  // // 重置查询条件
  // onReset = () => {
  //   console.log('this.props onReset', this.props)
  // };

  render() {
    const {children, onSearch, onReset} = this.props;
    const createChild = () => {
      if (this.state.isShowAll) {
        return children;
      }
      return children.slice(0, 1);
    };
    const createIcon = () => {
      if (!this.state.isShowAll) {
        return (
          <div>
            展开 <Icon type='down' />
          </div>)
      }
      return (
        <div>
          收起 <Icon type='up' />
        </div>)
    };
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        {
          createChild()
        }
        <FormItem>
          <Button type={"primary"} onClick={onSearch}>查询</Button>
        </FormItem>
        <FormItem>
          <Button onClick={onReset}>重置</Button>
        </FormItem>
        <FormItem className={styles.fc}>
          <div className={'filter-toggle'} onClick={() => this.onToggleState()}>
            {
              createIcon()
            }
          </div>
        </FormItem>
      </Form>
    );
  }
}
