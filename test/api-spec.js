'use strict';

const express = require('express');
const expect = require('chai').expect;
const routes = require('../routes');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');

const SPEC_FS_HOME = '/tmp/minit-service-spec/';

describe("Minit service", () => {
    let app;

    before(() => {
        fs.mkdirSync(SPEC_FS_HOME);
    });

    beforeEach(() => {
        app = express();
        routes(app);
    });

    describe('POST /app', () => {
        it('creates an app', (done) => {
            supertest(app)
                .post(`/app/myapp?path=${encodeURI(SPEC_FS_HOME)}`)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    let dir = fs.readdirSync(SPEC_FS_HOME);
                    const myappExists = dir.indexOf('myapp') > -1;
                    expect(myappExists).to.equal(true);
                    dir = fs.readdirSync(path.join(SPEC_FS_HOME, 'myapp'));
                    const packageJsonExists = dir.indexOf('package.json') > -1;
                    expect(packageJsonExists).to.equal(true);
                    done();
                });
        }).timeout(10000);
    });

    describe('POST /component', () => {
        it('creates a component', (done) => {
            const uiDirectory = path.join(SPEC_FS_HOME, 'ui');
            fs.mkdirSync(uiDirectory);
            supertest(app)
                .post(`/component/mycomponent?path=${encodeURI(SPEC_FS_HOME)}`)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    const dir = fs.readdirSync(uiDirectory);
                    const mycomponentExists = dir.indexOf('mycomponent.reel') > -1;
                    expect(mycomponentExists).to.equal(true);
                    done();
                });
        }).timeout(10000);
    });

    describe('POST /module', () => {
        it('creates a module', (done) => {
            supertest(app)
                .post(`/module/mymodule?path=${encodeURI(SPEC_FS_HOME)}`)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    const dir = fs.readdirSync(SPEC_FS_HOME);
                    const mymoduleExists = dir.indexOf('mymodule.js') > -1;
                    expect(mymoduleExists).to.equal(true);
                    done();
                });
        }).timeout(10000);
    });
});
