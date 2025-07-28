import express from 'express';
import prisma from '../DB/db.config.js'

export const addTask = async (req, res) => {
    const {taskName,assignTo,taskType,taskStatus} = req.body;
    try {
        const newTask = await prisma.task.create({ data:{
            taskName, assignTo, taskType, taskStatus
            }});
        return res.status(201).json({message:"Task Created Suceesfully"})
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error creating task" })
    }
        }   