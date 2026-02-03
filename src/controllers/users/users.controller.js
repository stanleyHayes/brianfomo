import httpStatuses from "http-statuses";

export const getUsers = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Users retrieved successfully`,
            data: null
        })
    }catch (e) {
        console.error(`Error in getUsers controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const deleteUsers = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Users deleted successfully`,
            data: null
        })
    }catch (e) {
        console.error(`Error in deleteUsers controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const getUser = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `User retrieved successfully`,
            data: null
        })
    }catch (e) {
        console.error(`Error in getUser controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const addUser = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `User added successfully`,
            data: null
        })
    }catch (e) {
        console.error(`Error in addUser controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `User delete successfully`,
            data: null
        })
    }catch (e) {
        console.error(`Error in deleteUser controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `User updated successfully`,
            data: null
        })
    }catch (e) {
        console.error(`Error in updateUser controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}