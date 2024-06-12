const wbm = require('wbm');
const axios = require('axios'); 

wbm.start().then(async () => {
    const customer_email = ['1234567890']; //taking email as parameter because the variable is declared as email but acutally I'll pass phone numbers here so that I can send messages on whatsapp
    const messages = "Hi Mohit, here is 10% off on your next order";
    
    try {
        const sendResults = await wbm.send(customer_email, messages);

        // Check the results and update the communication log
        for (const result of sendResults) {
            const status = result.success ? 'SENT' : 'FAILED';
            const logEntry = {
                phone: result.phone,
                status: status,
                
            };

            
            await axios.post('https://your-api-endpoint.com/update-log', logEntry);
        }

    } catch (error) {
        console.error('Error sending messages or updating logs:', error);
    }

    await wbm.end();
}).catch(err => console.log(err));

