import { ITweet } from "./ITweet";
export class Tweet implements ITweet {
    id: string
    text: string;
    created_at: Date;


    constructor(userName: string, text: string, create_at: Date) {
        this.id = userName;
        this.text = text;
        this.created_at = create_at;
    }   

}
