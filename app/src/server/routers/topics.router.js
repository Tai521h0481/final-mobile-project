const express = require('express');
const topicsRouter = express.Router();

const { Topic, Users, Vocabulary } = require('../models');
const { authentication } = require('../middlewares/authentication/authenticate');
const {isExistId, validateInput, checkId} = require('../middlewares/validation/validation');
const {getTopicById,
    getAllTopics,
    updateTopic,
    deleteTopic,
    createVocabularyInTopic,
    deleteVocabularyInTopic,
    upVoteCount,
    downVoteCount,
    editVocabularyInTopic,
    importCSV,
    exportCSV,
    getTopicsByUserId,
    getTopicsByFolderId,
    viewTopicIsPublic,
    userLearnPublicTopic} = require('../controllers/topics.controller');

// get all topics (tested)
topicsRouter.get("/", getAllTopics);
// get topic by id (tested)
topicsRouter.get("/:id", authentication ,isExistId(Topic), getTopicById);
// get topics by user id (tested)
topicsRouter.get("/users/:id", authentication, isExistId(Users), getTopicsByUserId);
// get topics by folder id (tested)
topicsRouter.get("/folders/:folderId", getTopicsByFolderId);
// view topic is public (tested)
topicsRouter.get("/public/users/:userId", authentication, checkId(Users, "userId"), viewTopicIsPublic);
// learn public topic (tested)
topicsRouter.get("/public/learnTopic/:id", authentication, isExistId(Topic), userLearnPublicTopic);
// create topic (tested)
topicsRouter.post("/", authentication, 
validateInput(['topicNameEnglish', 'topicNameVietnamese', 'descriptionEnglish', 'descriptionVietnamese']), importCSV);
// update topic (tested)
topicsRouter.put("/:id", authentication, isExistId(Topic), updateTopic);
// delete topic (tested)
topicsRouter.delete("/:id", authentication, isExistId(Topic), deleteTopic)
// create vocab in topic (tested)
topicsRouter.post("/:id/vocabularies", authentication, isExistId(Topic), validateInput(["englishWord", "vietnameseWord", "englishMeaning", "vietnameseMeaning"]), createVocabularyInTopic);
// delete a vocab from topic (tested)
topicsRouter.delete("/:id/vocabularies/:vocabularyId", authentication, isExistId(Topic), checkId(Vocabulary, "vocabularyId"), deleteVocabularyInTopic);
// edit vocab from topic (tested)
topicsRouter.put("/:id/vocabularies/:vocabularyId", authentication, isExistId(Topic), checkId(Vocabulary, "vocabularyId"), editVocabularyInTopic);
// up vote topic (tested)
topicsRouter.put("/upvote/:id", authentication, isExistId(Topic), upVoteCount);
// down vote topic (tested)
topicsRouter.put("/downvote/:id", authentication, isExistId(Topic), downVoteCount);
// import csv (tested)
topicsRouter.post("/import-csv", authentication, validateInput(['topicNameEnglish', 'topicNameVietnamese', 'descriptionEnglish', 'descriptionVietnamese', 'vocabularyList']), importCSV);
// export csv (tested)
topicsRouter.get("/export-csv/:id",authentication, isExistId(Topic), exportCSV);

module.exports = topicsRouter;