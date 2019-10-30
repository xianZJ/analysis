import React, {Component, Fragment} from 'react';
import { Card, Form, Input, Select, Divider, Button, Dropdown, Icon, Menu, Modal, message} from 'antd';
import './Dedicator.less';
import StandardTable from '@/components/StandardTable';
import {connect} from 'dva';
import styles from '@/pages/List/TableList.less';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import Filter from '@/components/Filter'
import TextArea from "antd/es/input/TextArea";

const FormItem = Form.Item;
const {Option} = Select;

const CreateForm = Form.create()(
  props => {
    const {modalVisible, rowData, form, handleAdd, handleModalVisible} = props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        console.log('fieldsValue = ', fieldsValue)
        console.log('fieldsValue = ', rowData)
        handleAdd(Object.assign(rowData,fieldsValue));
      })
    };

    return (
      <Modal
        destroyOnClose
        title="添加作者"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="姓名">
          {form.getFieldDecorator('dedicator_name', {
            initialValue: rowData.dedicator_name,
            rules: [{required: true, message: '请输入姓名'}]
          })(<Input place="请输入姓名" />)}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="供职公司">
          {form.getFieldDecorator('dedicator_companys', {
            initialValue: rowData.dedicator_companys,
            rules: [{required: true, message: '请输入供职公司'}]
          })(<TextArea rows={4} place="请输入供职公司" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="职务">
          {form.getFieldDecorator('dedicator_position', {
            initialValue: rowData.dedicator_position,
            rules: [{required: true, message: '请输入职务'}]
          })(<Input place="请输入职务" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="标签">
          {form.getFieldDecorator('dedicator_signs', {
            initialValue: rowData.dedicator_signs,
            rules: [{required: true, message: '请输入标签'}]
          })(<Input place="请输入标签" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="Blogs">
          {form.getFieldDecorator('dedicator_blogs', {
            initialValue: rowData.dedicator_blogs,
            rules: [{required: true, message: '请输入Blogs'}]
          })(<Input place="请输入Blogs" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="github">
          {form.getFieldDecorator('dedicator_git', {
            initialValue: rowData.dedicator_git,
            rules: [{required: true, message: '请输入github'}]
          })(<Input place="请输入github" />)}
        </FormItem>

      </Modal>
    )
  }
)

@connect(({dedicator, loading}) => ({
  dedicator,
  loading: loading.models.dedicator,
}))
@Form.create()
class dedicator extends Component {
  state = {
    modalVisible: false,
    selectedRows: [],
    rowData: {}
  };

  columns = [
    {
      title: '姓名',
      dataIndex: 'dedicator_name',
    },
    {
      title: '生日',
      dataIndex: 'dedicator_birthday',
    },
    {
      title: '籍贯',
      dataIndex: 'dedicator_hometown',
    },
    {
      title: '供职公司',
      dataIndex: 'dedicator_companys',
    },
    {
      title: '职务',
      dataIndex: 'dedicator_position',
    },
    {
      title: '标签',
      dataIndex: 'dedicator_signs',
    },
    {
      title: 'Blog',
      dataIndex: 'dedicator_blogs',
    },
    {
      title: 'Github',
      dataIndex: 'dedicator_git',
    },

    {
      title: '创建时间',
      dataIndex: 'create_time',
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
      type: 'dedicator/fetch',
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
          type: 'dedicator/remove',
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
    const  data = this.props.form.getFieldsValue(['dedicator_name'])
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
    const url = fields.id ? 'dedicator/edit' : 'dedicator/add';
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
      type: 'dedicator/delete',
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
      dedicator: {data},
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
            <FormItem label="姓名">
              {getFieldDecorator('dedicator_name')(<Input placeholder="请输入姓名" />)}
            </FormItem>
            <FormItem label="标签">
              {getFieldDecorator('dedicator_signs')(<Input placeholder="请输入姓名" />)}
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

export default dedicator;
