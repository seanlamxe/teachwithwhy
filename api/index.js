import { handleApi } from '../lib/server.js';
export default { fetch(request) { return handleApi(request, process.env); } };
