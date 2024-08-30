const db = require("../models");
const CustomFieldValue = db.customFieldValue;

exports.create = async(req, res) => {
    if(!req.body.value){
        res.status(400).send({
            message: 'Content cannot be empty',
        });
        return;
    }
    const customFieldValue = {
        value: req.body.value,
        customFieldId: req.body.customFieldId,
    };
    try{
        const data = await CustomFieldValue.create(customFieldValue);
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "some error occurred while creating the custom Field Value"
        })
    }
};

exports.findAll = async(req, res) => {
    const id = req.query.id;
    var condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    try{
        const data = await CustomFieldValue.findAll({
            where: condition
        })
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving custom Field Values"
        })
    }
};

exports.findOne = async(req, res) => {
    const id = req.params.id;
    try{
        const data = await CustomFieldValue.findByPk(id);
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving custom Field Value with ID: " + id,
        });
    }
};

exports.findAllForProfile = async(req, res) => {
    const profileId = req.params.profileId;
    try{
        const data = await CustomFieldValue.findAll({
            include: [{
                model: db.profileData,
                required: true,
                include: [
                    {
                        model: db.assetProfile,
                        where: {profileId: profileId}
                    }
                ]
            }]
        });
        res.send(data);
    }
    catch(err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving custom Field Values with with profile ID: " + profileId,
        });
    }
}

exports.findAllForField = async(req, res) => {
    const fieldId = req.params.fieldId;
    try{
        const data = await CustomFieldValue.findAll({
            where: {customFieldId: fieldId},
            order: [['value', 'ASC']]
        });
        res.send(data);
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving custom Field Values with with field type ID: " + fieldId,
        });
    }
};

exports.update = async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    try{
        const response = await CustomFieldValue.update(data, {where: {id: id}});
        if(response){
            res.send({message: "custom Field Value was updated successfully"});
        }
        else{
            res.send({
                message: `Cannot update custom Field Value with id=${id}. Maybe custom Field Value was not found or req.body is empty.`,
            });
        }
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while updating custom Field Value with ID: " + id
        });
    }
};

exports.delete = async(req, res) => {
    const id = req.params.id;
    try{
        const num = await CustomFieldValue.destroy({where: {id: id}});
        if(num == 1){
            res.send({
                message: "custom Field Value was deleted successfully",
            });
        }
        else{
            res.send({
                message: `Cannot delete custom Field Value with id=${id}. Maybe custom Field Value was not found.`
            });
        }
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while deleting custom Field Value with ID: " + id
        });
    }
};

exports.deleteAll = async(req, res) => {
    try{
        const nums = await CustomFieldValue.destroy({where: {}, truncate: false,});
        if(nums){
            res.send({message: `${nums} custom Field Values were deleted successfully.`});
        }
    }
    catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while deleting all custom Field Values"
        });
    }
};