const express=require('express');const router=express.Router();const store=require('../data/store');const lib=require('../services/library.service');const books=require('../services/books.service');const damages=require('../services/damages.service');const penalties=require('../services/penalties.service');const integrationConfig=require('../config/integrations');
function sendResult(res,result,success=200){if(result.error)return res.status(result.error.status).type('application/problem+json').json(result.error);if(result.data!==undefined)return res.status(success).json(result.data);return res.status(204).end();}

// Required by the midterm API contract: GET /api/v1/health
router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
router.get('/library',(req,res)=>res.json(lib.listLibrary()));
router.get('/library/:studentId',(req,res)=>sendResult(res,lib.getLibrary(req.params.studentId,req.originalUrl)));
router.post('/library',(req,res)=>sendResult(res,lib.createLibrary(req.body,req.originalUrl),201));
router.put('/library/:studentId',(req,res)=>sendResult(res,lib.updateLibrary(req.params.studentId,req.body,req.originalUrl)));
router.delete('/library/:studentId',(req,res)=>sendResult(res,lib.removeLibrary(req.params.studentId,req.originalUrl)));
router.get('/books',(req,res)=>res.json(books.list(req.query)));
router.get('/books/:id',(req,res)=>sendResult(res,books.get(req.params.id,req.originalUrl)));
router.post('/books',(req,res)=>sendResult(res,books.create(req.body,req.originalUrl),201));
router.put('/books/:id',(req,res)=>sendResult(res,books.update(req.params.id,req.body,req.originalUrl)));
router.delete('/books/:id',(req,res)=>sendResult(res,books.remove(req.params.id,req.originalUrl)));
router.get('/book-damages',(req,res)=>res.json(damages.list(req.query.studentId)));
router.post('/book-damages',(req,res)=>sendResult(res,damages.create(req.body,req.originalUrl),201));
router.get('/penalties',(req,res)=>res.json(penalties.list(req.query.studentId)));
router.put('/penalties/:id',(req,res)=>sendResult(res,penalties.update(req.params.id,req.body,req.originalUrl)));
// Contract status makes the pending integration explicit. Live calls are intentionally disabled until paths/schemas are agreed.
router.get('/integration/status',(req,res)=>res.json({status:'partial',message:'Partner contracts are placeholders; mock adapters are active until agreements are confirmed.',integrations:{registrar:{mode:integrationConfig.registrar.mode,baseUrlConfigured:Boolean(integrationConfig.registrar.baseUrl),lookupPathConfigured:Boolean(integrationConfig.registrar.studentLookupPath)},finance:{mode:integrationConfig.finance.mode,baseUrlConfigured:Boolean(integrationConfig.finance.baseUrl),penaltiesPathConfigured:Boolean(integrationConfig.finance.penaltiesPath),paymentStatusPathConfigured:Boolean(integrationConfig.finance.paymentStatusPath)}}}));
// Integration adapters are mock responses until partner groups provide their actual API contracts.
router.get('/integration/registrar/students/:studentId',(req,res)=>{const {studentId}=req.params;res.json({source:'registrar-mock',integrationMode:integrationConfig.registrar.mode,contractStatus:'NOT_YET_SPECIFIED',externalKey:studentId,student:{studentId,name:studentId==='2026-00123'?'Alex Santos':'Sample Student',enrollmentStatus:'ENROLLED'}})});
router.get('/integration/finance/students/:studentId/penalties',(req,res)=>{const {studentId}=req.params;res.json({source:'finance-mock',integrationMode:integrationConfig.finance.mode,contractStatus:'NOT_YET_SPECIFIED',externalKey:studentId,penalties:penalties.list(studentId)})});
module.exports=router;
