const { ContactMessage } = require('../models');

/**
 * Submit contact form (public)
 * POST /api/contact
 */
const submitContact = async (req, res) => {
    try {
        const { name, email, phone, message, privacy_consent, marketing_consent } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'MISSING_FIELDS',
                    message: 'Nombre, email y mensaje son requeridos'
                }
            });
        }

        if (!privacy_consent) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'PRIVACY_CONSENT_REQUIRED',
                    message: 'Debes aceptar el aviso de privacidad'
                }
            });
        }

        // Get IP address
        const ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const contactMessage = await ContactMessage.create({
            name,
            email,
            phone,
            message,
            privacy_consent,
            marketing_consent: marketing_consent || false,
            ip_address
        });

        res.status(201).json({
            success: true,
            data: {
                id: contactMessage.id
            },
            message: 'Mensaje enviado exitosamente'
        });
    } catch (error) {
        console.error('Error submitting contact:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'SUBMIT_ERROR',
                message: error.message || 'Error al enviar el mensaje'
            }
        });
    }
};

/**
 * Get all contact messages (authenticated)
 * GET /api/admin/contacts
 */
const getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactMessage.findAll({
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'FETCH_ERROR',
                message: 'Error al obtener los mensajes'
            }
        });
    }
};

/**
 * Mark contact as read (authenticated)
 * PUT /api/admin/contacts/:id/read
 */
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await ContactMessage.findByPk(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Mensaje no encontrado'
                }
            });
        }

        contact.is_read = true;
        await contact.save();

        res.json({
            success: true,
            data: contact,
            message: 'Mensaje marcado como leído'
        });
    } catch (error) {
        console.error('Error marking contact as read:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'UPDATE_ERROR',
                message: 'Error al actualizar el mensaje'
            }
        });
    }
};

module.exports = {
    submitContact,
    getAllContacts,
    markAsRead
};
