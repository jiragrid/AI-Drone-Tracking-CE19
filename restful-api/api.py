from flask import request
from flask_restful import Api, Resource, reqparse
import pandas as pd
import os


class TestApi(Resource):
    def __init__(self):
        self.path_db = './restful-api/database/test.csv'
        self.save_img = './restful-api/database/images'

    def get(self):
        data = pd.read_csv(self.path_db)
        data = data.to_dict()

        return {'data': data}

    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument('name', required=True)

        args = parser.parse_args()

        try:
            file = request.files('file')

            if file.filename == '':
              return {'data': 'No selected file'}

        except Exception as e:
            return {'data': str(e)}
