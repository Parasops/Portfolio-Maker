const express = require('express');
const Portfolio = require('../models/portfolio');
const portfolio = require('../models/portfolio');

const router = express.Router();

//create portfolio 
router.post("/", async (req, res) => {
    //console.log("--> BACKEND HIT! Data received:", req.body);
    try{
        const portfolio = new Portfolio(req.body);

        const savedPortfolio = await portfolio.save();  

        res.status(201).json({
            message : "Portfolio Created Successfully",
            portfolio : savedPortfolio
        });
    } catch (error) {
        //console.error("CRITICAL BACKEND ERROR:", error);
        res.status(500).json({
            message : "Problem creating portfolio",
            error : error.message
        });
    }
});



//Get all portfolios
router.get("/", async (req, res) => {
    try {
        const Portfolios = await portfolio.find();
        res.json(Portfolios);
    } catch (error) {
        res.status(501).json({
            message: "Problem Getting portfolios",
            error: error.message
        });
    }
});



//get one portfolio by id 
router.get("/:id", async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({
                message: "Portfolio not found",
                error: error.message
            })
        }
        res.json(portfolio);
    } catch (error) {
        res.status(501).json({
            message: "Problem Getting portfolio",
            error: error.message
        });
    }
});



//update portfolio 
router.get("/:id", async (req, res) => {
    try {
        const portfolio = await Portfolio.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            });
        
        if (!portfolio) {
            return res.status(404).json({
                message: "Portfolio not found",
                error: error.message
            })
        }

        res.json({
            message: "Portfolio updated successfully",
            portfolio
        })
    }catch (error) {
        res.status(501).json({
            message: "Problem Getting portfolio",
            error: error.message
        });
    }
})



//Deleting the portfolio 
router.delete("/:id", async (req, res) => {
    try {
        const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
        
        if (!portfolio) {
            res.status(404).json({
                message: "Portfolio not found",
                error: error.message
            })
        }

        res.json({
            message: "Portfolio deleted successfully",
            portfolio
        })
    }catch (error) {
        res.status(501).json({
            message: "Problem Getting portfolio",
            error: error.message
        });
    }
})


module.exports = router; 