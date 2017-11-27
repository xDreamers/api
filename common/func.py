
#coding:utf-8

import urllib
import urllib2

import ast

import random

import web

import json

def get_base_info(code,appid,secret):
    '''
    通过获取的code，访问微信的api，获取用户基本信息(只有openid)
    return 用户的open id
    '''
    if not code: return ''
    url = 'https://api.weixin.qq.com/sns/oauth2/access_token'
    try:
        data = {'appid': appid, 'secret': secret, 'code': code, 'grant_type': 'authorization_code'}
        post_body = urllib.urlencode(data)
        f = urllib2.urlopen(url, post_body).read()
        r = ast.literal_eval(f) #字符串转换成字典
        return r
    except:
        return ''


def create_session(openid,session_key):

    seed=openid+session_key+"1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=-"

    sa = []
    for i in range(16):
        sa.append(random.choice(seed))
    salt = ''.join(sa)
    print salt


def get_web_params(web, keys):
    params = {}

    if '' != web.data():  # collect post_body
        try:
            params.update(json.loads(web.data()))
        except Exception as e:
            print(e)
            return ({}, (-1, 'invalid data format'))
    params.update(web.input(_method='get'))  # collect url_params
    # test required keys exist
    for key in keys:
        if key not in params:
            if keys[key] is None:
                return ({}, (-1, 'param <{}> is missing'.format(key)))
            else:
                params[key] = keys[key]
    if params.has_key('user_id'):
        try:
            long(params['user_id'])
        except Exception as e:
            return ({}, (-1, 'invalid user_id = {}'.format(params['user_id'])))

    return (params, None)