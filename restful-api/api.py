from flask_restful import Api, Resource, reqparse
import os
import json
from model import save_image, prediction
from flask import send_from_directory


class Predition(Resource):
    def __init__(self):
        self.config = json.loads(self.open_json_file('./restful-api/config.json'))
        self.path_db = self.config['database_dir']['logs']
        self.image_path = self.config['database_dir']['images']
        self.lables_path = self.config['labels_dir']
        self.model_path = self.config['model_dir']

    def open_json_file(self, path):
        with open(path, 'r') as f:
            return f.read()

    def write_json_file(self, data):
        with open(self.path_db, 'w') as f:
            json.dump({'result': data}, f, indent=4)

    def get(self):
        data = json.loads(self.open_json_file(self.path_db))

        return {'data': data['result'], 'status_code': 200}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('file_name', required=True)
        parser.add_argument('file_type', required=True)
        parser.add_argument('src', required=True)
        args = parser.parse_args()

        try:
            save_image(args['src'], self.image_path + '/temp')
            result = prediction(self.image_path + '/temp', self.model_path, self.lables_path)

            data = json.loads(self.open_json_file(self.path_db))
            data = data['result']

            for predit in result:
                data.append({
                    'file_name': args['file_name'],
                    'file_type': args['file_type'],
                    'accuracy': predit['accuracy'],
                    'url': predit['url'],
                    'class_no': predit['class_no'],
                    'class_name': predit['class_name'],
                    'timestamp': predit['timestamp']
                })

            self.write_json_file(data)

            return {'data': result, 'status_code': 200}

        except Exception as e:
            print('error', e)
            return {'data': str(e), 'status_code': 500}

class GetFile(Resource):
    def __init__(self):
        self.config = json.loads(self.open_json_file('./restful-api/config.json'))
        self.user_path = self.config['user_dir']

    def open_json_file(self, path):
        with open(path, 'r') as f:
            return f.read()

    def get(self, path):
        return send_from_directory(self.user_path, path)
