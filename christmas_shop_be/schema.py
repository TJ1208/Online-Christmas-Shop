# # Used to convert complex data types to native python data types
# # -- Data Validation
# from marshmallow import Schema, fields
#
#
# # Using 'dump_only' does not allow data to be received for that value
# # 'required=True' requires data to exist on receiving/response
# class PlainItemSchema(Schema):
#     name = fields.Str(required=True)
#     price = fields.Float(required=True)
#
#
# class PlainItemUpdateSchema(Schema):
#     name = fields.Str()
#     price = fields.Float()
#
#
# class PlainStoreSchema(Schema):
#     name = fields.Str(required=True)
#
#
# class ItemSchema(PlainItemUpdateSchema):
#     store_id = fields.Int(required=True, load_only=True)
#     store = fields.Nested(PlainStoreSchema(), dump_only=True)
#
#
# class StoreSchema(PlainStoreSchema):
#     items = fields.List(fields.Nested(PlainStoreSchema()))
