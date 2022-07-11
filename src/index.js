import Server from './server.js';

const server = Server.listen(3333).on('listening', () =>
  console.log(`Server is running at: ${Server.address().port}`),
);
