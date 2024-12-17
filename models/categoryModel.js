const mongoose = require('mongoose');


//schema

const categorySchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,'category tittle required']
        },
        imageUrl:{
            type:String,
            default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.brandcrowd.com%2Fmaker%2Ftag%2Ffood&psig=AOvVaw03HsPPwZGJAubGhA9ef-be&ust=1729087336354000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDHlbXGkIkDFQAAAAAdAAAAABAK"
        }

    },

    {  timestamps:true }
);


module.exports = mongoose.model("Category",categorySchema);