from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
from api import TestApi, GetFile

app = Flask(__name__)
CORS(app)
api = Api(app)
api.add_resource(TestApi, '/test')
api.add_resource(GetFile, '/get-file/<path:path>')

if __name__ == '__main__':
    app.run(debug=True)
