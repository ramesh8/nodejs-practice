const express = require("express");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "My API",
      version: "1.0.0",
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

let fruits = [
  { id: 1, name: "🍎" },
  { id: 2, name: "🍌" },
  { id: 3, name: "🍒" },
];

/**
 * GET - get/fetch resource
 * POST - create a new resource
 * PUT - update an existing resource
 * DELETE - delete an existing resource
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: Welcome
 *      description: Welcome message
 *      responses:
 *          200:
 *              description: Success
 *
 */
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to My API 🍎" });
});

/**
 * @swagger
 * /fruits/:
 *  get:
 *      summary: Get Fruits
 *      description: Get all fruits
 *      responses:
 *          200:
 *              description: A list of fruits
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      data:
 *                        type: array
 *                        items:
 *                          id:
 *                            type: integer
 *                            description: id
 *                            example: 1
 *                          name:
 *                            type: string
 *                            description: fruit name
 *                            example: Apple
 *
 *
 */
app.get("/fruits/", (req, res) => {
  res.status(200).send(fruits);
});

/**
 * @swagger
 * /fruits/{id}:
 *  get:
 *      summary: Get a Fruit
 *      description: Get a specified fruit
 *      parameters:
 *        - name: id
 *          description: Id of the Fruit
 *          in: path
 *          required: true
 *          type: integer
 *      responses:
 *          200:
 *              description: A fruit
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: Fruit ID
 *                        example: 1
 *                      name:
 *                        type: string
 *                        description: Fruit Name
 *                        example: Apple
 *
 *
 */
app.get("/fruits/:id", (req, res) => {
  const id = req.params.id;
  const fruit = fruits.find((f) => f.id == id);
  if (fruit) res.status(200).send(fruit);
  else res.status(404).send({ messgae: "Fruit not found. 😒" });
});

/**
 * @swagger
 * /fruits/:
 *  post:
 *    summary: New Fruit
 *    description: Create a new fruit
 *    requstBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description : Fruit's name
 *                      example: Apple
 *
 *      responses:
 *          200:
 *              description: Success
 *
 */
app.post("/fruits/", (req, res) => {
  const data = req.body;
  const fruit = { id: fruits.length + 1, name: data.name };
  fruits.push(fruit);
  res.status(200).send({ message: "Fruit Added Successfully. 👍" });
});

/**
 * @swagger
 * /fruits/:
 *  put:
 *    summary: Update Fruit
 *    description: Update a fruit
 *    parameters:
 *      - name: id
 *        description: Id of the Fruit
 *        in: path
 *        required: true
 *        type: string
 *    requstBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description : Fruit's name
 *                      example: Apple
 *
 *      responses:
 *          200:
 *              description: Success
 *
 */
app.put("/fruits/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let fruitIndex = fruits.findIndex((f) => f.id == id);
  if (fruitIndex >= 0) {
    fruits[fruitIndex].name = data.name;
    res.status(200).send({ message: "Fruit updated successfully ✌" });
  } else {
    res.status(400).send({ message: "Fruit not found 😒" });
  }
});

/**
 * @swagger
 * /fruits/:
 *   delete:
 *     summary: Delete Fruit
 *     description: Delete a fruit
 *     parameters:
 *       - name: id
 *         description: Id of the Fruit
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *         200:
 *             description: Success
 *
 */
app.delete("/fruits/:id", (req, res) => {
  const id = req.params.id;
  const fruitIndex = fruits.findIndex((f) => f.id == id);
  if (fruitIndex >= 0) {
    fruits.splice(fruitIndex, 1);
    res.status(200).send({ message: "Fruit deleted successfully ✌" });
  } else {
    res.status(400).send({ message: "Fruit not found 😒" });
  }
});

app.listen(3000, () => {
  console.log("Running on port 3000...🏃");
});
