
import { createPayment, executePayment } from '../../Database/Models/payment.model.js';

const pay = (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "50",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "50"
            },
            "description": "Hat for the best team ever"
        }]
    };

    createPayment(create_payment_json, (error, payment) => {
        if (error) {
            console.log(error);
            res.send('Error');
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
};

const success = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "50"
            }
        }]
    };

    executePayment(paymentId, payerId, execute_payment_json, (error, payment) => {
        if (error) {
            console.log(error.response);
            res.send('Error');
        } else {
            console.log(JSON.stringify(payment));
            res.send('Payment Successful');
        }
    });
};

const cancel = (req, res) => {
    res.send('Payment Cancelled');
};

export { pay, success, cancel };
