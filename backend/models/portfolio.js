const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        default: ""
    },

    location: {
        type: String,
        default: ""
    },

    title: {
        type: String,
        default: ""
    },

    about: {
        type: String,
        default: ""
    },

    education: {
        degree: String,
        institution: String,
        year: String
    },

    skills: [{
        type: String,
    }],

    Project: {
        name: String,
        description: String,
        technology: String
    },

    socialLinks: {
        github: {
            type: String,
            default: ""
        },

        Linkedin: {
            type: String,
            default: ""
        },

        websites: {
            type: String,
            default: String
        },
    } },


{
    timestamps : true
}

);



module.exports = mongoose.model("portfolio", portfolioSchema);