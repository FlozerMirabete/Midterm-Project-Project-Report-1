require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
const spec = YAML.load(path.join(__dirname, 'openapi.yaml'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
app.use('/api/v1', require('./routes'));

// Keep malformed JSON errors separate from unexpected server errors.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).type('application/problem+json').json({
      type: 'about:blank',
      title: 'Bad Request',
      status: 400,
      detail: 'Request body must be valid JSON.',
      instance: req.originalUrl
    });
  }
  console.error(err);
  return res.status(500).type('application/problem+json').json({
    type: 'about:blank',
    title: 'Internal Server Error',
    status: 500,
    detail: 'An unexpected server error occurred.',
    instance: req.originalUrl
  });
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3007;
  app.listen(port, () => {
    console.log(`Library API running at http://localhost:${port}; Swagger UI: http://localhost:${port}/docs`);
  });
}

module.exports = app;
