const fetch = require('node-fetch');
const moment = require('moment');

module.exports.name = '洛谷';

module.exports.contests = fetch('https://www.luogu.com.cn/contest/list?_contentOnly=1').then(res => res.text()).then(body => {
    let contests = [];

    JSON.parse(body).currentData.contests.result.forEach((el) => {
        const startTime = moment(el['startTime'] * 1000);
        const endTime = moment(el['endTime'] * 1000);

        if (startTime >= moment()) {
            contests.push({
                id: el['id'],
                name: el['name'],
                url: `https://www.luogu.com.cn/contest/${el['id']}`,
                startTime, endTime
            });
        }
    });

    return contests;
});