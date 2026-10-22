// Mock data layer. Replace this file with database access in the finals project.
const libraryRecords = [
  { id: 1, studentId: '2026-00123', status: 'NOT_CLEARED', updatedAt: '2026-10-10T09:00:00Z' },
  { id: 2, studentId: '2026-00456', status: 'CLEARED', updatedAt: '2026-10-11T09:00:00Z' }
];
const books = [
  { id: 1, bookId: 'BK-0001', title: 'Introduction to Programming', studentId: '2026-00123', borrowDate: '2026-10-01', dueDate: '2026-10-15', returnDate: null, bookStatus: 'BORROWED' },
  { id: 2, bookId: 'BK-0002', title: 'Systems Analysis Basics', studentId: '2026-00456', borrowDate: '2026-09-01', dueDate: '2026-09-15', returnDate: '2026-09-14', bookStatus: 'RETURNED' }
];
const bookDamages = [
  { id: 1, bookId: 'BK-0003', studentId: '2026-00123', damageType: 'LOST', description: 'Book reported missing', penaltyAmount: 500, status: 'UNRESOLVED' }
];
const penalties = [
  { id: 1, bookId: 'BK-0003', studentId: '2026-00123', penaltyType: 'LOST', amount: 500, paymentStatus: 'UNPAID' }
];
const nextId = (items) => items.length ? Math.max(...items.map(x => x.id)) + 1 : 1;
module.exports = { libraryRecords, books, bookDamages, penalties, nextId };
