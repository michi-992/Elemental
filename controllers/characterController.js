const characterModel = require('../models/characterModel');

async function getCharacters(req, res, next) {
    try {
        const characters = await characterModel.getCharacters();
        res.render('characters', { characters });
    } catch (err) {
        console.error('Error retrieving posts: ', err);
        res.status(500).send('Internal Server Error');
    }
}

async function getCharacter(req, res, next) {
    const characterId = req.params.id;
    try {
        const character = await characterModel.getCharacter(characterId);
        const comments = await characterModel.getComments(characterId);
        res.render('character', { character, comments });
    } catch (err) {
        console.error('Error retrieving post details: ', err);
        res.status(500).send('Internal Server Error');
    }
}

async function createComment(req, res, next) {
    const { characterId, content } = req.body;
    const userId = 6;
    const username = 'Santa';
    try {
        await characterModel.createComment(characterId, content, userId, username);
        res.redirect(`/characters/character/${characterId}`);
    } catch (err) {
        console.error('Error creating comment: ', err);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteComment(req, res, next) {
    const { commentId } = req.body;
    try {
        await characterModel.deleteComment(commentId);
        res.redirect('back'); // Redirect back to the same page
    } catch (err) {
        console.error('Error deleting comment: ', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getCharacters,
    getCharacter,
    createComment,
    deleteComment,
};
