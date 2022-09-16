import { CardElement } from '@stripe/react-stripe-js';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { FormContainer, PaymentFormContainer } from './payment-form.styles';

const PaymentForm = () => {
    return (
        <PaymentFormContainer>
            <FormContainer>
                <h2>Credit card payment</h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
                    Pay now
                </Button>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
