const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositoriesId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid Project Id." });
  }

  return next();
}
app.use("/repositories/:id", validateRepositoriesId);
app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoriesIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: "Repositorie Not Found" });
  }
  const repositorie = {
    id,
    url,
    title,
    techs,
    likes: repositories[repositoriesIndex].likes,
  };

  repositories[repositoriesIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: "Repositorie Not Found" });
  }
  repositories.splice(repositoriesIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: "Repositorie Not Found" });
  }

  repositories[repositoriesIndex].like += 1;

  return response.json(repositories[repositoriesIndex]);
});

module.exports = app;
