from flask.views import MethodView
from flask_mail import Message
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError

from models.order import OrderModel
from models.order_product import OrderProductModel
from resources.db import db, mail
from schemas import PlainOrderSchema, UpdateOrderSchema, OrderSchema

blp = Blueprint("OrderSchema", __name__, description="Operations on order")


@blp.route("/order")
class Order(MethodView):

    @blp.response(200, OrderSchema(many=True))
    def get(self):
        return OrderModel.query.all()

    @blp.arguments(PlainOrderSchema)
    @blp.response(201, OrderSchema)
    def post(self, order_data):
        order = OrderModel(**order_data)

        try:
            db.session.add(order)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while placing order.")

        return order


@blp.route("/order/<int:order_id>")
class OrderExt(MethodView):

    @blp.response(200, OrderSchema)
    def get(self, order_id):
        order = OrderModel.query.get_or_404(order_id,
                                            description=f"No order exists with the id: {order_id}")
        return order

    @blp.arguments(UpdateOrderSchema)
    @blp.response(201, OrderSchema)
    def put(self, order_data, order_id):
        order = OrderModel.query.get_or_404(order_id,
                                            description=f"No order exists with the id: {order_id}")
        order.user_id = order_data["user_id"]
        order.address_id = order_data["address_id"]
        db.session.add(order)
        db.session.commit()

        return order

    @blp.response(200)
    def delete(self, order_id):
        order = OrderModel.query.get_or_404(order_id,
                                            description=f"No order exists with the id: {order_id}")
        db.session.delete(order)
        db.session.commit()
        return f"Order with the id, {order_id}, has been removed."

    @blp.response(200)
    def post(self, order_id):
        order = OrderModel.query.get_or_404(order_id,
                                            description=f"No order exists with the id: {order_id}")
        products_summary = ""
        for product in order.products:
            products_summary += f"""
            <tr>
                <td colspan='3' style='padding: 0.5em;'>
                    <img src={product.images[0].url}
                        alt='Product Image'
                        style='object-fit: contain; height: 5em; width: 5em;' />
                </td>
                <td colspan='2' style='padding: 0.5em;'>
                    <p>{product.name}</p>
                </td>
                <td colspan='1'
                    style='display: flex-col; font-style: italic; padding: 0.5em;'>
                    <p style="padding: 0; margin: 0; color: rgb(94, 170, 122);">{product.sale_price if product.sale_price > 0 else product.price}</p>
                    <p style="padding: 0.1em; margin: 0; font-size: small;">Qty: {OrderProductModel.query.filter(OrderProductModel.product_id == product.product_id).first().quantity}</p>
                </td>
            </tr>                                            
            """
        try:
            msg = Message(
                subject=f"TJTechShop Order#{order_id}",
                sender="mailtrap@tcjcoding.com",
                recipients=[order.user.email],
                html=f"""<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Document</title>
</head>

<body style='ffont-family:sans-serif; overflow-x: clip;'>
    <table cellspacing='0' cellpadding='0' width='100%' border='0'>
        <tbody>
            <tr width="100%" style="display: flex; justify-content: center; align-items: center;">
                <td>&nbsp;</td>
                <td width='720'></td>
                <table cellspacing='0' cellpadding='0' width='100%' border='0'>
                    <tbody>
                        <tr>
                            <td style='font-weight: bolder; font-size: x-large; opacity: 0.8; text-align: center;'>
                                <img src="https://tjcoding.sirv.com/website-images/tjtech-shop-image.png" alt="Shop Logo" style="object-fit: cover; height: 5em; background-color: black; border-radius: 5px; border-style: solid;">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <hr width='100%' size='1'>
                            </td>
                        </tr>
                        <tr>
                            <td style='padding-left: 60px; padding-right: 60px;'>
                                <table cellspacing='0' cellpadding='0' width='100%'>
                                    <tbody>
                                        <tr>
                                            <td style='text-align: center;'>
                                                <h2>Order Confirmation</h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Hello {order.user.first_name},
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Thanks for your recent purchase at TJTech Shop!
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <hr width='100%' size='1'>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4 style='padding-left: 10px;'>Order #{order_id}</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style='display:flex; flex-wrap: wrap; flex-direction: row; padding:10px; justify-content: space-evenly; height: fit-content;'>
                                                <table cellspacing='0' cellpadding='0' width='100%' border='0'
                                                    style='border-collapse: collapse;'>
                                                    <p>&nbsp;</p>
                                                    <tbody style='background-color:rgb(210, 209, 209);'>
                                                        <tr>
                                                            <th colspan='6'
                                                                style='margin-bottom:0px;margin-top:0px;font-weight:normal;text-align:inherit;padding-top:0.00px;padding-bottom:0.00px;padding-left:10.00px; background-color: rgb(96 165 250); border-radius: 0.2em; padding-top:0.2em; padding-bottom:0.2em;'>
                                                                <table cellspacing='0' cellpadding='0' width='100%'
                                                                    style='border-collapse: collapse;'>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style='margin-top: 0; margin-bottom: 0; font-size: 0; color: white;'>
                                                                                <span
                                                                                    style='font-size: 19px; line-height: 22px;'>Order
                                                                                    Summary</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </th>
                                                        </tr>
                                                        {products_summary}
                                                        <tr style='border-top-style: solid;'>
                                                            <td colspan='4' style='padding-left: 0.5em;'>
                                                                <p>Sales Tax : </p>
                                                            </td>
                                                            <td colspan='2'
                                                                style='padding-right: 0.5em; text-align: right;'>
                                                                <p>{f'{order.total * .0475:.2f}'}</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan='4' style='padding-left: 0.5em;'>
                                                                <p>Shipping & Handling : </p>
                                                            </td>
                                                            <td colspan='2'
                                                                style='padding-right: 0.5em; text-align: right;'>
                                                                <p>${order.shipping_method.rate}</p>
                                                            </td>
                                                        </tr>
                                                        <tr style=' font-weight: bolder;'>
                                                            <td colspan='4' style='padding-left: 0.5em;'>
                                                                <p>Total : </p>
                                                            </td>
                                                            <td colspan='2'
                                                                style='padding-right: 0.5em; text-align: right;'>
                                                                <p>{f'{order.total + (order.total * .0475) + order.shipping_method.rate:.2f}'}</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table cellspacing='0' cellpadding='0' width='100%'
                                                    style='border-collapse: collapse; height: fit-content;'>
                                                    <p>&nbsp;</p>
                                                    <tbody style='background-color:rgb(210, 209, 209);'>
                                                        <tr>
                                                            <th colspan='6'
                                                                style='margin-bottom:0px;margin-top:0px;font-weight:normal;text-align:inherit;padding-top:0.00px;padding-bottom:0.00px;padding-left:10.00px; background-color: rgb(96 165 250); border-radius: 0.2em; padding-top:0.2em; padding-bottom:0.2em;'>
                                                                <table cellspacing='0' cellpadding='0' width='100%'
                                                                    style='border-collapse: collapse;'>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style='margin-top: 0; margin-bottom: 0; font-size: 0; color: white;'>
                                                                                <span
                                                                                    style='font-size: 19px; line-height: 22px;'>Order
                                                                                    Details</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <td colspan='6'
                                                                style='padding-left: 0.5em; text-decoration: underline;'>
                                                                <p>Shipping To</p>
                                                            </td>
                                                        </tr>
                                                        <tr style='text-align: center;'>
                                                            <td colspan='1'
                                                                style='font-weight:bold; padding-left: 20px;'>
                                                                <img src='https://tjcoding.sirv.com/website-images/delivery-truck.svg'
                                                                    alt='Shipment Truck'
                                                                    style='height: 2em; width: 2em; object-fit: contain;  border-style: ridge; border-radius: 25px; padding: 0.1em;' />
                                                            </td>
                                                            <td colspan='2' style='font-weight:bold; text-align: left;'>
                                                                <p>{order.address.street}, {order.address.city} {order.address.state} {order.address.zipcode}</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan='6'
                                                                style='padding-left: 0.5em; text-decoration: underline;'>
                                                                <p>Contact Info</p>
                                                            </td>
                                                        </tr>
                                                        <tr style='text-align: center;'>
                                                            <td colspan='1'
                                                                style='font-weight:bold; padding-left: 20px;'>
                                                                <img src='https://tjcoding.sirv.com/website-images/free-mail-icon-142-thumb.png'
                                                                    alt='Email Icon'
                                                                    style='height: 2em; width: 2em; object-fit: contain;  border-style: ridge; border-radius: 25px; padding: 0.1em;' />
                                                            </td>
                                                            <td colspan='2' style='font-weight:bold; text-align: left;'>
                                                                <p>{order.user.email}</p>
                                                            </td>
                                                        </tr>
                                                        <tr style='text-align: center;'>
                                                            <td colspan='1'
                                                                style='font-weight:bold; padding-left: 20px;'>
                                                                <img src='https://tjcoding.sirv.com/website-images/phone-call.svg'
                                                                    alt='Phone Icon'
                                                                    style='height: 2em; width: 2em; object-fit: contain; border-style: ridge; border-radius: 25px; padding: 0.1em;' />
                                                            </td>
                                                            <td colspan='2' style='font-weight:bold; text-align: left;'>
                                                                <p>{order.user.phone_number}</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan='6'
                                                                style='padding-left: 0.5em; text-decoration: underline;'>
                                                                <p>Estimated Delivery</p>
                                                            </td>
                                                        </tr>
                                                        <tr style='text-align: center;'>
                                                            <td colspan='1'
                                                                style='font-weight:bold; padding-left: 20px;'>
                                                                <img src='https://tjcoding.sirv.com/website-images/package.svg'
                                                                    alt='Package Icon'
                                                                    style='height: 2em; width: 2em; object-fit: contain;  border-style: ridge; border-radius: 25px; padding: 0.1em;' />
                                                            </td>
                                                            <td colspan='2' style='font-weight:bold; text-align: left;'>
                                                                <p>February 29th</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style='font-size: small; text-align: right; font-weight: 600;'>Forgot Something? Revisit the <a href='https://tjtech.tcjcoding.com'>Shop</a></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <hr width='100%' size='1'>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style='text-align: center;'>
                                                <h5 style='text-align: center;'>Connect With Us!</h5>
                                                <a href='https://m.facebook.com/taylor.joostema.7/'>
                                                    <img src='https://tjcoding.sirv.com/website-images/icons8-facebook.svg'
                                                        alt='Facebook Icon'
                                                        style='height: 2.5em; width: 2.5em; object-fit: contain; padding: 0.1em;'>
                                                </a>
                                                <a href='https://twitter.com/TJoostema71515'>
                                                    <img src='https://tjcoding.sirv.com/website-images/icons8-twitterx.svg'
                                                        alt='Twitter Icon'
                                                        style='height: 2.5em; width: 2.5em; object-fit: contain; padding: 0.1em;'>
                                                </a>
                                                <a href='https://www.linkedin.com/in/taylor-joostema-26ba66244/'>
                                                    <img src='https://tjcoding.sirv.com/website-images/icons8-linkedin.svg'
                                                        alt='LinkedIn Icon'
                                                        style='height: 2.5em; width: 2.5em; object-fit: contain; padding: 0.1em;'>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5>Questions or Concerns?</h5>
                                                <h5>Please reach out to the team at <span
                                                        style='color: rgb(96 165 250);'>TaylorJ1208@yahoo.com</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </tr>
        </tbody>
    </table>
</body>

</html>""")
            mail.send(msg)
        except Exception as e:
            print(e)
