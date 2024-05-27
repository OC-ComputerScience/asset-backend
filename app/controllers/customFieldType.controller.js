const db = require("../models");
const CustomFieldType = db.customFieldType;

exports.create = async(req, res) => {
    if(!req.body.customFieldId){
        res.status(400).send({
            message: 'Content cannot be empty',
        });
        return;
    }
    const customFieldType = {
        typeId: req.body.typeId,
        customFieldId: req.body.customFieldId,
        required: req.body.required,
        identifier: req.body.identifier,
    };
    try{
        const data = await CustomFieldType.create(customFieldType);
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "some error occurred while creating the custom field type"
        })
    }
};

exports.findAll = async(req, res) => {
    const id = req.query.id;
    var condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try{
        const data = await CustomFieldType.findAll({
            where: condition
        })
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving custom field types"
        })
    }
};

exports.findAllForType = async(req, res) => {
    const typeId = req.params.typeId;
    try{
        const data = await CustomFieldType.findAll({
            where: {typeId: typeId},
            include: [db.customField]
        });
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving custom field types"
        })
    }
}

exports.findOne = async(req, res) => {
    const id = req.params.id;
    try{
        const data = await CustomFieldType.findByPk(id);
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Custom Field Type with ID: " + id,
        });
    }
};

exports.update = async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    try{
        const response = await CustomFieldType.update(data, {where: {id: id}});
        if(response){
            res.send({message: "Custom Field Type was updated successfully"});
        }
        else{
            res.send({
                message: `Cannot update Custom Field Typewith id=${id}. Maybe Custom Field Type was not found or req.body is empty.`,
            });
        }
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while updating Custom Field Type with ID: " + id
        });
    }
};

exports.delete = async(req, res) => {
    const id = req.params.id;
    try{
        const num = await CustomFieldType.destroy({where: {id: id}});
        if(num == 1){
            res.send({
                message: "Custom Field Typewas deleted successfully",
            });
        }
        else{
            res.send({
                message: `Cannot delete Custom Field Type with id=${id}. Maybe Custom Field Type was not found.`
            });
        }
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while deleting Custom Field Type with ID: " + id
        });
    }
};

exports.deleteAll = async(req, res) => {
    try{
        const nums = await CustomFieldType.destroy({where: {}, truncate: false,});
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