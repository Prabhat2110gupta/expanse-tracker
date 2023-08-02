 //import React, { useState,useEffect } from 'react';
// import moment from 'moment';
const moment =require('moment');
const transectionModel = require("../models/transectionModel");
const getAllTransection =async(req, res) =>{
    try {
        const {frequency,selectDate,type} = req.body;
        
        const transection = await transectionModel.find({ 
            ...(frequency!=='custom'?{
                date:{
                    $gt: moment().subtract(Number(frequency),'d').toDate(),
                              },
                            }:{
                                date:{
                                 $gte: selectDate[0],
                                 $lte:selectDate[1],  
                                }
                            
            }),
          
            userid: req.body.userid,
            ...(type !=='all' && {type}),
        });
       
        res.status(200).json(transection);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
const deleteTransection=async(req,res)=>{
    try {
        await transectionModel.findOneAndDelete({_id:req.body.transectionId})
            
            res.status(200).send(" Delete Successfully");
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};
const editTransection=async(req,res)=>{
    try {
        await transectionModel.findOneAndUpdate({_id:req.body.transectionId},
            req.body.payload);
            res.status(200).send("Edit Successfully");
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};
const addTransection=async(req,res)=>{
   try {
    const newTransection=new transectionModel(req.body);
    await newTransection.save()
    res.status(201).send('Transection Created')
   } catch (error) {
    console.log(error);
    res.status(500).json(error);
   }
};
module.exports={getAllTransection,addTransection,editTransection,deleteTransection};