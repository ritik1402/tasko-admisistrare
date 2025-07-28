import express from 'express';
import prisma from '../DB/db.config.js'


export const addTask = async (req, res) => {
    const { taskName, taskType, taskStatus, assignedToUserId } = req.body;
    const createdById = req.user?.id;

    if (!createdById) {
        return res.status(401).json({ message: "Please login to create a task." });
    }

    
    const assignedUser = await prisma.user.findUnique({
        where: { id: Number(assignedToUserId) },
    });

    if (!assignedUser) {
        return res.status(400).json({ message: "Assigned user does not exist." });
    }

    try {
        const newTask = await prisma.task.create({
            data: {
                taskName,
                taskType,
                taskStatus,
                assignTo: assignedUser.userName, 
                userId: createdById, 
            },
        });

        return res.status(201).json({ message: "Task created and assigned successfully", task: newTask });
    } catch (error) {
        console.error("Add Task Error:", error);
        return res.status(500).json({ message: "Something went wrong creating the task." });
    }
};



export const viewTask = async (req, res) => {
    const { status } = req.query;

    try {
        const tasks = await prisma.task.findMany({
            where: status ? { taskStatus: status } : {}, 
            include: {
                user: {
                    select: {
                        id: true,
                        userName: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        });

        if (tasks.length === 0) {
            return res.status(404).json({ message: status ? `No tasks with status '${status}'` : "No tasks found" });
        }

        return res.status(200).json(tasks);
    } catch (error) {
        console.error("View Task Error:", error);
        return res.status(500).json({ message: "Error fetching tasks" });
    }
};

