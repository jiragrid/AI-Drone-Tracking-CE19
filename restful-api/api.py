from flask_restful import Api, Resource, reqparse
import os
import json
from model import save_image, prediction


class TestApi(Resource):
    def __init__(self):
        self.path_db = './restful-api/database/db1.json'
        self.image_path = './restful-api/database/images'

    def open_json_file(self):
        with open(self.path_db, 'r') as f:
            return f.read()

    def write_json_file(self, data):
        with open(self.path_db, 'w') as f:
            json.dump({'result': data}, f, indent=4)

    def get(self):
        data = json.loads(self.open_json_file())

        return {'data': data['result'], 'status_code': 200}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('file_name', required=True)
        parser.add_argument('file_type', required=True)
        parser.add_argument('src', required=True)
        args = parser.parse_args()

        try:
            file_name = save_image(args['src'], self.image_path + '/temp')
            result = prediction(self.image_path + '/temp')

            print(result)
            data = json.loads(self.open_json_file())
            data = data['result']

            """data.append({
                'file_name': args['name'],
                'file_type': 'jpg',
                'predict': 94,
                'class_name': 'white_leaf',
                'predictions': {
                    'white_leaf': 94,
                    'brown_spot': 86
                }
            })

            self.write_json_file(data) """

            return {'data': result, 'status_code': 200}

        except Exception as e:
            return {'data': str(e), 'status_code': 500}
