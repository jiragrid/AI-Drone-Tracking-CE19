from flask_restful import Api, Resource, reqparse
import pandas as pd

class TestApi(Resource):
  def __init__(self):
    self.path_db = './restful-api/database/test.csv'

  def get(self):
    data = pd.read_csv(self.path_db)
    data = data.to_dict()

    return {'data': data}

  def post(self):
    parser = reqparse.RequestParser()

    parser.add_argument('name', required=True)

    args = parser.parse_args()

    new_data = pd.DataFrame({
      'id': '1',
      'image': args['name'],
      'class': '0',
      'class_name': 'brown_spot'
    })

    print(new_data)

    data = pd.read_csv(self.path_db)
    data = data.append(new_data, ignore_index=True)
    data.to_csv(self.path_db, index=False)

    return {'data': data.to_dict()}