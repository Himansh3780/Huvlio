import { generateDocument } from '../../lib/gemini';
import templates from '../../config/templates.json';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { templateId, userInputs } = req.body;

    if (!templateId || !userInputs) {
        return res.status(400).json({ error: 'Missing templateId or userInputs' });
    }

    const template = templates[templateId];

    if (!template) {
        return res.status(404).json({ error: 'Template not found' });
    }

    try {
        const result = await generateDocument(template.prompt, userInputs);

        if (result.success) {
            return res.status(200).json({
                success: true,
                text: result.text
            });
        } else {
            return res.status(500).json({
                success: false,
                error: result.error
            });
        }
    } catch (error) {
        console.error('API Generation Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
