import React, {Component, Fragment} from 'react';
import {Row, Col, Card, Form, Input, Select, Divider, Button, Dropdown, Icon, Menu, Modal, message} from 'antd';
import './Company.less';
import StandardTable from '@/components/StandardTable';
import {connect} from 'dva';
import styles from '@/pages/List/TableList.less';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

const FormItem = Form.Item;
const {Option} = Select;

const CreateForm = Form.create()(
  props => {
    const {modalVisible, form, handleAdd, handleModalVisible} = props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
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
          { form.getFieldDecorator('name',{
            rules:[{required:true,message:'请输入公司名称'}]
          })(<Input place="请输入公司名称" />)}
        </FormItem>
      </Modal>
    )
  }
)


/* eslint react/no-multi-comp:0 */
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
      title: '创始人',
      dataIndex: 'founder',
    },
    {
      title: '公司产品',
      dataIndex: 'product',
    },
    {
      title: '经营范围',
      dataIndex: 'field',
    },
    {
      title: '公司官网',
      dataIndex: 'website',
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
      payload:{
        start:1,
        limit:10
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
    const { dispatch } = this.props;
    dispatch({
      type: 'company/add',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
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
    const {selectedRows,modalVisible,updateModalVisible} = this.state;
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
          <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{md: 24, lg: 24, xl: 48}}>
              <Col md={8} sm={24}>
                <FormItem label="公司名称">
                  {getFieldDecorator('name')(<Input placeholder="请输入名称"/>)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="公司行业">
                  {getFieldDecorator('filed')(<Input placeholder="请输入公司行业"/>)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="公司规模">
                  {getFieldDecorator('scale')(
                    <Select placeholder="请选择公司规模" style={{width: '100%'}}>
                      <Option value="0">100-500</Option>
                      <Option value="1">501-10000</Option>
                      <Option value="2">10001+</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
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
        <CreateForm {...parentMethods} modalVisible={ modalVisible }></CreateForm>
      </PageHeaderWrapper>

    );
  }
}

export default Company;
