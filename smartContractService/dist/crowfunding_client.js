"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crowfunding = void 0;
const algosdk_1 = __importDefault(require("algosdk"));
const bkr = __importStar(require("beaker-ts"));
class Crowfunding extends bkr.ApplicationClient {
    constructor() {
        super(...arguments);
        this.desc = "";
        this.appSchema = { declared: { db_id: { type: bkr.AVMType.bytes, key: "db_id", desc: "", static: false }, end_date: { type: bkr.AVMType.uint64, key: "end_date", desc: "", static: false }, is_closed: { type: bkr.AVMType.uint64, key: "is_closed", desc: "", static: false }, receiver: { type: bkr.AVMType.bytes, key: "receiver", desc: "", static: false }, target: { type: bkr.AVMType.uint64, key: "target", desc: "", static: false } }, dynamic: {} };
        this.acctSchema = { declared: {}, dynamic: {} };
        this.approvalProgram = "I3ByYWdtYSB2ZXJzaW9uIDcKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4MTUxZjdjNzUgMHg2OTczNWY2MzZjNmY3MzY1NjQgMHg3NDYxNzI2NzY1NzQgMHg3MjY1NjM2NTY5NzY2NTcyIDB4NjU2ZTY0NWY2NDYxNzQ2NSAweDY0NjI1ZjY5NjQgMHgwMDAzMzIzMDMwCnR4biBOdW1BcHBBcmdzCmludGNfMCAvLyAwCj09CmJueiBtYWluX2wyMAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGJmZDgxYjg5IC8vICJjbGFpbSgpc3RyaW5nIgo9PQpibnogbWFpbl9sMTkKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgwODFjMDIxMyAvLyAiZG9uYXRlKHBheSlzdHJpbmciCj09CmJueiBtYWluX2wxOAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDliM2Y3OWQ0IC8vICJnZXRfY29sbGVjdGVkKCl1aW50NjQiCj09CmJueiBtYWluX2wxNwp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDk4YjI3YmY1IC8vICJnZXRfZGJfaWQoKXN0cmluZyIKPT0KYm56IG1haW5fbDE2CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4YmRlNTQzMDYgLy8gInJlZnVuZChhY2NvdW50LHVpbnQ2NClzdHJpbmciCj09CmJueiBtYWluX2wxNQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDE0YmVjYzc2IC8vICJzZXRfZGJfaWQoc3RyaW5nKXN0cmluZyIKPT0KYm56IG1haW5fbDE0CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4YmQ2MzI1OWEgLy8gInNldF9lbmRfZGF0ZSh1aW50NjQpdWludDY0Igo9PQpibnogbWFpbl9sMTMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg5MTgzZjg5YiAvLyAic2V0X3JlY2VpdmVyKHN0cmluZylzdHJpbmciCj09CmJueiBtYWluX2wxMgp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDJlYjQzNjA3IC8vICJzZXRfdGFyZ2V0KHVpbnQ2NCl1aW50NjQiCj09CmJueiBtYWluX2wxMQplcnIKbWFpbl9sMTE6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYnRvaQpjYWxsc3ViIHNldHRhcmdldF8xNgpzdG9yZSAyNApieXRlY18wIC8vIDB4MTUxZjdjNzUKbG9hZCAyNAppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDEyOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmNhbGxzdWIgc2V0cmVjZWl2ZXJfMTUKc3RvcmUgMjEKYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CmxvYWQgMjEKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTM6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYnRvaQpjYWxsc3ViIHNldGVuZGRhdGVfMTQKc3RvcmUgMTcKYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CmxvYWQgMTcKaXRvYgpjb25jYXQKbG9nCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxNDoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpjYWxsc3ViIHNldGRiaWRfMTMKc3RvcmUgMTIKYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CmxvYWQgMTIKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTU6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA3CnR4bmEgQXBwbGljYXRpb25BcmdzIDIKYnRvaQpzdG9yZSA4CmxvYWQgNwpsb2FkIDgKY2FsbHN1YiByZWZ1bmRfMTIKc3RvcmUgOQpieXRlY18wIC8vIDB4MTUxZjdjNzUKbG9hZCA5CmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE2Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIGdldGRiaWRfMTEKc3RvcmUgNQpieXRlY18wIC8vIDB4MTUxZjdjNzUKbG9hZCA1CmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE3Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIGdldGNvbGxlY3RlZF8xMApzdG9yZSA0CmJ5dGVjXzAgLy8gMHgxNTFmN2M3NQpsb2FkIDQKaXRvYgpjb25jYXQKbG9nCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxODoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuIEdyb3VwSW5kZXgKaW50Y18xIC8vIDEKLQpzdG9yZSAxCmxvYWQgMQpndHhucyBUeXBlRW51bQppbnRjXzEgLy8gcGF5Cj09CmFzc2VydApsb2FkIDEKY2FsbHN1YiBkb25hdGVfOQpzdG9yZSAyCmJ5dGVjXzAgLy8gMHgxNTFmN2M3NQpsb2FkIDIKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTk6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgY2xhaW1fOApzdG9yZSAwCmJ5dGVjXzAgLy8gMHgxNTFmN2M3NQpsb2FkIDAKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMjA6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KYm56IG1haW5fbDIyCmVycgptYWluX2wyMjoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmNhbGxzdWIgY3JlYXRlXzAKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBjcmVhdGUKY3JlYXRlXzA6CmJ5dGVjXzEgLy8gImlzX2Nsb3NlZCIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMyAvLyAicmVjZWl2ZXIiCmdsb2JhbCBDcmVhdG9yQWRkcmVzcwphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV8xOgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMjoKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzM6Cmdsb2JhbCBDcmVhdG9yQWRkcmVzcwo9PQpyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV80OgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfNToKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzY6CmJ5dGVjXzMgLy8gInJlY2VpdmVyIgphcHBfZ2xvYmFsX2dldAo9PQpyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV83OgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKPT0KcmV0c3ViCgovLyBjbGFpbQpjbGFpbV84Ogp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfNgovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmJhbGFuY2UKYnl0ZWNfMiAvLyAidGFyZ2V0IgphcHBfZ2xvYmFsX2dldAo+PQphc3NlcnQKYnl0ZWNfMSAvLyAiaXNfY2xvc2VkIgpieXRlY18xIC8vICJpc19jbG9zZWQiCmFwcF9nbG9iYWxfZ2V0CmludGNfMSAvLyAxCisKYXBwX2dsb2JhbF9wdXQKaXR4bl9iZWdpbgppbnRjXzEgLy8gcGF5Cml0eG5fZmllbGQgVHlwZUVudW0KZ2xvYmFsIENyZWF0b3JBZGRyZXNzCml0eG5fZmllbGQgUmVjZWl2ZXIKaW50Y18wIC8vIDAKaXR4bl9maWVsZCBBbW91bnQKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCml0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwppdHhuX3N1Ym1pdApieXRlYyA2IC8vIDB4MDAwMzMyMzAzMApyZXRzdWIKCi8vIGRvbmF0ZQpkb25hdGVfOToKc3RvcmUgMwpieXRlY18xIC8vICJpc19jbG9zZWQiCmFwcF9nbG9iYWxfZ2V0CmludGNfMCAvLyAwCj09Cmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKYnl0ZWMgNCAvLyAiZW5kX2RhdGUiCmFwcF9nbG9iYWxfZ2V0Cjw9CiYmCmxvYWQgMwpndHhucyBUeXBlRW51bQppbnRjXzEgLy8gcGF5Cj09CiYmCmxvYWQgMwpndHhucyBSZWNlaXZlcgpnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwo9PQomJgpsb2FkIDMKZ3R4bnMgQ2xvc2VSZW1haW5kZXJUbwpnbG9iYWwgWmVyb0FkZHJlc3MKPT0KJiYKbG9hZCAzCmd0eG5zIEZlZQpwdXNoaW50IDEwMDAgLy8gMTAwMAo8PQomJgpsb2FkIDMKZ3R4bnMgUmVrZXlUbwpnbG9iYWwgWmVyb0FkZHJlc3MKPT0KJiYKYXNzZXJ0CmJ5dGVjIDYgLy8gMHgwMDAzMzIzMDMwCnJldHN1YgoKLy8gZ2V0X2NvbGxlY3RlZApnZXRjb2xsZWN0ZWRfMTA6Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmJhbGFuY2UKcHVzaGludCAxMDAwMDAwIC8vIDEwMDAwMDAKLwpyZXRzdWIKCi8vIGdldF9kYl9pZApnZXRkYmlkXzExOgp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfNAovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmJ5dGVjIDUgLy8gImRiX2lkIgphcHBfZ2xvYmFsX2dldApzdG9yZSA2CmxvYWQgNgpsZW4KaXRvYgpleHRyYWN0IDYgMApsb2FkIDYKY29uY2F0CnN0b3JlIDYKbG9hZCA2CnJldHN1YgoKLy8gcmVmdW5kCnJlZnVuZF8xMjoKc3RvcmUgMTEKc3RvcmUgMTAKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzcKLy8gdW5hdXRob3JpemVkCmFzc2VydApieXRlY18xIC8vICJpc19jbG9zZWQiCmFwcF9nbG9iYWxfZ2V0CmludGNfMCAvLyAwCj09Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmJhbGFuY2UKYnl0ZWNfMiAvLyAidGFyZ2V0IgphcHBfZ2xvYmFsX2dldAo8CiYmCmFzc2VydAppdHhuX2JlZ2luCmludGNfMSAvLyBwYXkKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDEwCnR4bmFzIEFjY291bnRzCml0eG5fZmllbGQgUmVjZWl2ZXIKbG9hZCAxMQpnbG9iYWwgTWluQmFsYW5jZQotCnR4biBGZWUKLQppdHhuX2ZpZWxkIEFtb3VudAppdHhuX3N1Ym1pdApieXRlYyA2IC8vIDB4MDAwMzMyMzAzMApyZXRzdWIKCi8vIHNldF9kYl9pZApzZXRkYmlkXzEzOgpzdG9yZSAxMwp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMQovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmludGNfMCAvLyAwCmJ5dGVjIDUgLy8gImRiX2lkIgphcHBfZ2xvYmFsX2dldF9leApzdG9yZSAxNgpzdG9yZSAxNQpsb2FkIDE2CiEKYXNzZXJ0CmJ5dGVjIDUgLy8gImRiX2lkIgpsb2FkIDEzCmV4dHJhY3QgMiAwCmFwcF9nbG9iYWxfcHV0CmJ5dGVjIDUgLy8gImRiX2lkIgphcHBfZ2xvYmFsX2dldApzdG9yZSAxNApsb2FkIDE0CmxlbgppdG9iCmV4dHJhY3QgNiAwCmxvYWQgMTQKY29uY2F0CnN0b3JlIDE0CmxvYWQgMTQKcmV0c3ViCgovLyBzZXRfZW5kX2RhdGUKc2V0ZW5kZGF0ZV8xNDoKc3RvcmUgMTgKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzIKLy8gdW5hdXRob3JpemVkCmFzc2VydAppbnRjXzAgLy8gMApieXRlYyA0IC8vICJlbmRfZGF0ZSIKYXBwX2dsb2JhbF9nZXRfZXgKc3RvcmUgMjAKc3RvcmUgMTkKbG9hZCAyMAohCmFzc2VydApieXRlYyA0IC8vICJlbmRfZGF0ZSIKbG9hZCAxOAphcHBfZ2xvYmFsX3B1dApieXRlYyA0IC8vICJlbmRfZGF0ZSIKYXBwX2dsb2JhbF9nZXQKcmV0c3ViCgovLyBzZXRfcmVjZWl2ZXIKc2V0cmVjZWl2ZXJfMTU6CnN0b3JlIDIyCnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV81Ci8vIHVuYXV0aG9yaXplZAphc3NlcnQKYnl0ZWNfMyAvLyAicmVjZWl2ZXIiCmxvYWQgMjIKZXh0cmFjdCAyIDAKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMyAvLyAicmVjZWl2ZXIiCmFwcF9nbG9iYWxfZ2V0CnN0b3JlIDIzCmxvYWQgMjMKbGVuCml0b2IKZXh0cmFjdCA2IDAKbG9hZCAyMwpjb25jYXQKc3RvcmUgMjMKbG9hZCAyMwpyZXRzdWIKCi8vIHNldF90YXJnZXQKc2V0dGFyZ2V0XzE2OgpzdG9yZSAyNQp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMwovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmludGNfMCAvLyAwCmJ5dGVjXzIgLy8gInRhcmdldCIKYXBwX2dsb2JhbF9nZXRfZXgKc3RvcmUgMjcKc3RvcmUgMjYKbG9hZCAyNwohCmFzc2VydApieXRlY18yIC8vICJ0YXJnZXQiCmxvYWQgMjUKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMiAvLyAidGFyZ2V0IgphcHBfZ2xvYmFsX2dldApyZXRzdWI=";
        this.clearProgram = "I3ByYWdtYSB2ZXJzaW9uIDcKcHVzaGludCAwIC8vIDAKcmV0dXJu";
        this.methods = [
            new algosdk_1.default.ABIMethod({ name: "claim", desc: "", args: [], returns: { type: "string", desc: "" } }),
            new algosdk_1.default.ABIMethod({ name: "donate", desc: "", args: [{ type: "pay", name: "donation", desc: "" }], returns: { type: "string", desc: "" } }),
            new algosdk_1.default.ABIMethod({ name: "get_collected", desc: "", args: [], returns: { type: "uint64", desc: "" } }),
            new algosdk_1.default.ABIMethod({ name: "get_db_id", desc: "", args: [], returns: { type: "string", desc: "" } }),
            new algosdk_1.default.ABIMethod({ name: "refund", desc: "", args: [{ type: "account", name: "account", desc: "" }, { type: "uint64", name: "amount", desc: "" }], returns: { type: "string", desc: "" } }),
            new algosdk_1.default.ABIMethod({ name: "set_db_id", desc: "", args: [{ type: "string", name: "db_id", desc: "" }], returns: { type: "string", desc: "" } }),
            new algosdk_1.default.ABIMethod({ name: "set_end_date", desc: "", args: [{ type: "uint64", name: "end_date", desc: "" }], returns: { type: "uint64", desc: "" } }),
            new algosdk_1.default.ABIMethod({ name: "set_receiver", desc: "", args: [{ type: "string", name: "receiver", desc: "" }], returns: { type: "string", desc: "" } }),
            new algosdk_1.default.ABIMethod({ name: "set_target", desc: "", args: [{ type: "uint64", name: "target", desc: "" }], returns: { type: "uint64", desc: "" } })
        ];
        this.compose = {
            claim: (txnParams, atc) => __awaiter(this, void 0, void 0, function* () {
                return this.addMethodCall(algosdk_1.default.getMethodByName(this.methods, "claim"), {}, txnParams, atc);
            }),
            donate: (args, txnParams, atc) => __awaiter(this, void 0, void 0, function* () {
                return this.addMethodCall(algosdk_1.default.getMethodByName(this.methods, "donate"), { donation: args.donation }, txnParams, atc);
            }),
            get_collected: (txnParams, atc) => __awaiter(this, void 0, void 0, function* () {
                return this.addMethodCall(algosdk_1.default.getMethodByName(this.methods, "get_collected"), {}, txnParams, atc);
            }),
            get_db_id: (txnParams, atc) => __awaiter(this, void 0, void 0, function* () {
                return this.addMethodCall(algosdk_1.default.getMethodByName(this.methods, "get_db_id"), {}, txnParams, atc);
            }),
            refund: (args, txnParams, atc) => __awaiter(this, void 0, void 0, function* () {
                return this.addMethodCall(algosdk_1.default.getMethodByName(this.methods, "refund"), { account: args.account, amount: args.amount }, txnParams, atc);
            }),
            set_db_id: (args, txnParams, atc) => __awaiter(this, void 0, void 0, function* () {
                return this.addMethodCall(algosdk_1.default.getMethodByName(this.methods, "set_db_id"), { db_id: args.db_id }, txnParams, atc);
            }),
            set_end_date: (args, txnParams, atc) => __awaiter(this, void 0, void 0, function* () {
                return this.addMethodCall(algosdk_1.default.getMethodByName(this.methods, "set_end_date"), { end_date: args.end_date }, txnParams, atc);
            }),
            set_receiver: (args, txnParams, atc) => __awaiter(this, void 0, void 0, function* () {
                return this.addMethodCall(algosdk_1.default.getMethodByName(this.methods, "set_receiver"), { receiver: args.receiver }, txnParams, atc);
            }),
            set_target: (args, txnParams, atc) => __awaiter(this, void 0, void 0, function* () {
                return this.addMethodCall(algosdk_1.default.getMethodByName(this.methods, "set_target"), { target: args.target }, txnParams, atc);
            })
        };
    }
    claim(txnParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.execute(yield this.compose.claim(txnParams));
            return new bkr.ABIResult(result, result.returnValue);
        });
    }
    donate(args, txnParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.execute(yield this.compose.donate({ donation: args.donation }, txnParams));
            return new bkr.ABIResult(result, result.returnValue);
        });
    }
    get_collected(txnParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.execute(yield this.compose.get_collected(txnParams));
            return new bkr.ABIResult(result, result.returnValue);
        });
    }
    get_db_id(txnParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.execute(yield this.compose.get_db_id(txnParams));
            return new bkr.ABIResult(result, result.returnValue);
        });
    }
    refund(args, txnParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.execute(yield this.compose.refund({ account: args.account, amount: args.amount }, txnParams));
            return new bkr.ABIResult(result, result.returnValue);
        });
    }
    set_db_id(args, txnParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.execute(yield this.compose.set_db_id({ db_id: args.db_id }, txnParams));
            return new bkr.ABIResult(result, result.returnValue);
        });
    }
    set_end_date(args, txnParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.execute(yield this.compose.set_end_date({ end_date: args.end_date }, txnParams));
            return new bkr.ABIResult(result, result.returnValue);
        });
    }
    set_receiver(args, txnParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.execute(yield this.compose.set_receiver({ receiver: args.receiver }, txnParams));
            return new bkr.ABIResult(result, result.returnValue);
        });
    }
    set_target(args, txnParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.execute(yield this.compose.set_target({ target: args.target }, txnParams));
            return new bkr.ABIResult(result, result.returnValue);
        });
    }
}
exports.Crowfunding = Crowfunding;
