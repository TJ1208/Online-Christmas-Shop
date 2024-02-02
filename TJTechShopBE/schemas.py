from marshmallow import Schema, fields


class PlainUserSchema(Schema):
    user_id = fields.Integer()
    role_id = fields.Integer(require=True)
    first_name = fields.String(require=True)
    last_name = fields.String(require=True)
    email = fields.String(require=True)
    password = fields.String(require=True)
    create_time = fields.Date(require=True)
    age = fields.Integer(require=True)
    phone_number = fields.String(require=True)


class PlainRoleSchema(Schema):
    role_id = fields.Integer()
    type = fields.String(require=True)


class UpdateUserSchema(Schema):
    role_id = fields.Integer(require=True)
    first_name = fields.String(require=True)
    last_name = fields.String(require=True)
    email = fields.String(require=True)
    password = fields.String(require=True)
    age = fields.Integer()
    phone_number = fields.String()


class PlainCategorySchema(Schema):
    category_id = fields.Integer()
    name = fields.String(require=True)
    image_id = fields.Integer(require=True)


class PlainSubCategorySchema(Schema):
    id = fields.Integer()
    name = fields.String(require=True)
    category_id = fields.Integer(require=True)


class UpdateSubCategorySchema(Schema):
    name = fields.String(require=True)
    category_id = fields.Integer(require=True)


class SubCategorySchema(PlainSubCategorySchema):
    category = fields.Nested(PlainCategorySchema(), dump_only=True)


class UpdateCategorySchema(Schema):
    name = fields.String()
    image_id = fields.Integer()


class PlainImageSchema(Schema):
    image_id = fields.Integer()
    url = fields.String(require=True)
    create_time = fields.Date(require=True)


class CategorySchema(PlainCategorySchema):
    image = fields.Nested(PlainImageSchema(), dump_only=True)
    sub_categories = fields.List(fields.Nested(PlainSubCategorySchema()), dump_only=True)


class UpdateImageSchema(Schema):
    url = fields.String(require=True)


class PlainProductSchema(Schema):
    product_id = fields.Integer()
    name = fields.String(require=True)
    price = fields.Float(require=True)
    sale_price = fields.Float(require=True)
    description = fields.String(require=True)
    create_time = fields.Date(require=True)
    category_id = fields.Integer(require=True)
    brand_id = fields.Integer(require=True)


class PlainBrandSchema(Schema):
    brand_id = fields.Integer()
    name = fields.String(require=True)


class UpdateBrandSchema(Schema):
    name = fields.String(require=True)


class UpdateProductSchema(Schema):
    name = fields.String(require=True)
    price = fields.Float(require=True)
    sale_price = fields.Float()
    description = fields.String()
    category_id = fields.Integer()
    brand_id = fields.Integer()


class PlainOrderSchema(Schema):
    order_id = fields.Integer()
    user_id = fields.Integer(require=True)
    address_id = fields.Integer(require=True)
    create_time = fields.Date(require=True)


class ImageSchema(PlainImageSchema):
    products = fields.List(fields.Nested(PlainProductSchema()), dump_only=True)


class ProductSchema(PlainProductSchema):
    images = fields.List(fields.Nested(PlainImageSchema()), dump_only=True)
    sub_category = fields.Nested(PlainSubCategorySchema(), dump_only=True)
    brand = fields.Nested(PlainBrandSchema(), dump_only=True)


class PlainAddressSchema(Schema):
    address_id = fields.Integer()
    user_id = fields.Integer(require=True)
    street = fields.String(required=True)
    apt = fields.String(require=True)
    city = fields.String(require=True)
    country = fields.String(required=True)
    state = fields.String(require=True)
    zipcode = fields.String(require=True)
    active = fields.Boolean(require=True)


class UpdateAddressSchema(Schema):
    address_id = fields.Integer()
    user_id = fields.Integer()
    street = fields.String(required=True)
    apt = fields.String(require=True)
    city = fields.String(require=True)
    country = fields.String(required=True)
    state = fields.String(require=True)
    zipcode = fields.String(require=True)
    active = fields.Boolean(require=True)


class AddressSchema(PlainAddressSchema):
    user = fields.Nested(PlainUserSchema(), dump_only=True)


class OrderSchema(PlainOrderSchema):
    user = fields.Nested(PlainUserSchema(), dump_only=True)
    products = fields.List(fields.Nested(PlainProductSchema()), dump_only=True)
    address = fields.Nested(PlainAddressSchema(), dump_only=True)


class UpdateOrderSchema(Schema):
    user_id = fields.Integer(require=True)
    address_id = fields.Integer(require=True)


class PlainOrderProductSchema(Schema):
    order_id = fields.Integer(require=True)
    product_id = fields.Integer(require=True)
    quantity = fields.Integer(require=True)


class OrderProductSchema(PlainOrderProductSchema):
    order = fields.Nested(PlainOrderSchema(), dump_only=True)
    product = fields.Nested(PlainProductSchema(), dump_only=True)


class UpdateOrderProductSchema(Schema):
    order_id = fields.Integer()
    product_id = fields.Integer()
    quantity = fields.Integer(require=True)


class PlainOrderHistorySchema(Schema):
    order_history_id = fields.Integer()
    user_id = fields.Integer(require=True)
    create_time = fields.Date(require=True)


class OrderHistorySchema(PlainOrderHistorySchema):
    products = fields.List(fields.Nested(PlainProductSchema()), dump_only=True)


class UpdateOrderHistorySchema(Schema):
    user_id = fields.Integer(require=True)


class PlainProductImageSchema(Schema):
    product_id = fields.Integer(require=True)
    image_id = fields.Integer(require=True)


class UpdateProductImageSchema(Schema):
    product_id = fields.Integer()
    image_id = fields.Integer()


class PlainOrderHistoryProductSchema(Schema):
    product_id = fields.Integer(require=True)
    order_history_id = fields.Integer(require=True)


class UpdateOrderHistoryProductSchema(Schema):
    product_id = fields.Integer()
    order_history_id = fields.Integer()


class PlainCartSchema(Schema):
    cart_id = fields.Integer()
    user_id = fields.Integer(require=True)


class UpdateCartSchema(Schema):
    cart_id = fields.Integer()
    user_id = fields.Integer(required=True)


class CartSchema(PlainCartSchema):
    products = fields.List(fields.Nested(PlainProductSchema()), dump_only=True)


class PlainCartProductSchema(Schema):
    cart_id = fields.Integer(required=True)
    product_id = fields.Integer(require=True)
    quantity = fields.Integer(required=True)


class UpdateCartProductSchema(Schema):
    cart_id = fields.Integer()
    product_id = fields.Integer()
    quantity = fields.Integer(require=True)


class CartProductSchema(PlainCartProductSchema):
    cart = fields.Nested(PlainCartSchema(), dump_only=True)
    product = fields.Nested(PlainProductSchema(), dump_only=True)
