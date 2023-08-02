import React, { useState,useEffect } from 'react';
import { Modal, Form, Input, Select,message,Table,DatePicker } from 'antd'
import {UnorderedListOutlined,AreaChartOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons';
import Layout from './../components/Layout/Layout';
import axios from'axios';
import moment from 'moment';
import Analtytics from '../components/Analytics';
 const { RangePicker } =DatePicker;


const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [allTransection, setAllTransection] = useState([]);
      const[frequency,setFrequency]=useState('7');
      const [selectDate,setSelectDate]=useState([]);
  const[type,setType]=useState('all');
  const [viewData,setViewDate]= useState('table');
  const[editable,setEditable]=useState(null);
  //get transection
  
  //table data
  const columns=[
    {
        title:'Data',
        dataIndex:'date',
        render: (text)=><span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
        title:'Amount',
        dataIndex:'amount',
    },
    {
        title:'Type',
        dataIndex:'type',
    },
    {
        title:'Category',
        dataIndex:'category',
    },
    {
        title:'Reference',
        dataIndex:'reference',
    },
    {
        title:'Action',
        render:(text,record)=>(
            <div>
                <EditOutlined onClick={()=>{
                    setEditable(record);
                    setShowModal(true);
                }}/>
                <DeleteOutlined className='mx-2' onClick={()=>{handleDelete(record)}}/>

            </div>
        )
    },
];
  //useEffect hook
  useEffect(()=>{
  
    const getAllTransection=async()=>{
        try {
           const user=JSON.parse(localStorage.getItem('user')); 
          const res= await axios.post('/transections/get-transection',{userid: user._id,frequency,selectDate,type
       
         
        }); 
          setAllTransection(res.data);
          console.log(res.data);
        } catch (error) {
            console.log(error);
           // message.error("something went worng");
        }
      };
    getAllTransection();
  },[frequency,selectDate,type]);
  //delete
  const handleDelete=async(record)=>{
    try {
        await axios.post('/transections/delete-transection',{transectionId:record._id} )
        message.success('deletion succesfully');
    } catch (error) {
       console.log(error);
       message.error('unable to hello delete') ;
    }
  }
 //   form handling
    const handleSubmit=async(values)=> {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if(editable){
                await axios.post('/transections/edit-transection', {
                  payload:{
                    ...values,
                    userId:user._id
                  },
                  transectionId:editable._id,
                });
                message.success("transection updated Successfully");
            }
            else{
                await axios.post('/transections/add-transection', {
                    ...values, userid: user._id
                });
                message.success("transection Added Successfully");
            }
            setShowModal(false);
            setEditable(null);
        } catch (error) {
            message.error('something went wrong');
        }
    }
    return (
        <Layout>
            <div className='filters'>
             <div>
                  <h6>
                    Select Frequency 
                     </h6> 
                    <Select value={frequency} onChange={(values)=>setFrequency(values)}>
                        <Select.Option value='7'>Last 1  Week</Select.Option>
                        <Select.Option value='30'>Last 1 Month</Select.Option>
                        <Select.Option value='365'>Last 1 Year</Select.Option>
                        <Select.Option value='custom'>Custom</Select.Option>
                    </Select>
                    {frequency==="custom"&&(<RangePicker value={selectDate} onChange={(values)=>setSelectDate(values)}
                    />
                    )}
                </div> 
                 <div>
                  <h6>
                    Select Type
                    </h6> 
                    <Select value={type}onChange={(values)=>setType(values)}>
                        <Select.Option value='all'>All</Select.Option>
                        <Select.Option value='income'>INCOME</Select.Option>
                        <Select.Option value='expense'>EXPENSE</Select.Option>
                        
                    </Select>
                     {frequency==="custom"&&(<RangePicker value={selectDate} onChange={(values)=>setSelectDate(values)}
                    />
                    )};
                </div> 
                <div className='switch-icons'>
<UnorderedListOutlined className={`'mx-2' ${viewData==='table'?'active-icon':'inactive-icon'}`} onClick={()=>setViewDate('table')}/>
<AreaChartOutlined className={`'mx-2' ${viewData==='analytics'?'active-icon':'inactive-icon'}`}  onClick={()=>setViewDate('analytics')}/>

                    </div>
                <div>
                
                    <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add New

                    </button>
                </div>
            </div>
            <div className='content'>
                {viewData==='table'?<Table  columns={columns} dataSource={allTransection}/>
                :<Analtytics allTransection={allTransection}/>
            
            }
                
                </div>
               
                <Modal 
                title={editable?'Edit Transaction':'Add Transection'} open={showModal} onCancel={() => setShowModal(false)}
                    footer={false}>
                    <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}> <Form.Item label="Amount" name="amount">
                        <Input type="text" />


                    </Form.Item>
                        <Form.Item label="type" name="type">
                            <Select>
                                <Select.Option value="income">Income</Select.Option>
                                <Select.Option value="expense">Expense</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Category" name="category">
                            <Select>
                                <Select.Option value="salary">Salary</Select.Option>
                                <Select.Option value="tip">Tip</Select.Option>
                                <Select.Option value="project">project</Select.Option>
                                <Select.Option value="food">food</Select.Option>
                                <Select.Option value="medical">medical</Select.Option>
                                <Select.Option value="tax">tax</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Date" name="date">
                            <Input type="date" />
                        </Form.Item>
                        <Form.Item label="Reference" name="reference">
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <Input type="text" />


                        </Form.Item>
                        <div className="d-flex justify-content-end">
                            <button className='btn btn-primary'>
                                SAVE
                            </button>
                        </div>
                    </Form>
                </Modal>
           

        </Layout>

    );
};
export default HomePage