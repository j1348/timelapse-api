const Joi = require('joi');

function list() {
    return {};
}

function read() {
    return {
        params: {
            id: Joi
                .string()
                .alphanum()
                .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id')
                .required()
        }
    };
}

function create() {
    return {
        payload: {
            name: Joi
                .string()
                .min(1)
                .max(30)
                .trim()
                .required(),
            raw: Joi
                .string()
                .optional(),
            checked: Joi
                .boolean()
                .default(false)
                .optional()
        }
    };
}

function update() {
    return {
        params: {
            id: Joi
                .string()
                .alphanum()
                .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id')
                .required()
        },
        payload: {
            name: Joi
                .string()
                .min(1)
                .max(30)
                .trim()
                .optional(),
            raw: Joi
                .string()
                .optional(),
            checked: Joi
                .boolean()
                .default(false)
                .optional()
        }
    };
}

function destroy() {
    return {
        params: {
            id: Joi
                .string()
                .alphanum()
                .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id')
                .required()
        }
    };
}

const TodoValidator = {
    list,
    read,
    create,
    update,
    destroy
};

module.exports = TodoValidator;
