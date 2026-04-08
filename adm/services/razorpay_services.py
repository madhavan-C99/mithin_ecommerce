import razorpay
from django.conf import settings
from rest_framework.exceptions import APIException
import logging

logger = logging.getLogger(__name__)


class RazorpayClient:
    def __init__(self):
        self.client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET
            )
        )

    def create_order(self, amount, currency="INR", receipt=None):
        try:
            data = {
                "amount": amount,
                "currency": currency,
            }

            # ✅ optional receipt support
            if receipt:
                data["receipt"] = receipt

            logger.info(f"Razorpay create_order request: {data}")

            order_data = self.client.order.create(data=data)

            logger.info(f"Razorpay create_order response: {order_data}")

            return order_data

        except Exception as e:
            logger.error(f"Razorpay Order Creation Failed: {str(e)}")
            raise APIException("Failed to create Razorpay order")

    def verify_payment(self, razorpay_order_id, razorpay_payment_id, razorpay_signature):
        try:
            self.client.utility.verify_payment_signature({
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            })

            logger.info("Payment signature verified successfully")

            return True

        except razorpay.errors.SignatureVerificationError:
            logger.warning("Invalid Razorpay Signature")
            raise APIException("Invalid Payment Signature")

        except Exception as e:
            logger.error(f"Payment verification failed: {str(e)}")
            raise APIException("Payment Verification Failed")