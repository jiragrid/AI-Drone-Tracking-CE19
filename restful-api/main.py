from flask import Flask
from flask_restful import Api, Resource, reqparse
from api import TestApi

app = Flask(__name__)
api = Api(app)

api.add_resource(TestApi, '/test')

if __name__ == '__main__':
    app.run(debug=True)
