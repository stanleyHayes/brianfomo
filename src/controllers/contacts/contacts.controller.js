import httpStatuses from "http-statuses";
import Contact from "../../models/contact.model.js";

export const getContacts = async (req, res) => {
    try {
        const user = res.locals.user;
        const contacts = await Contact.find({owner: user._id});
        res.status(httpStatuses.OK.code).json({
            message: `Contacts retrieved successfully`,
            data: contacts
        })
    } catch (e) {
        console.error(`Error in getContacts controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const deleteContacts = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Contacts deleted successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in deleteContacts controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const getContact = async (req, res) => {
    try {
        const {id} = req.params;
        const user = res.locals.user;
        const contact = await Contact.findOne({owner: user._id, contact: id})
            .populate({path: "contact", select: "full_name: 1, email: 1"});
        if (!contact) {
            return res.status(httpStatuses.NOT_FOUND).json({
                message: `No contact found with id ${id}`,
                data: null
            });
        }
        res.status(httpStatuses.OK.code).json({
            message: `Contact with id ${id} retrieved successfully`,
            data: contact
        });
    } catch (e) {
        console.error(`Error in getContact controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const addContact = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Contact added successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in addContact controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const deleteContact = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Contact delete successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in deleteContact controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const updateContact = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Contact updated successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in updateContact controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}