# API Response Format
```
{
  "msg": "success" || "server-error" || "xxx-yyy-zzz-error"
  ...fields
}

// Success example:
{
  "msg": "success"
}

{
  "msg": "success",
  "user": {
    "_id": "uuid",
    "firstName": "Minh",
    "lastName": "Tan",
    "gender": "male",
    "birthday": "16-07-1997",
    "phone": "0868383897",
    "email": "tandm160697@gmail.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkczIiLCJuYW1lIjoiSm9obmRzYSIsImlhdCI6MTUxNjIzOTAyMn0.vlAXjnWMsdFfnF7SbKt_cG2lUgF8zrZdT_OorWSModY"
}

// Error example:
{
  "msg": "email-error"
}

{
  "msg": "server-error",
  "errMsg": "Server error!!",
  "topStack": "at home (file:///Users/tandm/Documents/learn/express/express-learn/src/controllers/site.controller.js:5:17)"
}
```
