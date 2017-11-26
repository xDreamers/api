#!/usr/bin/python
#coding=utf-8
import redis
class CRedis:
  def __init__(self):
    self.host = '118.89.167.254'
    self.port = 27001
    self.db = 0
    self.r = redis.Redis(host = self.host, port = self.port, db = self.db)
  #1. strings 类型及操作
  #设置 key 对应的值为 string 类型的 value
  def set(self, key, value):
    return self.r.set(key, value)

  #设置 key 对应的值为 string 类型的 value。如果 key 已经存在,返回 0,nx 是 not exist 的意思
  def setnx(self, key, value):
    return self.r.setnx(key, value)

  #设置 key 对应的值为 string 类型的 value,并指定此键值对应的有效期
  def setex(self, key, time, value):
    return self.r.setex(key, time, value)


  #设置指定 key 的 value 值的子字符串
  #setrange name 8 gmail.com
  #其中的 8 是指从下标为 8(包含 8)的字符开始替换
  def setrange(self, key, num, value):
    return self.r.setrange(key, num, value)


  #获取指定 key 的 value 值的子字符串
  def getrange(self, key, start ,end):
    return self.r.getrange(key, start, end)


  #mget(list)

  def get(self, key):
    if isinstance(key, list):
      return self.r.mget(key)
    else:
      return self.r.get(key)
  #删除
  def remove(self, key):
    return self.r.delete(key)


  #自增

  def incr(self, key, default = 1):
    if (1 == default):
      return self.r.incr(key)
    else:
      return self.r.incr(key, default)


  #自减
  def decr(self, key, default = 1):
    if (1 == default):
      return self.r.decr(key)
    else:
      return self.r.decr(key, default)


