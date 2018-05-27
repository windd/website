module.exports = {
    queryAll: 'SELECT * FROM ??',
    queryById: 'SELECT * FROM ?? WHERE id=?',
    del: 'DELETE FROM ?? WHERE id=?',
    lastest: 'SELECT * FROM ?? order by id desc LIMIT 1',
    chart:'SELECT ?? FROM ?? WHERE Create_Time BETWEEN ? AND ? ORDER BY Create_Time',
    Preiod: 'SELECT * FROM ?? WHERE Create_Time BETWEEN ? AND ? ORDER BY Create_Time'
};