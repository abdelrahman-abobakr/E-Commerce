
import paypal from 'paypal-rest-sdk';

paypal.configure({
    'mode': 'sandbox',  
    'client_id': 'AdhuP341D8muFCyh_wgFmXgjegSWGBDiJRJB9AI0R2t6SpAVL86-0OXgDD7Y4JVCk8AQDEbvgl4pMW1e',
    'client_secret': 'EOd2IiJ3NnDiELC9zaFw_xz88FXyXwX5f6RC_f2GybbANIROnF0DXrdGnhLvm-fVer3AFT_VZciGJKwr'
});

export default paypal;
