const CompanyArticle = require('../models/CompanyArticle');

exports.getAll = async (req, res) => {
    try {
        const articles = await CompanyArticle.find().sort({ pinned: -1, createdAt: -1 }).populate('author', 'name');
        res.json(articles);
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getById = async (req, res) => {
    try {
        const article = await CompanyArticle.findById(req.params.id).populate('author', 'name');
        if (!article) return res.status(404).json({ msg: 'Article not found' });
        res.json(article);
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const article = new CompanyArticle({
            ...req.body,
            author: req.user?.id,
            authorName: req.body.authorName || 'Admin'
        });
        await article.save();
        res.status(201).json(article);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.update = async (req, res) => {
    try {
        const article = await CompanyArticle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!article) return res.status(404).json({ msg: 'Article not found' });
        res.json(article);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.remove = async (req, res) => {
    try {
        await CompanyArticle.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Article deleted' });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};
