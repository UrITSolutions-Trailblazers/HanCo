const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const app = express();

const { User } = require('../src/model/src.model.user');

beforeAll(() => {
    console.log('==========================>>>>> STARTING USER TEST SUITE <<<<<==============================')
});

afterAll(async () => {

    User.remove({}, async (err) => {
        if (err) console.log(err);

        await mongoose.disconnect();
    })
});

describe('USER', function () {
    it('Add a new User', function () {
        request(app).post('/handi/user/')
            .send({ "firstName": "Paul Rcihard" }).expect(200,
                (err, res) => { 
                    if (err) console.log(err);

                    console.log(res);
                });
    });
})