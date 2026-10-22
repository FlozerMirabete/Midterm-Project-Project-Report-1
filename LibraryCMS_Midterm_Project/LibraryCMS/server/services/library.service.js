const store = require('../data/store');
const now = () => new Date().toISOString();
const problem = (status, title, detail, instance) => ({ type: 'about:blank', title, status, detail, instance });
function refreshClearance(studentId) {
  let record = store.libraryRecords.find(x => x.studentId === studentId);
  if (!record) { record = { id: store.nextId(store.libraryRecords), studentId, status: 'NOT_CLEARED', updatedAt: now() }; store.libraryRecords.push(record); }
  const unresolvedDamage = store.bookDamages.some(x => x.studentId === studentId && x.status === 'UNRESOLVED');
  const unpaidPenalty = store.penalties.some(x => x.studentId === studentId && x.paymentStatus === 'UNPAID');
  record.status = unresolvedDamage || unpaidPenalty ? 'NOT_CLEARED' : 'CLEARED';
  record.updatedAt = now();
  return record;
}
function listLibrary() { return store.libraryRecords.map(x => refreshClearance(x.studentId)); }
function getLibrary(studentId, path) { const r = store.libraryRecords.find(x => x.studentId === studentId); if (!r) return { error: problem(404, 'Not Found', `Library record for student ${studentId} was not found.`, path) }; return { data: refreshClearance(studentId) }; }
function createLibrary(input, path) {
  if (!input.studentId || typeof input.studentId !== 'string') return { error: problem(400, 'Bad Request', 'studentId is required and must be a string.', path) };
  if (store.libraryRecords.some(x => x.studentId === input.studentId)) return { error: problem(400, 'Bad Request', 'A library record already exists for this student.', path) };
  const r = { id: store.nextId(store.libraryRecords), studentId: input.studentId, status: 'NOT_CLEARED', updatedAt: now() };
  store.libraryRecords.push(r); return { data: refreshClearance(r.studentId) };
}
function updateLibrary(studentId, input, path) {
  const r = store.libraryRecords.find(x => x.studentId === studentId);
  if (!r) return { error: problem(404, 'Not Found', `Library record for student ${studentId} was not found.`, path) };
  if (input.status && !['CLEARED','NOT_CLEARED'].includes(input.status)) return { error: problem(400, 'Bad Request', 'status must be CLEARED or NOT_CLEARED.', path) };
  if (input.status === 'CLEARED') {
    const unresolved = store.bookDamages.some(x => x.studentId === studentId && x.status === 'UNRESOLVED') || store.penalties.some(x => x.studentId === studentId && x.paymentStatus === 'UNPAID');
    if (unresolved) return { error: problem(400, 'Bad Request', 'Student cannot be cleared while lost/damaged book records or penalties remain unresolved.', path) };
  }
  return { data: refreshClearance(studentId) };
}
function removeLibrary(studentId, path) { const i = store.libraryRecords.findIndex(x => x.studentId === studentId); if (i < 0) return { error: problem(404,'Not Found',`Library record for student ${studentId} was not found.`,path) }; store.libraryRecords.splice(i,1); return {}; }
module.exports = { listLibrary, getLibrary, createLibrary, updateLibrary, removeLibrary };
