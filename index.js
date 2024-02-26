import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Ritesh";
const yourPassword = "ritesh222";
const yourAPIKey = "9a7650af-ddcd-42ee-a4ac-fa8064d72266";
const yourBearerToken = "6a121240-72dd-4d1a-80c4-511d1c8472b9";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    console.log(response)
    const object = JSON.stringify(response.data);
    console.log(object);
    res.render("index.ejs", {content : object});
  }
  catch (error)
  {
    res.status(404).send(error.message);
  }
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async(req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  try {
    const page = 2;
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=1", { auth: {
      username: "Ritesh",
      password : "ritesh222",
    },
  });
  const object = JSON.stringify(response.data);

  res.render("index.ejs", {content: object});
    
  }
  catch (error)
  {
    res.status(404).send(error.message);
  }
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  const score = 4;

  try 
  {
    const response = await axios.get("https://secrets-api.appbrewery.com/filter?score=7&apiKey=9a7650af-ddcd-42ee-a4ac-fa8064d72266");
    const object = JSON.stringify(response.data);
    console.log(object)
    res.render("index.ejs", {content : object});
  
  }
  catch{
    res.status(404).send(error.message);
  }
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  
   try{
  const id = 2;
  const response = await axios.get(`https://secrets-api.appbrewery.com/secrets/${id}`, {headers: {Authorization: `Bearer ${yourBearerToken}`}});
  console.log(response.data);
  const object = JSON.stringify(response.data);
  res.render("index.ejs", {content : object});

   }
   catch (error)
   {
    res.status(404).send(error.message);
   }
  

  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
