# zemogaTest

**UI:**
	URL : https://dev826.d3c79atytvj0c4.amplifyapp.com/


**Backend services**
-   GET - https://biz5lq14e0.execute-api.us-east-1.amazonaws.com/dev/getInfoUser/{id}
-   GET - https://biz5lq14e0.execute-api.us-east-1.amazonaws.com/dev/getAllUsers
-   POST - https://biz5lq14e0.execute-api.us-east-1.amazonaws.com/dev/saveUser


Stack:
 - Typescript
 - NodeJs
 - React 
 - AWS
 
 Time: 5 Hrs

if you want to add a new user you must to use: 

```javascript
curl --location --request POST 'https://biz5lq14e0.execute-api.us-east-1.amazonaws.com/dev/saveUser' \
--header 'Content-Type: application/json' \
--data-raw '{
    "twitterUsername": "Name",
    "image": "url Image",
    "tittle": "Title",
    "description": "description"
}'

```
