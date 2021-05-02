const app = require('../../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

describe('Records', () => {

    describe('/records', () => {
        it('should return matching records from DB', done => {
            chai
                .request(app)
                .post('/records')
                .send({
                    "startDate": "2016-01-26",
                    "endDate": "2016-02-02",
                    "minCount": 2700,
                    "maxCount": 3000
                }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('body');
                    res.body.should.be.an('object');
                    res.body.should.have.property('code');
                    res.body.code.should.be.eql(0);
                    res.body.should.have.property('records');
                    res.body.records.should.be.an('array');
                    done();
                });
        });
        it('should return parameter error: minCount should be a number', done => {
            chai
                .request(app)
                .post('/records')
                .send({
                    "startDate": "2016-01-26",
                    "endDate": "2016-02-02",
                    "minCount": "2700",
                    "maxCount": 3000
                }
                )
                .end((err, res) => {
                    res.should.have.status(422);
                    res.should.have.property('body');
                    res.body.should.be.an('object');
                    res.body.should.have.property('code');
                    res.body.code.should.be.eql(2);
                    res.body.should.have.property('msg');
                    res.body.should.have.property('details');
                    res.body.details.should.be.an('array');
                    done();
                });
        });
        it('should return parameter error: startDate should be a valid date', done => {
            chai
                .request(app)
                .post('/records')
                .send({
                    "startDate": "2016-01-26asd",
                    "endDate": "2016-02-02",
                    "minCount": 2700,
                    "maxCount": 3000
                }
                )
                .end((err, res) => {
                    res.should.have.status(422);
                    res.should.have.property('body');
                    res.body.should.be.an('object');
                    res.body.should.have.property('code');
                    res.body.code.should.be.eql(2);
                    res.body.should.have.property('msg');
                    res.body.should.have.property('details');
                    res.body.details.should.be.an('array');
                    done();
                });
        });
        it('should return parameter error: minCount should be less than maxCount', done => {
            chai
                .request(app)
                .post('/records')
                .send({
                    "startDate": "2016-01-26",
                    "endDate": "2016-02-02",
                    "minCount": 12700,
                    "maxCount": 3000
                }
                )
                .end((err, res) => {
                    res.should.have.status(422);
                    res.should.have.property('body');
                    res.body.should.be.an('object');
                    res.body.should.have.property('code');
                    res.body.code.should.be.eql(2);
                    res.body.should.have.property('msg');
                    res.body.should.have.property('details');
                    res.body.details.should.be.an('array');
                    done();
                });
        });
        it('should return parameter error: startDate should be less than endDate', done => {
            chai
                .request(app)
                .post('/records')
                .send({
                    "startDate": "3123-01-26",
                    "endDate": "2016-02-02",
                    "minCount": 2700,
                    "maxCount": 3000
                }
                )
                .end((err, res) => {
                    res.should.have.status(422);
                    res.should.have.property('body');
                    res.body.should.be.an('object');
                    res.body.should.have.property('code');
                    res.body.code.should.be.eql(2);
                    res.body.should.have.property('msg');
                    res.body.should.have.property('details');
                    res.body.details.should.be.an('array');
                    done();
                });
        });
        it('should return parameter error: minCount parameter should be present', done => {
            chai
                .request(app)
                .post('/records')
                .send({
                    "startDate": "3123-01-26",
                    "endDate": "2016-02-02",
                    "maxCount": 3000
                }
                )
                .end((err, res) => {
                    res.should.have.status(422);
                    res.should.have.property('body');
                    res.body.should.be.an('object');
                    res.body.should.have.property('code');
                    res.body.code.should.be.eql(2);
                    res.body.should.have.property('msg');
                    res.body.should.have.property('details');
                    res.body.details.should.be.an('array');
                    done();
                });
        });
        it('should return parameter error: maxCount parameter should be present', done => {
            chai
                .request(app)
                .post('/records')
                .send({
                    "startDate": "3123-01-26",
                    "endDate": "2016-02-02",
                    "minCount": 2700
                }
                )
                .end((err, res) => {
                    res.should.have.status(422);
                    res.should.have.property('body');
                    res.body.should.be.an('object');
                    res.body.should.have.property('code');
                    res.body.code.should.be.eql(2);
                    res.body.should.have.property('msg');
                    res.body.should.have.property('details');
                    res.body.details.should.be.an('array');
                    done();
                });
        });
        it('should return parameter error: startDate parameter should be present', done => {
            chai
                .request(app)
                .post('/records')
                .send({
                    "endDate": "2016-02-02",
                    "minCount": 2700,
                    "maxCount": 3000
                }
                )
                .end((err, res) => {
                    res.should.have.status(422);
                    res.should.have.property('body');
                    res.body.should.be.an('object');
                    res.body.should.have.property('code');
                    res.body.code.should.be.eql(2);
                    res.body.should.have.property('msg');
                    res.body.should.have.property('details');
                    res.body.details.should.be.an('array');
                    done();
                });
        });
        it('should return parameter error: endDate parameter should be present', done => {
            chai
                .request(app)
                .post('/records')
                .send({
                    "startDate": "3123-01-26",
                    "minCount": 2700,
                    "maxCount": 3000
                }
                )
                .end((err, res) => {
                    res.should.have.status(422);
                    res.should.have.property('body');
                    res.body.should.be.an('object');
                    res.body.should.have.property('code');
                    res.body.code.should.be.eql(2);
                    res.body.should.have.property('msg');
                    res.body.should.have.property('details');
                    res.body.details.should.be.an('array');
                    done();
                });
        });
        it('route not found', done => {
            chai
                .request(app)
                .get('/testRoute')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.should.have.property('body');
                    res.body.should.be.an('object');
                    res.body.should.have.property('code');
                    res.body.code.should.be.eql(3);
                    res.body.should.have.property('msg');
                    res.body.msg.should.be.eql('Route does not exist');
                    done();
                });
        });
    });
});