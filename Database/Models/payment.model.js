
import paypal from '../../Config/paypalConfig.js';

const createPayment = (create_payment_json, callback) => {
    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, payment);
        }
    });
};

const executePayment = (paymentId, payerId, execute_payment_json, callback) => {
    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, payment);
        }
    });
};

export { createPayment, executePayment };
