import express from 'express';
import mongoose from 'mongoose';

import postMessage from '../models/postMessage.js';

const router = express.Router();

export const getposts = async (req, res) => { 
    try {
        const postMessages = await postMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getpost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await postMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createpost = async (req, res) => {
    const post = req.body;

    const newpostMessage = new postMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newpostMessage.save();

        res.status(201).json(newpostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatepost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedpost = { creator, title, message, tags, selectedFile, _id: id };

    await postMessage.findByIdAndUpdate(id, updatedpost, { new: true });

    res.json(updatedpost);
}

export const deletepost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await postMessage.findByIdAndRemove(id);

    res.json({ message: "post deleted successfully." });
}

export const likepost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await postMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedpost = await postMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedpost);
}


export default router;