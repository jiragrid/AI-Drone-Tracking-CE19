from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
from api import Predition, GetFile

app = Flask(__name__)
CORS(app)
api = Api(app)
api.add_resource(Predition, '/predict')
api.add_resource(GetFile, '/get-file/<path:path>')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
