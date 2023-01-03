// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as crypto from 'crypto';
const _ = require('lodash');

const Akamai_EdgeAuth_Node = Object.create(null, {
    config: {
        writable: true,
        value: {
            algo: 'sha256',
            ip: '',
            start_time: 0,
            window: 300,
            acl: '/*',
            url: '',
            session_id: '',
            data: '',
            salt: '',
            key: 'aabbccddeeff00112233445566778899',
            field_delimiter: '~',
        },
    },
});

Akamai_EdgeAuth_Node.setConfig = function (config) {
    this.config = _.merge({}, this.config, config);
};

Akamai_EdgeAuth_Node.generateToken = function () {
    const text =
        this.getIp() + this.getStartTime() + this.getExp() + this.getAcl() + this.getSessionId() + this.getData();
    const text_digest = text + this.getUrl() + this.getSalt();
    const signature = crypto
        .createHmac('sha256', new Buffer(hex2bin(this.config.key), 'binary'))
        .update(new Buffer(text_digest.substring(0, text_digest.length - 1), 'binary'))
        .digest('hex');
    return text + 'hmac=' + signature;
};

Akamai_EdgeAuth_Node.getIp = function () {
    if (this.config.ip) return 'ip=' + this.config.ip + this.config.field_delimiter;
    else return '';
};

Akamai_EdgeAuth_Node.getStartTime = function () {
    if (this.config.start_time) return 'st=' + this.config.start_time + this.config.field_delimiter;
    else return '';
};

Akamai_EdgeAuth_Node.getExp = function () {
    const time = Math.floor(new Date().getTime() / 1000) + parseInt(this.config.window);
    return 'exp=' + time + this.config.field_delimiter;
};

Akamai_EdgeAuth_Node.getAcl = function () {
    return 'acl=' + this.config.acl + this.config.field_delimiter;
};

Akamai_EdgeAuth_Node.getSessionId = function () {
    if (this.config.session_id) return 'id=' + this.config.session_id + this.config.field_delimiter;
    else return '';
};

Akamai_EdgeAuth_Node.getData = function () {
    if (this.config.data) return 'data=' + this.config.data + this.config.field_delimiter;
    else return '';
};

Akamai_EdgeAuth_Node.getUrl = function () {
    if (this.config.url) return 'url=' + this.config.url + this.config.field_delimiter;
    else return '';
};

Akamai_EdgeAuth_Node.getSalt = function () {
    if (this.config.salt) return 'salt=' + this.config.salt + this.config.field_delimiter;
    else return '';
};

function hex2bin(hex) {
    const bytes = [];

    for (let i = 0; i < hex.length - 1; i += 2) bytes.push(parseInt(hex.substr(i, 2), 16));

    // eslint-disable-next-line prefer-spread
    return String.fromCharCode.apply(String, bytes);
}

module.exports = Akamai_EdgeAuth_Node;
