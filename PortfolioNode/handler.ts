import { User } from './src/components/users/User'

const user = new User();
let response: any;

export async function getInfoUser(event: any, context: any, callback: (arg0: null, arg1: { statusCode: number; body: string; }) => void) {
  await user.getInfoUser(event.pathParameters.id)
    .then((result) => {
      response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
        body: JSON.stringify({
          message: result
        }),
      }
    })
    .catch(error => {
      response = {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
        body: JSON.stringify({
          message: error
        }),
      };
    });
  callback(null, response);
}

export async function getAllUsers(event: any, context: any, callback: (arg0: null, arg1: { statusCode: number; body: string; }) => void) {
  await user.getAllUsers()
    .then((result) => {
      response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
        body: JSON.stringify({
          message: result
        }),
      }
    })
    .catch(error => {
      response = {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
        body: JSON.stringify({
          message: error
        }),
      };
    });

  callback(null, response);
}

export async function saveUser(event: any, context: any, callback: (arg0: null, arg1: { statusCode: number; body: string; }) => void) {
  const data = JSON.parse(event.body);
  await user.putUserToDB(data.twitterUsername, data.image, data.description, data.tittle)
    .then(() => {
      response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
        body: JSON.stringify({
          message: 'User saved',
        }),
      };
    })
    .catch(error => {
      response = {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        },
        body: JSON.stringify({
          message: error
        }),
      };
    })

  callback(null, response);

}
