import prisma from "../DB/db.config.js";
import express from "express";

export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    if (!id || !userId) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const commentData = await prisma.comment.create({
      data: {
        comment: comment,
        userId: userId,
        taskId: Number(id),
      },
    });
    return res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    console.log("error in creating comment", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await prisma.comment.findMany({
      where: {
        taskId: Number(id),
      },
      include: {
        user: true,
      },
    });
    return res.status(200).json(comments);
  } catch (err) {
    console.log("error in getting comments", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
