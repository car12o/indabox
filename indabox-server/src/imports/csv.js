const fs = require('fs');
const readline = require('readline');
const { mongo } = require('../services/database');
const { database } = require('../../config/default.json');
const { User } = require('../models/user');
const { Quota } = require('../models/quota');
const { Payment, paymentStatus, paymentTypes } = require('../models/payment');

const parseQuotaValue = (value) => {
    const parsed = parseFloat(value);
    return parsed || 0;
};

const parseRow = (line) => {
    const [
        number,
        // eslint-disable-next-line no-unused-vars
        _,
        firstName,
        address,
        phone1,
        phone2,
        mobile,
        email,
        nif,
        ballotNumber,
        specialty,
        quota1,
        quota2,
        quota3,
        quota4,
        quota5,
        quota6,
        quota7,
        quota8,
        notes,
    ] = line.split(',').slice(0, 20);

    const user = {
        number: parseQuotaValue(number),
        firstName,
        address,
        phone1,
        phone2,
        mobile,
        email,
        nif,
        ballotNumber,
        specialty,
        notes,
    };

    const years = [2010, 2011, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
    const quotas = [quota1, quota1, quota2, quota3, quota4, quota5, quota6, quota7, quota8]
        .map((val, i) => ({
            year: years[i],
            value: val ? parseQuotaValue(val) : 0,
        }));

    return { user, quotas };
};

const readFile = async () => {
    const arg = process.argv.find(elem => elem.includes('path='));
    if (!arg) {
        throw new Error('Invalid path. try [npm run import -- path={path}]');
    }

    try {
        await mongo.connect(database.mongo);
        // eslint-disable-next-line no-unused-vars
        const [_, path] = arg.split('=');
        const rl = readline.createInterface({
            input: fs.createReadStream(path),
        });

        rl.on('line', async (line) => {
            rl.pause();

            try {
                let { user, quotas } = parseRow(line);
                if (user.firstName) {
                    user = await User.create(user);

                    quotas = await Promise.all(quotas
                        .map(async (quota) => {
                            const q = await Quota.create(Object.assign({}, quota, { user: user.id }));

                            if (q.value) {
                                const payment = await Payment.create({
                                    quotas: [q.id],
                                    status: {
                                        label: paymentStatus.paid.label,
                                        value: paymentStatus.paid.value,
                                    },
                                    value: q.value,
                                    type: paymentTypes.imported,
                                });

                                await q.updateOne({ payment: payment.id });
                            }

                            return q.id;
                        }));

                    await user.updateOne({ quotas });
                }
            } catch (error) {
                throw error;
            }

            rl.resume();
        }).on('close', () => {
            // eslint-disable-next-line no-console
            console.log('Import finished');
            process.exit('Import finished');
        });
    } catch (error) {
        throw error;
    }
};

readFile();