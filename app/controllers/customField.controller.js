const db = require("../models");
const CustomField = db.customField;

exports.create = async(req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: 'Content cannot be empty',
        });
        return;
    }
    const customField = {
        name: req.body.name,
        type: req.body.type,
    };
    try{
        const data = await CustomField.create(customField);
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "some error occurred while creating the custom field"
        })
    }
};

exports.findAll = async(req, res) => {
    const id = req.query.id;
    var condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try{
        const data = await CustomField.findAll({
            where: condition,
            order: [['name', 'ASC']]
        })
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving custom fields"
        })
    }
};

exports.findOne = async(req, res) => {
    const id = req.params.id;
    try{
        const data = await CustomField.findByPk(id);
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving custom field with ID: " + id,
        });
    }
};

exports.update = async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    try{
        const response = await CustomField.update(data, {where: {id: id}});
        if(response){
            res.send({message: "Custom field was updated successfully"});
        }
        else{
            res.send({
                message: `Cannot update custom field with id=${id}. Maybe custom field was not found or req.body is empty.`,
            });
        }
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while updating custom field with ID: " + id
        });
    }
};

exports.delete = async(req, res) => {
    const id = req.params.id;
    try{
        const num = await CustomField.destroy({where: {id: id}});
        if(num == 1){
            res.send({
                message: "Custom Field was deleted successfully",
            });
        }
        else{
            res.send({
                message: `Cannot delete custom field with id=${id}. Maybe custom field was not found.`
            });
        }
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while deleting custom field with ID: " + id
        });
    }
};

exports.deleteAll = async(req, res) => {
    try{
        const nums = await CustomField.destroy({where: {}, truncate: false,});
        if(nums){
            res.send({message: `${nums} Custom Fields were deleted successfully.`});
        }
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while deleting all custom fields"
        });
    }
};