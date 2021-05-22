let mysql = require('mysql');
const util = require('util');

module.exports = {
    '/zwierzeta': function (params) {
        let dane = {
            'kot': { 'waga': '1kg', 'rozmiar': 'mały' },
            'pies': { 'waga': '2kg', 'rozmiar': 'sredni' },
            'foka': { 'waga': '5kg', 'rozmiar': 'duży' },
        }
        return JSON.stringify(dane[params.name] ?? {});
    },
    '/suma': function (params) {
        let suma = 0;
        params.liczby.split(',').forEach(element => {
            suma += parseFloat(element);
        });
        return suma.toString();
    },
    '/palindrom': function (params) {
        let palindrom = true;
        for (let i = 0; i < params.palindrom.length; i++) {
            if (params.palindrom[i] != params.palindrom[params.palindrom.length - i - 1]) {
                palindrom = false;
                break
            }
        }
        return JSON.stringify({ 'palindrom': palindrom })
    },
    '/jednostki': function (params) {
        let data = {
            'foot': { 'value': 30.48, 'unit': 'cm' },
            'yard': { 'value': 0.9144, 'unit': 'm' },
            'mile': { 'value': 1.6, 'unit': 'km' }
        }
        let output = [];
        for (i in params) {
            if (i in data) {
                output.push({ 'name': i, 'value': data[i].value * params[i] + data[i].unit })
            }
        }
        return JSON.stringify(output);
    },
    '/notatki':async function (params) {
        return await this.db('SELECT * FROM notatki');
    },
    '/notatki/dodaj': function (params) {
        params.notatka=JSON.parse(params.notatka)
        return this.db(`INSERT INTO notatki VALUES (null,'${params.notatka.tytul}','${params.notatka.tresc}','${params.notatka.priorytet}')`);
    },
    '/notatki/update': function (params) {
        let notatka = JSON.parse(params.notatka)
        return this.db(`UPDATE notatki SET tytul='${notatka.tytul}',tresc='${notatka.tresc}',priorytet='${notatka.priorytet}' WHERE id=${notatka.id}`);
    },
    '/notatki/usun': function (params) {
        return this.db(`DELETE FROM notatki WHERE id=${params.id}`);
    },
    '/zwierzeta/get':async function(params) {
        return await this.db('SELECT * FROM zwierzeta');
    },
    '/zwierzeta/dodaj': function (params) {
        let zwierzeta=JSON.parse(params.zwierzeta)
        return this.db(`INSERT INTO zwierzeta VALUES (null,'${zwierzeta.imie}','${zwierzeta.gatunek}','${zwierzeta.data}','${zwierzeta.waga}')`);
    },
    'zwierzeta/update': function (params) {
        let zwierzeta = JSON.parse(params.notatka)
        return this.db(`UPDATE zwierzeta SET imie='${zwierzeta.imie}',gatunek='${zwierzeta.gatunek}',data='${zwierzeta.data}',waga='${zwierzeta.waga}' WHERE id=${zwierzeta.id}`);
    },
   'zwierzeta/usun': function (params) {
        return this.db(`DELETE FROM zwierzeta WHERE id=${params.id}`);
    },
    db: async function (sql) {
        let conn = mysql.createConnection({
            host: "localhost",
            user: "szkola",
            password: "ZAQ!2wsx",
            database: "szkola"
        });
        const query = util.promisify(conn.query).bind(conn);
        // await con.connect()
        return JSON.stringify(await query(sql));
        
    }
};
