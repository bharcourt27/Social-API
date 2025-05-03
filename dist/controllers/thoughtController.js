import Thought from "../models/thoughts.js";
// get all Thoughts
const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// get Thoughts by request
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought)
            return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// create a Thought
const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        res.status(201).json(newThought);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// add Reaction to thought
const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!thought)
            return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Update a Thought
const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Thought updated successfully!', updatedThought });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Delete a reaction from a thought
const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Remove the reaction with the specified reactionId
        { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Reaction deleted successfully!', thought });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// exporting all thought controllers
const thoughtController = { getThoughts, getThoughtById, createThought, addReaction, updateThought, deleteReaction };
export default thoughtController;
