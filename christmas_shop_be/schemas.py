from marshmallow import Schema, fields


class PlainUserSchema(Schema):
    user_id = fields.Integer()
    username = fields.String(require=True)
    email = fields.String(require=True)
    password = fields.String(require=True)
    create_time = fields.Date(require=True)
    age = fields.Integer()


class UpdateUserSchema(Schema):
    username = fields.String(require=True)
    email = fields.String(require=True)
    password = fields.String(require=True)
    age = fields.Integer()


class PlainCategorySchema(Schema):
    category_id = fields.Integer()
    name = fields.String(require=True)
    image_id = fields.Integer(require=True)


class UpdateCategorySchema(Schema):
    name = fields.String()
    image_id = fields.Integer()


class PlainImageSchema(Schema):
    image_id = fields.Integer()
    url = fields.String(require=True)
    create_time = fields.Date(require=True)


class CategorySchema(PlainCategorySchema):
    image = fields.Nested(PlainImageSchema(), dump_only=True)


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


class UpdateProductSchema(Schema):
    name = fields.String(require=True)
    price = fields.Float(require=True)
    sale_price = fields.Float()
    description = fields.String()
    category_id = fields.Integer()


class PlainOrderSchema(Schema):
    order_id = fields.Integer()
    user_id = fields.Integer(require=True)
    create_time = fields.Date(require=True)


class ImageSchema(PlainImageSchema):
    products = fields.List(fields.Nested(PlainProductSchema()), dump_only=True)


class ProductSchema(PlainProductSchema):
    images = fields.List(fields.Nested(PlainImageSchema()), dump_only=True)


class OrderSchema(PlainOrderSchema):
    products = fields.List(fields.Nested(PlainProductSchema()), dump_only=True, require=True)


class UpdateOrderSchema(Schema):
    user_id = fields.Integer(require=True)


class PlainOrderProductSchema(Schema):
    order_id = fields.Integer(require=True)
    product_id = fields.Integer(require=True)
    quantity = fields.Integer(require=True)


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



