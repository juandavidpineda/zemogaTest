import { IUser } from './IUser';
import { ITweet } from '../twitter/ITweet';
import { Tweet } from '../twitter/Tweet';

import _head from 'lodash/head'
import _get from 'lodash/get'
import Twitter from 'twitter';
import { Client, RequestParams, ApiResponse } from '@elastic/elasticsearch'
import AWS from 'aws-sdk'
import createAwsElasticsearchConnector from 'aws-elasticsearch-connector'


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || '',
    region: process.env.AWS_REGION || '',
})
export class User implements IUser {

    async getInfoUser(userName: string) {
        try {
            const client = new Client({
                ...createAwsElasticsearchConnector(AWS.config),
                node: process.env.ELASTICSEARCH_NODE || '',
            })
            const params: RequestParams.Search = {
                index: process.env.ELASTICSEARCH_INDEX || '',
                body: {
                    query: {
                        match: { twitterUsername: userName }
                    }
                }
            }

            return await client
                .search(params)
                .then(async (result: ApiResponse) => {
                    let dataResult = _get(_head(result.body.hits.hits), '_source');
                    dataResult.tweets = await this.getUserByUserName(userName);
                    return dataResult;
                })
                .catch(err => {
                    return err;
                });

        } catch (error) {
            return error;
        }
    }

    async getAllUsers() {
        try {
            const client = new Client({
                ...createAwsElasticsearchConnector(AWS.config),
                node: process.env.ELASTICSEARCH_NODE || '',
            })
            const params: RequestParams.Search = {
                index: process.env.ELASTICSEARCH_INDEX || '',
                _source_includes: ["twitterUsername", "title"]
            }
            return await client
                .search(params)
                .then((result: ApiResponse) => {
                    return result.body.hits.hits.map((row: { _source: any; }) => {
                        return row._source
                    })
                })
                .catch((error) => {
                    return error
                })

        } catch (error) {
            return error
        }
    }

    async putUserToDB(userName: string, image: string, textDescription: string, title: string) {
        try {
            const client = new Client({
                ...createAwsElasticsearchConnector(AWS.config),
                node: process.env.ELASTICSEARCH_NODE || '',
            })
            const documentToInsert: RequestParams.Index = {
                index: process.env.ELASTICSEARCH_INDEX || '',
                id: userName,
                body: {
                    twitterUsername: userName,
                    image: image,
                    title: title,
                    textDescription: textDescription
                }
            }
            await client.index(documentToInsert)
                .then((data) => {
                    return data;
                })
                .catch(error => {
                    return error;
                })

        } catch (error) {
            return error;
        }
    }

    async getUserByUserName(userName: string): Promise<ITweet[]> {
        try {
            const client = new Twitter({
                consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
                consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
                bearer_token: process.env.TWITTER_BEARER || ''
            });
            const params = { screen_name: userName, count: process.env.COUNT_TWEETS, include_rt: false };
            return await client.get('statuses/user_timeline', params)
                .then((tweets: Twitter.ResponseData) => {
                    return tweets.map((tweet: ITweet) => new Tweet(tweet.id, tweet.text, tweet.created_at));
                })
                .catch(err => {
                    return err
                })

        } catch (error) {
            return error;
        }
    }
}
