import express from "express";
import prisma from "../DB/db.config.js";
import { TaskStatus } from "@prisma/client";

export const addTask = async (req, res) => {
  const { taskName, taskType, taskStatus, assignTo } = req.body;
  const createdById = req.user?.id;
  console.log(createdById);
  console.log(assignTo);

  if (!createdById) {
    return res.status(401).json({ message: "Please login to create a task." });
  }

  try {
    const assignedUser = await prisma.user.findUnique({
      where: { id: Number(assignTo) },
    });

    if (!assignedUser) {
      return res.status(400).json({ message: "Assigned user does not exist." });
    }

    const foundType = await prisma.taskType.findUnique({
      where: { name: taskType },
    });

    if (!foundType) {
      return res
        .status(400)
        .json({ message: "Task type not found. Please add it first." });
    }

    const newTask = await prisma.task.create({
      data: {
        taskName,
        taskStatus: taskStatus,
        taskTypeId: foundType.id, 
        // assignTo: assignedUser.userName,
        userId: createdById,
        assignedUserId: assignedUser.id,
      },
    });

    return res.status(201).json({
      message: "Task created and assigned successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Add Task Error:", error);
    return res.status(500).json({ message: "Unable to create task" });
  }
};

export const viewTask = async (req, res) => {
  const { status } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: status ? { taskStatus: status } : undefined,
      include: {
        taskType: true,
        assignedUser: {
          select: { id: true, userName: true, email: true },
        },
        user: {
          select: { id: true, userName: true, email: true },
        },
        comments: true,
      },
      orderBy: { id: "desc" },
    });
    console.log(tasks);

    if (tasks.length === 0) {
      return res
        .status(404)
        .json({
          message: status
            ? `No tasks found with status '${status}'`
            : "No tasks found",
        });
    }

    return res.status(200).json(tasks);
  } catch (err) {
    console.error("View Task Error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const addtaskType = async (req, res) => {
  const { name } = req.body;
  try {
    const newTaskType = await prisma.taskType.create({
      data: {
        name,
      },
    });

    return res.status(201).json({
      message: "Task Type created successfully",
      data: newTaskType,
    });
  } catch (error) {
    console.error("Add Task Type Error:", error);
    return res.status(500).json({ message: "Unable to create task type" });
  }
};


//         await prisma.taskType.create({ data: { name: "Urgent" } });
//     }
// }

export const taskType = async (req, res) => {
  try {
    const taskTypes = await prisma.taskType.findMany();
    return res.status(200).json(taskTypes);
  } catch (error) {
    console.error("Task Type Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const editTask = async (req,res)=>{
    const {id} = req.params;
    const {taskStatus} = req.body;
    try {
        const task = await prisma.task.update({
            where : {
                id : parseInt(id)
            },
            data :{
                taskStatus,
            }
        })
        return res.status(200).json({taskStatus,message:"Task updated succesully"});
    }
    catch(err){
        console.error("Edit Task Error:", err);
        return res.status(500).json({ message: "Unable to edit task" });
    }
}



