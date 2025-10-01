export const handleError = (error, res) => {
    console.error('Error:', error.message);
    res.status(400).json({
        message: error.message
    });
};

export const validateInput = (req, requiredFields) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    return missingFields;
};