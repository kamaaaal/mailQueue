import {createTransport} from 'nodemailer';

import { mailDto } from './mail.dto';

export default class MailQueue {
    queue: mailDto[];
    transporter: any;
    user: string;
    pass: string;
    
    constructor(){
        this.queue = [];
        this.transporter = null;
    }

    // push to queue
    send(mailObj :mailDto){
        this.queue.push(mailObj);
        return true;
    }

    // isEmpty
    isEmpty(): boolean{
        if (this.queue.length > 0){
            return false;
        }
        else {
            return true;
        }
    }

    setMailTransport(userName:string ,passWord:string){
        // set transported to the object
        this.user = userName;
        this.pass = passWord;
        this.transporter = createTransport({
            service : 'gmail',
            auth :{
                user : userName,
                pass : passWord,
            }
        });
    }
    async PromSendMail(mail){
        return new Promise(async(resolve,reject) => {
            // create transport object which will send mail
            const transporter = createTransport({
                service : 'gmail',
                auth : {
                    user : this.user,
                    pass : this.pass,
                }
            })
            transporter.sendMail(mail,(err,info) => {
                if (err)
                    reject(err);
                else {
                    resolve(info);
                }
            })

        })
    }
    async sendNext(){
        if(!this.isEmpty())
        {
            ///// test
            //    console.log(!this.isEmpty);
            if (this.transporter === null){
                throw new Error('transport not set yet');
            }
            
            // gets mail from the queue and sends using the transport
            let mail:mailDto = this.receive();
            ///// testing 
            mail.html = mail.html.concat(`<p>user:${mail.text} , time : ${new Date().toTimeString()} </p>`);
            console.log(mail);
            /////  /testing
            // sends mails recursively
            try{
                const info:any = await this.PromSendMail(mail);
                console.log(info.response);
                await this.sendNext();
            }
            catch(err){
                console.log(err);
                await this.sendNext();
            }

            //  this.transporter.sendMail(mail,async (err,info) => {
            //     if (err){
            //         console.log(err);
            //         await this.sendNext();
            //         return false;
            //     }
            //     else{
            //         console.log('mail send',info.response);
            //         await this.sendNext();
            //         return true;
            //     } 
            // });
        }
    }

    async startMailQueue(){
        await this.sendNext();
        setTimeout(() => {
            return {
            message : "done"
        }
        }, 0);
    }

    // receives the oldest object
    receive(){
        // shift returns the first element of the array
        return this.queue.shift();
    }
}