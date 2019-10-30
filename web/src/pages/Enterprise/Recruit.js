import React, {Component, Fragment} from 'react';
import { Card, Form, Input, Select, Divider, Button, Dropdown, Icon, Menu, Modal, message} from 'antd';
import './Recruit.less';
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
          {form.getFieldDecorator('company_name', {
            initialValue: rowData.company_name,
            rules: [{required: true, message: '请输入公司名称'}]
          })(<Input place="请输入公司名称" />)}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="职位">
          {form.getFieldDecorator('company_position', {
            initialValue: rowData.company_position,
            rules: [{required: true, message: '请输入职位'}]
          })(<Input place="请输入职位" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="薪资">
          {form.getFieldDecorator('compensation', {
            initialValue: rowData.compensation,
            rules: [{required: true, message: '请输入薪资'}]
          })(<Input place="请输入薪资" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="公司地址">
          {form.getFieldDecorator('company_location', {
            initialValue: rowData.company_location,
            rules: [{required: true, message: '请输入公司地址'}]
          })(<Input place="请输入公司地址" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="工作年限">
          {form.getFieldDecorator('work_year', {
            initialValue: rowData.work_year,
            rules: [{required: true, message: '请输入工作年限'}]
          })(<Input place="请输入工作年限" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="学历">
          {form.getFieldDecorator('education_background', {
            initialValue: rowData.education_background||'不限',
            rules: [{required: true, message: '请选择学历'}]
          })(
            <Select placeholder="请选择学历" style={{width: '100%'}}>
              <Option value={'大专'}>不限</Option>
              <Option value={'大专'}>大专</Option>
              <Option value={'本科'}>本科</Option>
              <Option value={'研究生'}>研究生</Option>
              <Option value={'博士'}>博士</Option>
            </Select>
          )}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="经营范围">
          {form.getFieldDecorator('business_scope', {
            initialValue: rowData.business_scope,
            rules: [{required: true, message: '请输入经营范围'}]
          })(<Input place="请输入经营范围" />)}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="融资阶段">
          {form.getFieldDecorator('financial_stage', {
            initialValue: rowData.financial_stage,
            rules: [{required: true, message: '请输入融资阶段'}]
          })(<Input place="请输入融资阶段" />)}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="公司人数">
          {form.getFieldDecorator('company_scale', {
            initialValue: rowData.company_scale,
            rules: [{required: true, message: '请输入公司人数'}]
          })(<Input place="请输入公司人数" />)}
        </FormItem>

      </Modal>
    )
  }
)

@connect(({recruit, loading}) => ({
  recruit,
  loading: loading.models.recruit,
}))
@Form.create()
class Recruit extends Component {
  state = {
    modalVisible: false,
    selectedRows: [],
    rowData: {}
  };

  columns = [
    {
      title: '公司名称',
      dataIndex: 'company_name',
    },
    {
      title: '职位',
      dataIndex: 'company_position',
    },
    {
      title: '薪资',
      dataIndex: 'compensation',
    },
    {
      title: '公司地址',
      dataIndex: 'company_location',
    },
    {
      title: '工作年限',
      dataIndex: 'work_year',
    },
    {
      title: '学历',
      dataIndex: 'education_background',
    },
    {
      title: '经营范围',
      dataIndex: 'business_scope',
    },
    {
      title: '融资阶段',
      dataIndex: 'financial_stage',
    },

    {
      title: '公司人数',
      dataIndex: 'company_scale',
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
      type: 'recruit/fetch',
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
          type: 'recruit/remove',
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
    const  data = this.props.form.getFieldsValue(['company_name','business_scope','company_scale'])
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

  downloadTpl = (id) => {
    const {dispatch} = this.props;
    console.log("downloadTpl dispatch",dispatch)
    dispatch({
      type: 'recruit/download',
      payload: {...id,
      function(response){
        const url = window.URL.createObjectURL(response.url)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'aaa')
        document.body.appendChild(link)
        link.click()
      }}
    });
  };

  handleAdd = fields => {
    const {dispatch} = this.props;
    const url = fields.id ? 'recruit/edit' : 'recruit/add';
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
      type: 'recruit/delete',
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
      recruit: {data},
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
              {getFieldDecorator('company_name')(<Input placeholder="请输入名称"/>)}
            </FormItem>
            <FormItem label="公司规模">
              {getFieldDecorator('company_scale', {
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
            <Button icon="plus" type="primary" onClick={() => this.downloadTpl()}>
              模板下载
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

export default Recruit;
