import React, {Component, Fragment} from 'react';
import { Card, Form, Input, Divider, Button, Dropdown, Icon, Menu, Modal} from 'antd';
import './Topic.less';
import StandardTable from '@/components/StandardTable';
import {connect} from 'dva';
import styles from '@/pages/List/TableList.less';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import Filter from '@/components/Filter'

const FormItem = Form.Item;
const {TextArea} = Input;
const CreateForm = Form.create()(
  props => {
    const {modalVisible, rowData, form, handleAdd, handleModalVisible} = props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd(Object.assign(rowData,fieldsValue));
      })
    };

    return (
      <Modal
        destroyOnClose
        title="添加Topic"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="名称">
          {form.getFieldDecorator('topic_name', {
            initialValue: rowData.topic_name,
            rules: [{required: true, message: '请输入名称'}]
          })(<Input place="请输入名称" />)}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="作者">
          {form.getFieldDecorator('topic_author', {
            initialValue: rowData.topic_author,
            rules: [{required: true, message: '请输入作者'}]
          })(<Input place="请输入作者" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="提出时间">
          {form.getFieldDecorator('topic_raise_time', {
            initialValue: rowData.topic_raise_time,
            rules: [{required: true, message: '请选择提出时间'}]
          })(<Input place="请选择提出时间" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="功能">
          {form.getFieldDecorator('topic_function', {
            initialValue: rowData.topic_function,
            rules: [{required: true, message: '请输入功能'}]
          })(<TextArea rows={4} place="请输入功能" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="当前版本">
          {form.getFieldDecorator('topic_current_version', {
            initialValue: rowData.topic_current_version,
            rules: [{required: true, message: '请输入当前版本'}]
          })(<Input place="请输入版本" />)}
        </FormItem>


        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="社区">
          {form.getFieldDecorator('topic_community', {
            initialValue: rowData.topic_community,
            rules: [{required: true, message: '请输入社区'}]
          })(<Input place="请输入社区" />)}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="仓储地址">
          {form.getFieldDecorator('topic_git_repository', {
            initialValue: rowData.topic_git_repository,
            rules: [{required: false, message: '请输入仓储地址'}]
          })(<Input place="请输入仓储地址" />)}
        </FormItem>
      </Modal>
    )
  }
)

@connect(({topic, loading}) => ({
  topic,
  loading: loading.models.topic,
}))
@Form.create()
class Topic extends Component {
  state = {
    modalVisible: false,
    selectedRows: [],
    rowData: {}
  };

  columns = [
    {
      title: '名称',
      dataIndex: 'topic_name',
    },
    {
      title: '作者',
      dataIndex: 'topic_author',
    },
    {
      title: '提出时间',
      dataIndex: 'topic_raise_time',
    },
    {
      title: '功能',
      dataIndex: 'topic_function',
    },
    {
      title: '当前版本',
      dataIndex: 'topic_current_version',
    },
    {
      title: '社区',
      dataIndex: 'topic_community',
    },
    {
      title: '仓储地址',
      dataIndex: 'topic_git_repository',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleModify(record)}>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDel(record.id)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.handleGetList();
  };

  handleGetList = (data) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'topic/fetch',
      payload: Object.assign({
        start: 1,
        limit: 10
      },data)
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleMenuClick = e => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;
    if (selectedRows.length === 0) {
      return;
    }
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'topic/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  onSearch = e => {
    e.preventDefault();
    const  data = this.props.form.getFieldsValue(['topic_name'])
    this.handleGetList(data);
  };

  onReset = e => {
    e.preventDefault();
    console.log('this.props = ',this.props)

  };

  showAdd = () => {
    this.setState({
      rowData: {}
    });
    this.handleModalVisible(true);
  };

  handleAdd = fields => {
    const {dispatch} = this.props;
    const url = fields.id ? 'topic/edit' : 'topic/add';
    dispatch({
      type: url,
      payload: {
        ...fields,
        resolve: (res) => {
          if (res && res.code === 200) {
            this.handleModalVisible();
            this.handleGetList();
          }
        }
      }
    })
  };

  handleModify = (record) => {
    console.log('record = ', record);
    this.setState({
      rowData: record
    });
    this.handleModalVisible(true);
  };

  handleDel = (id) => {
    const {dispatch} = this.props;
    console.log('id = ',id)
    dispatch({
      type: 'topic/delete',
      payload: {
        id,
        resolve: ()=>{
          this.handleGetList();
        }
      }
    })
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    console.log("this.props.topic = ",this.props)
    const {
      topic: {data},
      loading,
    } = this.props;
    const {selectedRows, modalVisible} = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false}>
          <Filter onReset={this.onReset} onSearch={this.onSearch}>
            <FormItem label="名称">
              {getFieldDecorator('topic_name')(<Input placeholder="请输入名称" />)}
            </FormItem>
            <FormItem label="作者">
              {getFieldDecorator('topic_author', {
                initialValue: '0'
              })(
                <Input placeholder="请输入作者" />
              )}
            </FormItem>
          </Filter>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.showAdd()}>
              新建
            </Button>
            {selectedRows.length > 0 && (
              <span>
                <Button>批量操作</Button>
                <Dropdown overlay={menu}>
                  <Button>
                    更多操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            )}
          </div>
          <StandardTable
            selectedRows={[]}
            loading={loading}
            data={data}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </Card>
        <CreateForm rowData={this.state.rowData} {...parentMethods} modalVisible={modalVisible}></CreateForm>
      </PageHeaderWrapper>

    );
  }
}

export default Topic;
