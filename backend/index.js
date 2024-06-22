const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const cors = require('cors')

const express = require('express')
const app = express()
app.use(express.json())
app.use(cors());

// GET requests for /boards -> All boards
app.get('/boards', async (req, res) => {
    const boards = await prisma.board.findMany()
    res.status(200).json(boards)
});

// GET requests for /boards/:id -> Specific board
app.get('/boards/:id', async (req, res) => {
    const {id} = req.params;
    const board = await prisma.board.findUnique({
        where: { id: parseInt(id) } //specify that id is a number
    });
    res.status(200).json(board)
});

// POST requests for /boards -> Create a new board
app.post('/boards', async (req, res) => {
    const {title, category, author} = req.body;
    const newBoard = await prisma.board.create({
        data: {
            title,
            category,
            author
        }
    });
    res.status(201).json(newBoard);
});

// DELETE requests for /boards/:id -> Delete a particular board
app.delete('/boards/:id', async (req, res) => {
    const {id} = req.params;
    const deletedBoard = await prisma.board.delete({
        where: { id: parseInt(id) }
    });
    res.status(200).json(deletedBoard);
});

app.post('/boards/:id/cards', async (req, res) => {
    const {id} = req.params;
    const {title, description, author, imgUrl} = req.body;
    const newCard = await prisma.card.create({
        data: {
            title,
            description,
            author,
            imgUrl,
            board: {
                connect: {
                    id: parseInt(id)
                }}}});
    res.status(201).json(newCard);
})

app.post('/boards/:id/cards', async (req, res) => {
    const {id} = req.params;
    const {title, description, author, imgUrl} = req.body;
    const newCard = await prisma.card.create({
        data: {
            title,
            description,
            author,
            imgUrl,
            board: {
                connect: {
                    id: parseInt(id)
                }}}});
    res.status(201).json(newCard);
})



const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
