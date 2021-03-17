from flask_restful import Api, Resource, reqparse
import os
import json
from model import save_image, prediction
from flask import send_from_directory


class Predition(Resource):
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
            save_image(args['src'], self.image_path + '/temp')
            result = prediction(self.image_path + '/temp')

            data = json.loads(self.open_json_file())
            data = data['result']

            data.append({
                'file_name': args['file_name'],
                'file_type': args['file_type'],
                'accuracy': result[0]['accuracy'],
                'url': result[0]['url'],
                'class_no': result[0]['class_no'],
                'class_name': result[0]['class_name'],
                'timestamp': result[0]['timestamp']
            })

            self.write_json_file(data)

            return {'data': result, 'status_code': 200}

        except Exception as e:
            print('error', e)
            return {'data': str(e), 'status_code': 500}

class GetFile(Resource):
    def get(self, path):
        print(path)
        return send_from_directory('/Users/earthzaa/Desktop/AI-Drone-Tracking-CE19/', path)
