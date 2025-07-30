import express from 'express';
import prisma from '../DB/db.config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    const {fName,lName,userName,email,password} = req.body;
    const findUser = await prisma.user.findUnique({where:{userName:userName}});
    if(findUser){
        return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    try{
        const newUser = await prisma.user.create(
            {data:{
                fName:fName,
                lName:lName,
                userName:userName,
                email:email,
                password:hashedPassword,
            }
        })
            return res.status(201).json({newUser,message:"User created successfully"});

    }
    catch(err){
        console.log("try catch does not hit in create user",err)
        return res.status(500).json({message:"Internal server error"});
    }

}

export const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const findUser = await prisma.user.findUnique({ where: { userName } });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, findUser.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    return res.status(200).json({
      user: {
        id: findUser.id,
        userName: findUser.userName,
        email: findUser.email, 
      },
      token,
    });
  } catch (err) {
    console.error("Login failed:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    }
    catch (err) {
        console.log("Error fetching users", err);
    }
}
