import { Injectable } from '@nestjs/common';
import MailQueue  from '../utils/mailQueue';
import {readFile}from 'fs/promises';



@Injectable()
export class MailerService {
    //////
    mailQueue: MailQueue;
    constructor(){
        this.mailQueue = new MailQueue();
    }
    /////
    async sendMails(userName:string,passWord : string,mailObj : Object){
        try {
            this.mailQueue.setMailTransport(userName,passWord);
            // create mails for that channels
            await this.createMails(userName,mailObj);
            await this.mailQueue.startMailQueue();
            return { message : 'completed'};
        }
        catch(err){
            console.log(err)
        }
    }
    /////
    async createMails(userName,context){
        try {
            const usersJson =await readFile(`./src/mailer/sampleUser.json`);
            const users = JSON.parse(usersJson.toString());
            const mails = users.map(function(user){
                return {
                    from : userName,
                    to : user.mail_id,
                    subject : context.subject,
                    text : `${user.name}`,
                    html : `<title> hello</title> <h1> tesing</h1> <p>${context.context}</p>`
                }
            })

            for (let mail of mails){
                this.mailQueue.send(mail);
            }
        }
        catch (err){
            console.log(err);
        }
    }
}



