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

  onToggleState = () => {
    this.setState({
      isShowAll: !this.state.isShowAll
    })
  };

  render() {
    const {children} = this.props;
    const createChild = () => {
      if (this.state.isShowAll) {
        return children;
      } else {
        return children.slice(0, 1);
      }
    };
    const createIcon = () => {
      if (!this.state.isShowAll) {
        return (
          <div>
            收起 <Icon type='up' />
          </div>)
      } else {
        return (
          <div>
            展开 <Icon type='down' />
          </div>)
      }
    }
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        {
          createChild()
        }
        <FormItem>
          <Button type={"primary"}>查询</Button>
        </FormItem>
        <FormItem>
          <Button>重置</Button>
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
