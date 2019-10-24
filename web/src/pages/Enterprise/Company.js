import React, {Component, Fragment} from 'react';
import { Card, Form, Input, Select, Divider, Button, Dropdown, Icon, Menu, Modal, message} from 'antd';
import './Company.less';
import StandardTable from '@/components/StandardTable';
import {connect} from 'dva';
import styles from '@/pages/List/TableList.less';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import Filter from '@/components/Filter'

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
        title="添加公司"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="公司名称">
          {form.getFieldDecorator('name', {
            initialValue: rowData.name,
            rules: [{required: true, message: '请输入公司名称'}]
          })(<Input place="请输入公司名称" />)}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="公司法人">
          {form.getFieldDecorator('legal_person', {
            initialValue: rowData.legal_person,
            rules: [{required: true, message: '请输入公司法人'}]
          })(<Input place="请输入公司法人"/>)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="公司产品">
          {form.getFieldDecorator('products', {
            initialValue: rowData.products,
            rules: [{required: true, message: '请输入公司产品'}]
          })(<Input place="请输入公司产品"/>)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="经营范围">
          {form.getFieldDecorator('business_scope', {
            initialValue: rowData.business_scope,
            rules: [{required: true, message: '请输入经营范围'}]
          })(<Input place="请输入经营范围"/>)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="公司官网">
          {form.getFieldDecorator('official_website', {
            initialValue: rowData.official_website,
            rules: [{required: true, message: '请输入公司官网'}]
          })(<Input place="请输入公司官网" />)}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="公司官网">
          {form.getFieldDecorator('source', {
            initialValue: rowData.source||0,
            rules: [{required: true, message: '请输入公司官网'}]
          })(
            <Select placeholder="请选择" style={{width: '100%'}}>
              <Option value={0}>百度</Option>
              <Option value={1}>google</Option>
            </Select>
          )}
        </FormItem>
      </Modal>
    )
  }
)

@connect(({company, loading}) => ({
  company,
  loading: loading.models.company,
}))
@Form.create()
class Company extends Component {
  state = {
    modalVisible: false,
    selectedRows: [],
    rowData: {}
  };

  columns = [
    {
      title: '公司名称',
      dataIndex: 'name',
    },
    {
      title: '公司法人',
      dataIndex: 'legal_person',
    },
    {
      title: '公司产品',
      dataIndex: 'products',
    },
    {
      title: '经营范围',
      dataIndex: 'business_scope',
    },
    {
      title: '公司官网',
      dataIndex: 'official_website',
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
      type: 'company/fetch',
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
          type: 'company/remove',
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
    const  data = this.props.form.getFieldsValue(['name','field','scale'])
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
    const url = fields.id ? 'company/edit' : 'company/add';
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
       type: 'company/delete',
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
    const {
      company: {data},
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
            <FormItem label="公司名称">
              {getFieldDecorator('name')(<Input placeholder="请输入名称"/>)}
            </FormItem>
            <FormItem label="公司行业">
              {getFieldDecorator('field')(<Input placeholder="请输入名称"/>)}
            </FormItem>
            <FormItem label="公司规模">
              {getFieldDecorator('scale', {
                initialValue: '0'
              })(
                <Select placeholder="请选择公司规模" style={{width: '100%'}}>
                  <Option value="0">100-500</Option>
                  <Option value="1">501-10000</Option>
                  <Option value="2">10001+</Option>
                </Select>
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

export default Company;
