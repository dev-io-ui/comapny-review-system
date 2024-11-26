const express = require('express');
const Company = require('../models/company');
const Review = require('../models/reviews');

const router = express.Router();

router.post('/add-company', async (req, res) => {
    const { companyName, pros, cons, rating } = req.body;
    console.log(rating, "rating printed");

    try {
        let company = await Company.findOne({ where: { companyName } });
        if (!company) {
            company = await Company.create({ companyName });
            console.log("Company id is:", company.id);
        }
        const id = company.id;
        const review = await Review.create({
            companyId: id,
            pros,
            cons,
            rating,
        });

        console.log("Review added:", review);
        res.status(200).json({ message: 'Review submitted successfully!' });
    } catch (err) {
        console.error("Error in POST /add-company:", err);
        res.status(500).json({ error: 'An error occurred while submitting the review.' });
    }
});

router.get('/search', async (req, res) => {
    const { companyName } = req.query;
    console.log("Searching for company:", companyName);
    try {
        const company = await Company.findOne({
            where: { companyName },
            include: Review,
        });

        if (!company) {
            return res.status(404).json({ message: 'Company not found!' });
        }
        console.log('company found as name ', company);
        
        const reviews = company.reviews || [];
        console.log('finding reviews ', reviews);
        
        if (reviews.length === 0) {
            return res.status(200).json({
                company: company.companyName,
                averageRating: 0,
                reviews,
            });
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({
            company: company.companyName,
            averageRating: averageRating.toFixed(2),
            reviews,
        });
    } catch (err) {
        console.error("Error fetching company data:", err);
        res.status(500).json({ error: 'An error occurred while fetching the company data.' });
    }
});

module.exports = router;
