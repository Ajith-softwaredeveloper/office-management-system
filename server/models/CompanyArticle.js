const mongoose = require('mongoose');
const CompanyArticleSchema = new mongoose.Schema({
    title:     { type: String, required: true },
    content:   { type: String, required: true },
    category:  { type: String, enum: ['Policy', 'Announcement', 'News', 'Training', 'Other'], default: 'Announcement' },
    author:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    authorName:{ type: String },
    pinned:    { type: Boolean, default: false },
    tags:      [{ type: String }]
}, { timestamps: true });
module.exports = mongoose.model('CompanyArticle', CompanyArticleSchema);
