import React, { useState } from "react";
import { Input , Collapse, Avatar, Modal, Select } from "antd";
import { DownOutlined, SearchOutlined, EditTwoTone , DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import data from "../celebrities.json";
import moment from "moment";
import "../App.css";

const CardList = () => {
    const { TextArea } = Input;

    const [activeCard, setActiveCard] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [items, setItems] = useState(data); 
    const [isEdit,setIsEdit] = useState(false);
    const [currentChanges, setCurrentChanges] = useState({});
    const onSearchChange = (e) => {
        setSearchQuery(e.target.value.trim().toLowerCase());
    };

    const handleEdit = (item) => {
        setIsEdit(true);
    }
    const editCancel = ()=>{
        setIsEdit(false);
        setCurrentChanges({}); 
    }

    const editApprove = () =>{
        setIsEdit(false);
        setItems(prevItems => {
            return prevItems.map(prevItem => {
                if (prevItem.id === activeCard) {
                    return {
                        ...prevItem,
                        ...currentChanges 
                    };
                }
                return prevItem;
            });
        });
        setCurrentChanges({});
    }
    const handleInputChange = (e) => {
        setCurrentChanges(prevChanges => ({
            ...prevChanges,
            [e.target.name]: e.target.value
        }));
    }
    const handleGenderChange = (value)=>{
        setCurrentChanges(prevChanges => ({
            ...prevChanges,
            ["gender"]: value
        }));
    }

    const handleDelete = (item) => {
        Modal.confirm({
            title: 'Are you sure you want to delete?',
            content: `You are going to delete ${item.first} ${item.last}.`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                const updatedItems = items.filter(dataItem => dataItem.id !== item.id);
                setItems(updatedItems);
                console.log("Deleted item:", item);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

     
    const showLabel = (item) => {
        return (
            <div style={{ height: '90px', display: 'flex', alignItems: 'center' }}>
                <Avatar size={64} style={{ backgroundColor: '#000', marginRight: '40px' }} src={item.picture} />
                {(isEdit && activeCard===item.id) ?<><Input defaultValue={item.first} name="first" className="name-input" onChange={handleInputChange}/> <Input defaultValue={item.last} className="name-input" name="last" onChange={handleInputChange}/></>:<h1>{item.first + " " + item.last}</h1>}
            </div>
        )
    }
    const showContent = (item) => {
        return (
            <div>
                <div className="content-agc">
                    <div>
                        <span className="grey">Age</span><br/>
                        {!isEdit?<span>{item.dob?moment().diff(moment(item.dob, "YYYY-MM-DD"), "years")+" Years":"N/A"}</span>: 
                         <input
                         className="custom-datepicker"
                            type="date"
                            name="dob"
                            onChange={handleInputChange}
                            defaultValue={item.dob ? item.dob : ""}
                        />}
                    </div>
                    <div>
                        <span className="grey">Gender</span><br/>
                        {!isEdit?<span>{item.gender?item.gender.charAt(0).toUpperCase() + item.gender.slice(1):"N/A"}</span>:
                        <Select defaultValue={item.gender} style={{width:'150px'}} name="gender"  onChange={handleGenderChange}>
                            <Select.Option key="male" value="male">Male</Select.Option>
                            <Select.Option key="female" value="female">Female</Select.Option>
                            <Select.Option key="trans" value="transgender">Transgender</Select.Option>
                            <Select.Option key="rather" value="rather not say">Rather not say</Select.Option>
                            <Select.Option key="other" value="other">Other</Select.Option>
                        </Select>}
                    </div>
                    <div>
                        <span className="grey">Country</span><br/>
                        {!isEdit?<span>{item.country?item.country:"N/A"}</span>:<Input name="country"  onChange={handleInputChange} defaultValue={item.country}/>}
                    </div>
                </div>
                <span className="grey">Description</span><br/>
               {!isEdit?<span>{item.description}</span>: <TextArea name="description"  onChange={handleInputChange} rows={4} defaultValue={item.description}  />}
                <div style={{display:'flex', justifyContent:'end', fontSize:'20px'}}>
                    {!isEdit && <div>
                        <DeleteOutlined style={{color:'red', marginRight:'10px'}} onClick={()=>handleDelete(item)} />
                        <EditTwoTone onClick={()=>handleEdit(item)} />
                    </div>}
                    {isEdit && <div>
                        <CloseCircleOutlined style={{color:'red',  marginRight:'10px'}} onClick={()=>editCancel()}/>
                        <CheckCircleOutlined style={{color:'green'}} onClick={()=>editApprove()} />
                    </div>}
                </div>
            </div>
        )
    }

    const handleCardClick = (key) => {
        setActiveCard(activeCard === key ? null : key); 
        setIsEdit(false);
    }

    // Filter data is working based on search query
    const filteredData = items.filter(item =>
        (item.first + " " + item.last).toLowerCase().includes(searchQuery)
    );

    return (
        <div className="main-div">
            <Input placeholder="Search User" onChange={onSearchChange} prefix={<SearchOutlined />} />
            {filteredData.map((item) => (
                <div key={item.id} style={{ margin: "30px 0px", border: '2px solid #EAECCC', borderRadius: '20px' }}>
                    <Collapse
                        bordered={false}
                        collapsible={isEdit ? 'icon' : 'header'}
                        expandIcon={({ isActive }) => <span style={{ fontSize: '28px', marginTop: '70px' }}><DownOutlined rotate={isActive ? 180 : 0} /></span>}
                        expandIconPosition={"end"}
                        activeKey={activeCard === item.id ? [item.id] : []}
                        onChange={() => handleCardClick(item.id)}
                        items={[
                            {
                                key: item.id,
                                label: showLabel(item),
                                children: showContent(item),
                            },
                        ]}
                    />
                </div>
            ))}
        </div>
    );
};

export default CardList;
