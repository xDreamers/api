#! /usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys

reload(sys)
sys.setdefaultencoding('utf8')

import web


apis = (
    'test'
)

class dispatch:
    @staticmethod
    def go(ver, api):

        if 0 == apis.count(api):
            return web.notfound()
        else:
            exec 'import ' + api
            data = eval(api + '.go()')
            web.header('Content-Length', len(str(data)))
            web.header('Access-Control-Allow-Origin', '*')
            return data

    def GET(self, ver, api):

        return dispatch.go(ver, api)

    def POST(self, ver, api):
        return dispatch.go(ver, api)


def internalerror():
    return web.internalerror('error happen')



app = web.application(('/(.*)/(.*)', 'dispatch'), globals())
app.internalerror = internalerror
application = app.wsgifunc()
