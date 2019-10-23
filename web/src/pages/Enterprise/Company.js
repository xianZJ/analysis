import React, {Component, Fragment} from 'react';
import {Row, Col, Card, Form, Input, Select, Divider, Button, Dropdown, Icon, Menu, Modal, message} from 'antd';
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
    const {modalVisible, form, handleAdd, handleModalVisible} = props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        // form.resetFields();
        console.log('fieldsValue = ', fieldsValue)
        handleAdd(fieldsValue);
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
            rules: [{required: true, message: '请输入公司名称'}]
          })(<Input place="请输入公司名称"/>)}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="公司法人">
          {form.getFieldDecorator('legal_person', {
            rules: [{required: true, message: '请输入公司法人'}]
          })(<Input place="请输入公司法人"/>)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="公司产品">
          {form.getFieldDecorator('products', {
            rules: [{required: true, message: '请输入公司产品'}]
          })(<Input place="请输入公司产品"/>)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="经营范围">
          {form.getFieldDecorator('business_scope', {
            rules: [{required: true, message: '请输入经营范围'}]
          })(<Input place="请输入经营范围"/>)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="公司官网">
          {form.getFieldDecorator('official_website', {
            rules: [{required: true, message: '请输入公司官网'}]
          })(<Input place="请输入公司官网"/>)}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="公司官网">
          {form.getFieldDecorator('source', {
            initialValue: 0,
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
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
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
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
          <Divider type="vertical"/>
          <a href="">订阅警报</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'company/fetch',
      payload: {
        start: 1,
        limit: 10
      }
    });
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'company/fetch',
      payload: {},
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

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const {dispatch, form} = this.props;
    form.validateFields((err, fieldsValues) => {
      console.log('err = ', err)
      if (err) return;

      const values = {
        start: 1,
        limit: 10
      };
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'company/fetch',
        payload: values,
      });
    });
  };

  handleAdd = fields => {
    const {dispatch} = this.props;
    dispatch({
      type: 'company/add',
      payload: {
        ...fields,
        resolve: (res) => {
          console.log('res = ', res)
          if (res && res.code === 200) {
            message.success('添加成功');
            this.handleModalVisible();
          }
        }
      }
    })
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleStandardTableChange = () => {
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {
      company: {data},
      loading,
    } = this.props;
    const {selectedRows, modalVisible, updateModalVisible} = this.state;
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
          <Filter>
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
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>
            {selectedRows.length > 0 && (
              <span>
              <Button>批量操作</Button>
              <Dropdown overlay={menu}>
                <Button>
                  更多操作 <Icon type="down"/>
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
        <CreateForm {...parentMethods} modalVisible={modalVisible}></CreateForm>
      </PageHeaderWrapper>

    );
  }
}

export default Company;
