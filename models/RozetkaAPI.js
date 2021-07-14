const mysql = require('mysql');
const config = require('../config/config_mysql');

const connection = mysql.createConnection(config);

class Groups {
    /* Вибірка всіх груп з БД */
    static getAllProducts() {
        return new Promise((resolve) => {
            const queryPosts = 'SELECT * FROM `prom_ua_parsed_products`';
            connection.query(queryPosts, (error, results) => {
                if (error) throw error;
                resolve(results);
            });
        });
    }

    // /* Добавлення нової групи в БД */
    // static addGroup(obj) {
    //     return new Promise((resolve) => {
    //         const queryAdd = 'INSERT INTO edu_group(numb_group, year_group, id_spec) VALUES (?,?,?)';
    //         const arr = [+obj.numb_group, +obj.year_group, +obj.id_spec];
    //         connection.query(queryAdd, arr, (error, results) => {
    //             if (error) throw error;
    //             resolve(results.insertId);
    //         });
    //     });
    // }

    // /* Видалення групи по отриманому ідентифікатору */
    // static delGroup(idGroup) {
    //     return new Promise((resolve) => {
    //         const queryDel = 'DELETE FROM edu_group WHERE id_group = ?';
    //         connection.query(queryDel, idGroup, (error) => {
    //             if (error) throw error;
    //             resolve();
    //         });
    //     });
    // }

    // /* Вибірка іноформації про групу по її ідентифікатору */
    // static getGroup(idGroup) {
    //     const query = 'SELECT * FROM edu_group WHERE id_group = ?';
    //     return new Promise((resolve) => {
    //         connection.query(query, [idGroup], (error, results) => {
    //             if (error) throw error;
    //             resolve(results);
    //         });
    //     });
    // }

    // /* Оновлення інфомації про групу */
    // static updateGroup(obj) {
    //     return new Promise((resolve) => {
    //         const queryUpdate = 'UPDATE edu_group SET numb_group = ?, year_group = ?, id_spec = ? WHERE id_group= ?';
    //         const arr = [+obj.numb_group, +obj.year_group, +obj.id_spec, +obj.id_group];
    //         connection.query(queryUpdate, arr, (error, results) => {
    //             if (error) throw error;
    //             resolve(results);
    //         });
    //     });
    // }
}
module.exports = Groups;
