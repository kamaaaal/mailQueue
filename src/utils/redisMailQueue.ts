import {createClient,RedisClientType} from 'redis';

/// usiing redis db for using queue
export default class redisMailQueue{
    client: RedisClientType;
    q : string; 
    constructor (){
        this.client = createClient({
            url : 'redis://redis-18861.c301.ap-south-1-1.ec2.cloud.redislabs.com:18861',
            password : 'trialingRedis2',
        });
        this.q = 'queue'; // 
        this.client.on('connect',()=> console.log('connected'));
        this.client.connect().catch(console.log);
    }
    async isEmpty(){
        try {
            const len = await this.client.lLen(this.q);
            if (len === 0) return true;
            else return false;
        }
        catch(err){
            console.log('ISEMPTY',err);
        }
    }
    /// gets an array of mails as input and pushes it to the redis queue(key)
    async addMails(mails) {
        try{
            await this.client.rPush(this.q,mails);
        }
        catch(err){
            console.log('ADDMAILS',err);
        }
    }
    // deletes all elements of the queue
    async clearQueue(){
        await this.client.del(this.q);
    }
    // logs the all elements of the queue
   async showQueue() {
       try {
            const queue = await this.client.lRange(this.q,0,-1);
            console.log('SHOW QUEUE',queue);
        }
        catch(err){
            console.log('SHOW QUEUE',err);
        }
    }
    // dequeue() methods gets the first(first left) element of the queue
    async dequeue() {
        if (!this.isEmpty()){
            return await this.client.lPop(this.q)
        }
    } 
    async promiseMail(){

    }
    // this method get the first mailOption in the queue and sends
    // sendNext() calls itself recursively till the queue is empty 
    async sendNext(){
        try {
            if (!this.isEmpty()){
                const mail = await this.dequeue();
                
                // this.sendNext()
            }
        }
        catch(err){
            console.log('SEND NEXT',err);
        }
    }
    // starts the queue by calling sendNext method
    async startQueue(){
        // this methods calls itself till the queue is empty
        await this.sendNext();
    }
}